import { RequestRepositoryInterface } from '../../../../domain/request'

export const RequestRepositoryApiImpl: RequestRepositoryInterface = {
  create: () => Promise.resolve('ok'),
}
