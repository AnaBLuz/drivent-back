import { ApplicationError } from '@/protocols';

export function cannotListHotelsError(): ApplicationError {
  return {
    name: 'CannotListHotelsError',
    message: 'Cannot list hotels!',
  };
}

export function cannotListHotelsError(): ApplicationError {
    return{
        name: "cannotListHotelsError", 
        message:" Cannot list hotels!"
    }
}