import { RequestRepositoryImpl } from '../../interface/mock/domain/request'

export interface RequestRepositoryInterface {
  create: (bookId: string, applicantId: string) => Promise<string>
}

export const RequestRepository = RequestRepositoryImpl
