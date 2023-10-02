import { prisma } from "@/config";

function findHotels() {
  return  prisma.hotel.findMany();
}

function findRoomsByHotelId(hotelId: number){
    return prisma.hotel.findFirst({
        where: {
          id: hotelId,
        },
        include: {
          Rooms: true,
        },
      });
}



const hotelRepository = {
    findHotels, findRoomsByHotelId
}

export default hotelRepository