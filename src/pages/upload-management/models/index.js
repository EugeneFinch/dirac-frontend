/* eslint-disable */
import { findIndex, get, set } from 'lodash';
import { LIMIT } from '../constants';
import {
  getRecodingDetail,
  getUploadedList,
  getTranscript,
  getSpeakerName,
  putSpeakerName,
} from '../services';

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
    speakers: [],
  },
  effects: {
    *getRecodingDetail({ params }, { call, put }) {
      const recordingDetail = yield call(getRecodingDetail, params);

      yield put({
        type: 'saveRecording',
        recordingDetail,
      });
    },
    *getSpeakerInfo({ params }, { call, put, select }) {
      const newSpeaker = yield call(getSpeakerName, params);
      const speakers = yield select((state) => state.uploadManagement.speakers);

      speakers.push(newSpeaker);

      yield put({
        type: 'saveSpeaker',
        speakers,
      });
    },
    *putSpeakerName({ params }, { call, put, select }) {
      const { cb, ...body } = params;
      const id = get(params, 'id');
      const newSpeaker = yield call(putSpeakerName, body);
      if (cb) cb();
      let speakers = yield select((state) => state.uploadManagement.speakers);

      const index = findIndex(speakers, (item) => item.id === id);
      speakers[index] = newSpeaker;

      yield put({
        type: 'saveSpeaker',
        speakers,
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
    saveSpeaker(state, action) {
      return {
        ...state,
        speakers: action.speakers,
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
        data = [...oldData, ...data];
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
