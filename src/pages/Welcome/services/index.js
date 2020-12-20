import moment from 'moment';
import { get } from 'lodash';

import request from '@/utils/request';

import { LIMIT } from '../constants';

export async function getCalendarEvent(params) {
  const page = get(params, 'page', 1);
  const limit = get(params, 'limit', LIMIT);

  return request('/calendar-event', {
    method: 'GET',
    params: {
      $skip: (page - 1) * limit,
      'updated_at[$gte]': moment().format('YYYY-MM-DD'),
    },
  });
}
