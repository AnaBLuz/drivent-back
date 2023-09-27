import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schemas';
import { getTicketsTypes, getTicket, createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .get('/', getTicket)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
