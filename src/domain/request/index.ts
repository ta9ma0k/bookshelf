import { RequestRepositoryApiImpl } from '../../infrastructure/api/domain/request'

export interface RequestRepositoryInterface {
  create: (bookId: string, applicantId: string) => Promise<string>
}

export const RequestRepository = RequestRepositoryApiImpl
