import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent({ strategy, accessToken }) {
  return request('/authentication', { method: 'POST', data: { strategy, accessToken } });
}
export async function queryNotices() {
  return request('/api/notices');
}
