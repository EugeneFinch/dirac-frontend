/* eslint-disable */
import { LIMIT } from '../constants';
import {
  getCompanyUser,
  updateIsAdmin,
  removeCompanyUser,
  addCompanyUser,
} from './company.services';

export default {
  namespace: 'company',
  state: {
    companyUsers: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
  },
  effects: {
    *getCompanyUser({ params }, { call, put }) {
      const companyUsers = yield call(getCompanyUser, params);

      yield put({
        type: 'saveCompanyUser',
        companyUsers,
      });
    },
    *updateIsAdmin({ params }, { call, put }) {
      yield call(updateIsAdmin, params);
    },
    *removeCompanyUser({ params }, { call, put }) {
      yield call(removeCompanyUser, params);
      yield put({
        type: 'getCompanyUser',
      });
    },
    *addCompanyUser({ params }, { call, put }) {
      yield call(addCompanyUser, params);
    },
  },
  reducers: {
    saveCompanyUser(state, action) {
      return {
        ...state,
        companyUsers: action.companyUsers,
      };
    },
  },
};
