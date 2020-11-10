import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import { get, map } from 'lodash';
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

export const mapToTranscript = array =>
  map(array, item => ({
    // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: get(item, 'speaker_id', ''),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        {get(item, 'content', '')}
      </p>
    ),
    datetime: (
      <Tooltip title={moment(get(item, 'created_at', '')).format('DD-MM-YYYY HH:mm:ss')}>
        <span>{moment(get(item, 'created_at', '')).format('DD-MM-YYYY HH:mm:ss')}</span>
      </Tooltip>
    ),
  }))
