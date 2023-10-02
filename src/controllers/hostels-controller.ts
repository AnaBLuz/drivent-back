import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res:Response){
    const { userId } = req;
    const hotels = await hotelsService.getHotels(userId);
    res.send(hotels);
}

export async function getHotelsWithRooms(req:AuthenticatedRequest, res:Response ){
    const { userId } = req;
    const { hotelId} = req.params;
    const rooms = await hotelsService.getHotelsWithRooms(userId,Number(hotelId));
    return res.status(httpStatus.OK).send(rooms);
}