/* eslint-disable */
import { findIndex, forEach, get, isEmpty, set } from 'lodash';
import { LIMIT } from '../constants';
import {
  getRecodingDetail,
  getUploadedList,
  getTranscript,
  getSpeakerName,
  putSpeakerName,
  getRefSearchKeyWord,
  getCoaching,
  refreshCoaching,
  putRecording,
  removeRecording
} from '../services';

export default {
  namespace: 'uploadManagement',
  state: {
    putRecording: {},
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
    speakers: null,
    searchKeyWordResult: {
      data: [],
      pagination: {},
    },
    refSearchKeyWord: [],
    transcriptCoaching: {},
  },
  effects: {
    *getRecodingDetail({ params }, { call, put }) {
      const recordingDetail = yield call(getRecodingDetail, params);

      yield put({
        type: 'saveRecording',
        recordingDetail,
      });
    },
    *putRecording({ params }, { call, put, select }) {
      const { cb, ...body } = params;

      const updatedRecording = yield call(putRecording, body);

      if(updatedRecording) {
        if (cb) cb();

        yield put({
          type: 'saveUpdatedRecording',
          updatedRecording,
        });
      }
    },

    *removeRecording({ params }, { call, put }) {
      yield call(removeRecording, params);
      yield put({
        type: 'getUploadedList',
        params
      });
    },

    *getRefSearchKeyWord({ params }, { call, put, select }) {
      const result = yield call(getRefSearchKeyWord, params);
      yield put({
        type: 'saveRefSearchKeyWord',
        result,
      });
    },
    *getSpeakerInfo({ params }, { all, call, put, select }) {
      const ids = get(params, 'ids', []);

      let speakers = yield select((state) => state.uploadManagement.speakers);

      if (isEmpty(ids)) {
        yield put({
          type: 'saveSpeaker',
          speakers,
        });
        return;
      }

      const newSpeakers = yield all(ids.map((id) => call(getSpeakerName, { id })));

      if (isEmpty(speakers)) {
        speakers = newSpeakers;
      } else {
        forEach(newSpeakers, (item) => {
          const existSpeaker = find(speakers, (obj) => obj.id === item.id);
          if (!existSpeaker) {
            speakers.push(item);
          }
        });
      }

      yield put({
        type: 'saveSpeaker',
        speakers,
      });
    },
    *putSpeakerName({ params }, { call, put, select }) {
      const { cb, ...body } = params;
      const id = get(body, 'id');
      const name = get(body, 'name');
      const team_member = get(body, 'team_member');

      const newSpeaker = yield call(putSpeakerName, body);

      if (newSpeaker) {
        if (cb) cb();
        let speakers = yield select((state) => state.uploadManagement.speakers);

        const index = findIndex(speakers, (item) => item.id === id);
        speakers[index] = {
          id,
          name,
          team_member,
        };

        yield put({
          type: 'saveSpeaker',
          speakers,
        });
      }
    },
    *getTranscript({ params }, { call, put }) {
      const { loadMore, ...restParams } = params;
      const response = yield call(getTranscript, restParams);
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
      const limit = get(response, 'limit', LIMIT);

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
    *searchKeyWord({ params }, { call, select, put }) {
      const { action, ...restParams } = params;
      const preKeyword = get(restParams, 'predefined_keyword');
      const content = get(restParams, 'content');
      if (!preKeyword && !content) {
        yield put({
          type: 'saveSearchKeywordResult',
          data:[],
          pagination:{},
        });
        return;
      }

      const recordingId = yield select(({ uploadManagement }) =>
        get(uploadManagement, 'recordingDetail.id'),
      );
      if (!recordingId) {
        return;
      }
      const currentPage = yield select(({ uploadManagement }) =>
        get(uploadManagement, 'searchKeyWordResult.pagination.current', 1),
      );
      const totalPage = yield select(({ uploadManagement }) =>
        get(uploadManagement, 'searchKeyWordResult.pagination.total', 1),
      );
      if (action && action === 'prev') {
        restParams.page = currentPage > 1 ? currentPage - 1 : 1;
      } else if (action && action === 'next') {
        restParams.page = currentPage < totalPage ? currentPage + 1 : 1;
      }

      const response = yield call(getTranscript, { ...restParams, recording_id: recordingId });
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
        type: 'saveSearchKeywordResult',
        data,
        pagination,
      });
    },
    *getCoaching({ params }, { call, put }) {
      const transcriptCoaching = yield call(getCoaching, params);

      yield put({
        type: 'saveTranscriptCoaching',
        transcriptCoaching,
      });
    },
    *refreshCoaching({ params }, { call, put }) {
      const transcriptCoaching = yield call(refreshCoaching, params);

      yield put({
        type: 'saveTranscriptCoaching',
        transcriptCoaching,
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
    saveUpdatedRecording(state, action) {
      return {
        ...state,
        putRecording: action.updatedRecording,
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
        transcript: {
          data: [],
          pagination: {
            current: 1,
            limit: LIMIT,
          },
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
    saveSearchKeywordResult(state, action) {
      return {
        ...state,
        searchKeyWordResult: {
          data: get(action, 'data', []),
          pagination: get(action, 'pagination', []),
        },
      };
    },
    saveRefSearchKeyWord(state, action) {
      return {
        ...state,
        refSearchKeyWord: get(action, 'result', []),
      };
    },
    saveTranscriptCoaching(state, action) {
      return {
        ...state,
        transcriptCoaching:
          get(action, 'transcriptCoaching.data[0]') || get(action, 'transcriptCoaching', {}),
      };
    },
  },
};
