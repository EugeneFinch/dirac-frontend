import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import { get, map,set } from 'lodash';
import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const mapToTranscript = (array,highlightItem) =>
  map(array, (item) => {
    const isHighlighKeyword = item.start_time === get(highlightItem,'start_time');
    if(isHighlighKeyword){
      set(item,'content',highlightItem.content)
    }

    return {
      speaker_id: item.speaker_id,
      start_time: item.start_time,
      content: <p dangerouslySetInnerHTML={{__html:get(item, 'content', '')}}/>,
      datetime: (
        <Tooltip title={moment(get(item, 'created_at', '')).format('DD-MM-YYYY HH:mm:ss')}>
          <span>{moment(get(item, 'created_at', '')).format('DD-MM-YYYY HH:mm:ss')}</span>
        </Tooltip>
      ),
    };
  });

export function safelyParseJSON(json) {
  let parsed;

  if (json) {
    try {
      parsed = JSON.parse(json);
    } catch (e) {
      throw new Error(e);
    }
  }

  return parsed;
}

export function getToken() {
  if (localStorage.getItem('access_token')) {
    return localStorage.getItem('access_token');
  }

  return null;
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function setToken(access_token) {
  localStorage.setItem('access_token', access_token);
}
