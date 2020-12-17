import request from '@/utils/request';
import { get } from 'lodash';
import { LIMIT } from '../constants';

export async function getTeamUser(params) {
  const page = get(params, 'page', 1);

  return request('/team-user', {
    method: 'GET',
    params: {
      $skip: (page - 1) * LIMIT,
      '$sort[id]': -1,
    },
  });
}
export async function updateIsAdmin(params) {
  return request(`/team-user/${params.id}`, {
    method: 'PATCH',
    data: {
      is_admin: params.is_admin,
    },
  });
}
export async function removeTeamUser(params) {
  return request(`/team-user/${params.id}`, {
    method: 'DELETE',
  });
}
export async function addTeamUser(data) {
  return request(`/team-user`, {
    method: 'POST',
    data,
  });
}
