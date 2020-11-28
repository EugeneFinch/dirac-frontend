import React, { useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import { history } from 'umi';
import styles from './index.less';
import { getToken } from '@/utils/utils';

const Login = () => {
  useEffect(() => {
    if (getToken()) {
      history.push('/');
    }
  }, [getToken()]);

  const handleSubmit = () => {
    window.location.href = 'http://localhost:3030/oauth/google';
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      />
    </div>
  );
};

export default Login;
