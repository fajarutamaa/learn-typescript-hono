import { Error400, Error401, Error404, Error409 } from '../types/type'

function Error400(status: boolean, message: string): Error400 {
  return {
    status: status,
    message: message,
  }
}

function Error401(status: boolean, message: string): Error401 {
  return {
    status: status,
    message: message,
  }
}

function Error404(status: boolean, message: string): Error404 {
  return {
    status: status,
    message: message,
  }
}

function Error409(status: boolean, message: string): Error409 {
  return {
    status: status,
    message: message,
  }
}

export { Error400, Error409, Error404, Error401 }
