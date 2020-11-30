import { Row, Spin } from 'antd';
import React from 'react';
import { history, Redirect } from 'umi';
import { setToken } from '@/utils/utils';
import { get } from 'lodash';

const LoginSuccess = ({ location }) => {
  console.log(location);
  const access_token = get(location, 'access_token', '');

  if (access_token) {
    setToken(access_token);
    history.replace('/');
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
