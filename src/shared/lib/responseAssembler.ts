import { withPagination } from './withPagination'

export const responseAssembler = <T>(data: T[]) => {
  return {
    data: withPagination(data),
  }
}
