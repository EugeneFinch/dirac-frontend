/* eslint-disable */
import { get } from 'lodash';
import { LIMIT } from '../constants';
import { getCalendarEvent } from '../services';

export default {
  namespace: 'welcome',
  state: {
    calendarEvents: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
  },
  effects: {
    *getCalendarEvent({ params }, { call, put }) {
      const response = yield call(getCalendarEvent, params);
      const data = get(response, 'data', []);
      const skip = get(response, 'skip', 0);
      const total = get(response, 'total', 0);
      const limit = get(response, 'limit', LIMIT);

      const pagination = {
        /* eslint-disable no-eval */
        current: parseInt(skip / limit + 1),
        pageSize: limit,
        total,
      };

      yield put({
        type: 'saveCalendarEvents',
        data,
        pagination,
      });
    },
  },
  reducers: {
    saveCalendarEvents(state, action) {
      return {
        ...state,
        calendarEvents: {
          data: get(action, 'data', []),
          pagination: get(action, 'pagination', {}),
        },
      };
    },
  },
};
