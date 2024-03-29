/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken } from './utils';
import config from '../config';

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'Create or modify data successfully. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Delete data successfully. ',
  400: 'There is an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (the token, username, password are wrong). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request is for a record that does not exist, and the server is not operating. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway has timed out. ',
};
/**
 * 异常处理程序
 */
const errorHandler = async (error) => {
  const { response } = error;
  const data = await response.clone().json();

  if (response && response.status) {
    const errorText = data.message || response.statusText || codeMessage[response.status];
    notification.error({
      message: `Request error`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const token = getToken();

const request = extend({
  errorHandler,
  credentials: 'include',
  prefix: config.API_HOST,
  // prefix: 'http://localhost:3030',
  ...(token
    ? {
        headers: {
          Authorization: token,
        },
      }
    : {}),
});
export default request;
