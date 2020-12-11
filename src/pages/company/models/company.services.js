import request from '@/utils/request';
import { get } from 'lodash';
import { LIMIT } from '../constants';

export async function getCompanyUser(params) {
  const page = get(params, 'page', 1);

  return request('/company-user', {
    method: 'GET',
    params: {
      $skip: (page - 1) * LIMIT,
      '$sort[id]': -1,
    },
  });
}
export async function updateIsAdmin(params) {
  return request(`/company-user/${params.id}`, {
    method: 'PATCH',
    data: {
      is_admin: params.is_admin,
    },
  });
}
export async function removeCompanyUser(params) {
  return request(`/company-user/${params.id}`, {
    method: 'DELETE',
  });
}
