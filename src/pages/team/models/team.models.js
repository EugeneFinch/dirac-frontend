/* eslint-disable */
import { LIMIT } from '../constants';
import { getTeamUser, updateIsAdmin, removeTeamUser, addTeamUser } from './team.services';

export default {
  namespace: 'team',
  state: {
    teamUsers: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
  },
  effects: {
    *getTeamUser({ params }, { call, put }) {
      const teamUsers = yield call(getTeamUser, params);

      yield put({
        type: 'saveTeamUser',
        teamUsers,
      });
    },
    *updateIsAdmin({ params }, { call, put }) {
      yield call(updateIsAdmin, params);
    },
    *removeTeamUser({ params }, { call, put }) {
      yield call(removeTeamUser, params);
      yield put({
        type: 'getTeamUser',
      });
    },
    *addTeamUser({ params }, { call, put }) {
      yield call(addTeamUser, params);
    },
  },
  reducers: {
    saveTeamUser(state, action) {
      return {
        ...state,
        teamUsers: action.teamUsers,
      };
    },
  },
};
