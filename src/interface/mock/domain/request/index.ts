import { RequestRepositoryInterface } from '../../../../domain/request'
import sleep from '../../../../util/sleep'

export const RequestRepositoryImpl: RequestRepositoryInterface = {
  create: (_, __) => sleep(1).then(() => 'dummy_request_id'),
}
