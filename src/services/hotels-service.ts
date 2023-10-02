
import { enrollmentRepository } from '@/repositories';
import { notFoundError } from '@/errors';
import { ticketsRepository} from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';


//checagem para saber se o usuário está apto a ver os hoteis 
async function checkHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError(); // LANÇA UM ERRO PARA A FUNÇÃO QUE O CHAMOU
  }
}

async function getHotels(userId: number) {
  await checkHotels(userId);

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await checkHotels(userId);

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

export default {
  getHotels,
  getHotelsWithRooms,
};