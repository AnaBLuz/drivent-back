import {  Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services/ticketsservice';


export async function getTicketsTypes(req:AuthenticatedRequest, res:Response ){
    const ticketTypes = await ticketsService.getTicketsTypes()
    return res.status(httpStatus.OK).send(ticketTypes)
}

export async function getTicket(req:AuthenticatedRequest, res:Response){
    const { userId } = req;
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket)
}

export async function createTicket(req:AuthenticatedRequest, res:Response){
    const { userId } = req;
    const { ticketTypeId } = req.body;
    if (!ticketTypeId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
    const ticket = await ticketsService.createTicket(userId,ticketTypeId)
    res.status(httpStatus.CREATED).send(ticket)
}
