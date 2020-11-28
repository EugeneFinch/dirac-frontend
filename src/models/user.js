import { queryCurrent, query as queryUsers } from '@/services/user';
import { getToken, removeToken } from '@/utils/utils';

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

    *fetchCurrent(_, { call, put }) {
      const access_token = getToken();
      const response = yield call(queryCurrent, { accessToken: access_token, strategy: 'jwt' });
      if (!response.user) {
        removeToken();
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response.user,
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
