import {
  getTalkToListenList
} from '../services';

export default {
  namespace: 'analytic',
  state: {
    talkingRateList: []
  },
  effects: {
    *getTalkToListenList({ params }, { call, put }) {
      const { cb, userId } = params;

      const talkToListenList = yield call(getTalkToListenList, {userId});

      if(talkToListenList) {
        if (cb) cb(talkToListenList);

        yield put({
          type: 'saveTalkToListenList',
          talkToListenList
        });
      }
    },
  },
  reducers: {
    saveTalkToListenList(state, action) {
      return {
        ...state,
        talkToListenList: action.talkToListenList,
      };
    }
  },
};
