import request from '@/utils/request';
import { get } from 'lodash';
import { LIMIT } from '../constants';

// export async function onUpload(params) {
//   return request('/upload', {
//     method: 'POST',
//     params,
//   });
// }

export async function getUploadedList(params) {
  const page = get(params, 'page', 1);
  const limit = get(params, 'limit', LIMIT);
  const filter = get(params, 'filter', 'my');
  return request('/recording', {
    method: 'GET',
    params: {
      $skip: (page - 1) * limit,
      '$sort[id]': -1,
      filter,
    },
  });
}

export async function getRecodingDetail({ id }) {
  return request(`/recording/${id}`, {
    method: 'GET',
  });
}

export async function removeRecording(params) {
  return request(`/recording/${params.id}`, {
    method: 'DELETE'
  });
}

export async function getRefSearchKeyWord(params) {
  return request(`/transcript-keyword`, {
    method: 'GET',
    params,
  });
}

export async function getSpeakerName({ id }) {
  return request(`/speaker/${id}`, {
    method: 'GET',
  });
}

export async function putRecording({ id, ...data }) {
  return request(`/recording/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function putSpeakerName({ id, ...data }) {
  return request(`/speaker/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function getTranscript(params) {
  const page = get(params, 'page', 1);
  const limit = get(params, 'limit', LIMIT);
  const recording_id = get(params, 'recording_id');

  return request('/transcript', {
    method: 'GET',
    params: {
      $skip: (page - 1) * limit,
      $limit: limit,
      recording_id,
      predefined_keyword: get(params, 'predefined_keyword', ''),
      content: get(params, 'content', ''),
    },
  });
}

export async function getCoaching({ id }) {
  return request(`/transcript-coaching?recording_id=${id}`, {
    method: 'GET',
  });
}

export async function refreshCoaching({ id }) {
  return request(`/transcript-coaching/${id}`, {
    method: 'PATCH',
  });
}
