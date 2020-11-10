import { notification } from 'antd';
import { get } from 'lodash';
import Moment from 'moment';
import { LIMIT } from '../constants';
import { onUpload, getUploadedList, getTranscript } from '../services';

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
    transcript: {
      data: [],
      pagination: {
        current: 1,
        limit: LIMIT,
      },
    },
  },
  effects: {
    *onUpload({ params }, { call, put }) {
      yield call(onUpload, params);

      notification.success({ message: 'Upload successfully!' });

      yield put({
        type: 'saveUpload',
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
        current: parseInt(skip / limit) + 1,
        pageSize: limit,
        total,
      }

      yield put({
        type: 'saveTranscript',
        data,
        pagination,
        loadMore
      });
    },
    *getUploadedList({ params }, { call, put }) {
      const response = yield call(getUploadedList, params);
      const data = get(response, 'data', []);
      const skip = get(response, 'skip', 0);
      const total = get(response, 'total', 0);
      const limit = get(response, 'limit', 0);

      const pagination = {
        current: parseInt(skip / limit) + 1,
        pageSize: limit,
        total,
      }

      yield put({
        type: 'saveUploadedList',
        data,
        pagination
      });
    },
  },
  reducers: {
    saveUpload(state, action) {
      return {
        ...state,
        auditLogs: action.payload,
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
