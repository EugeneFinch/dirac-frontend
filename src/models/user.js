import { queryCurrent, query as queryUsers } from '@/services/user';
import { getToken, removeToken } from '@/utils/utils';
import { get } from 'lodash';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent({ access_token: token }, { call, put }) {
      const access_token = getToken();
      const response = yield call(queryCurrent, {
        accessToken: token || access_token,
        strategy: 'jwt',
      });
      const user = get(response, 'user');

      if (!user) {
        removeToken();
      }
      yield put({
        type: 'saveCurrentUser',
        payload: user,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
