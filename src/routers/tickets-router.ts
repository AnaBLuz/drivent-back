import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schemas';
import { getTicketsTypes, getTicket, createTicket } from '@/controllers'
import { Router } from 'express';


const ticketsRouter = Router();

ticketsRouter
   .all("/*",authenticateToken)
   .get("/tickets/types", getTicketsTypes)
   .get("/tickets", getTicket)
   .post('/tickets',validateBody(createTicketSchema),createTicket);



   export {ticketsRouter}