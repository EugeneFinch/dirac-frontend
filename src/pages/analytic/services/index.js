import request from '@/utils/request';

export async function getTalkToListenList({ userId }) {
  return request(`/analytics-talk-to-listen-export?userId=${userId}`, {
    method: 'GET',
  });
}
