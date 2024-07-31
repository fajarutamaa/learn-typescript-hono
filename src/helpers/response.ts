import { Json200, Json201 } from '../types/type'

function Json200(status: boolean, data: any, message: string): Json200 {
  return {
    status: status,
    message: message,
    data: data,
  }
}

function Json201(status: boolean, message: string): Json201 {
  return {
    status: status,
    message: message,
  }
}

export { Json200, Json201 }
