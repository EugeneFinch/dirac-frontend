import { Row, Spin } from 'antd';
import React from 'react';
import { Redirect } from 'umi';
import { setToken } from '@/utils/utils';
import { get } from 'lodash';

const LoginSuccess = ({ location }) => {
  const access_token = get(location, 'query.access_token', '');

  if (access_token) {
    setToken(access_token);
    window.location.href = '/';
  } else {
    return <Redirect to="/user/login" />;
  }

  return (
    <Row justify="center">
      <Spin spinning />
    </Row>
  );
};

export default LoginSuccess;
