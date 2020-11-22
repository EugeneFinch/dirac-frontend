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

  return request('/recording', {
    method: 'GET',
    params: {
      $skip: (page - 1) * limit,
    },
  });
}

export async function getRecodingDetail({ id }) {
  return request(`/recording/${id}`, {
    method: 'GET',
  });
}

export async function getSpeakerName({ id }) {
  return request(`/speaker/${id}`, {
    method: 'GET',
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
      recording_id,
    },
  });
}
