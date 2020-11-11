/* eslint-disable */
import { get } from 'lodash';
import { LIMIT } from '../constants';
import { getRecodingDetail, getUploadedList, getTranscript } from '../services';

export default {
  namespace: 'uploadManagement',
  state: {
    uploadedList: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
    recordingDetail: {},
    transcript: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
  },
  effects: {
    *getRecodingDetail({ params }, { call, put }) {
      const recordingDetail = yield call(getRecodingDetail, params);

      yield put({
        type: 'saveRecording',
        recordingDetail,
      });
    },
    *getTranscript({ params }, { call, put }) {
      const { loadMore, ...restParams } = params;
      const response = yield call(getTranscript, restParams);
      const data = get(response, 'data', []);
      const skip = get(response, 'skip', 0);
      const total = get(response, 'total', 0);
      const limit = get(response, 'limit', 0);

      const pagination = {
        /* eslint-disable no-eval */
        current: parseInt(skip / limit + 1),
        pageSize: limit,
        total,
      };

      yield put({
        type: 'saveTranscript',
        data,
        pagination,
        loadMore,
      });
    },
    *getUploadedList({ params }, { call, put }) {
      const response = yield call(getUploadedList, params);
      const data = get(response, 'data', []);
      const skip = get(response, 'skip', 0);
      const total = get(response, 'total', 0);
      const limit = get(response, 'limit', 0);

      const pagination = {
        /* eslint-disable no-eval */
        current: parseInt(skip / limit + 1),
        pageSize: limit,
        total,
      };

      yield put({
        type: 'saveUploadedList',
        data,
        pagination,
      });
    },
  },
  reducers: {
    saveRecording(state, action) {
      return {
        ...state,
        recordingDetail: action.recordingDetail,
      };
    },
    saveUploadedList(state, action) {
      const data = get(action, 'data', []);
      const pagination = get(action, 'pagination', { page: 1, limit: LIMIT });

      return {
        ...state,
        uploadedList: {
          data,
          pagination,
        },
      };
    },
    saveTranscript(state, action) {
      const newData = get(action, 'data', []);
      const loadMore = get(action, 'loadMore', false);
      const pagination = get(action, 'pagination', { page: 1, limit: LIMIT });

      const oldData = get(state, 'transcript.data', []);

      let data = newData;
      if (loadMore) {
        data = [...data, ...oldData];
      }

      return {
        ...state,
        transcript: {
          data,
          pagination,
        },
      };
    },
  },
};
