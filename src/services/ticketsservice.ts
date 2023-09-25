import { notFoundError } from "@/errors";
import { CreateTicketParams } from "@/protocols";
import { enrollmentRepository } from "@/repositories";
import { ticketRepository } from "@/repositories/tickets-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";



export async function getTicketsTypes(): Promise<TicketType>{
      const ticketTypes: TicketType[] = await ticketRepository.findTicketsTypes();
      if (!ticketTypes) throw notFoundError();
      return ticketTypes
}

export async function getTicket(userId: number): Promise<Ticket>{
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
       if(!enrollment){
        throw notFoundError
        }

      const ticket = await ticketRepository.findTicketsByEnrollmentId(enrollment.id);            
      if(!ticket){
        throw notFoundError();
      }
      return ticket
}

export async function createTicket(userId: number,ticketTypeId:number){
   const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
   if(!enrollment){
    throw notFoundError
   }
   const ticketData: CreateTicketParams= {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

   await ticketRepository.createTicket(ticketData);
   const ticket = await ticketRepository.findTicketsByEnrollmentId(enrollment.id);
   return ticket

}

export const ticketsService = {getTicketsTypes, getTicket,createTicket }