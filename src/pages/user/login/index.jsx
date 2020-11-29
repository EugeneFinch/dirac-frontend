import { GoogleCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
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
  }, []);

  const handleSubmit = () => {
    window.location.href = 'http://api.diracnlp.com/oauth/google';
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: () => (
            <Button onClick={handleSubmit} style={{ width: '100%' }} size="large">
              <GoogleCircleFilled /> Login By Google
            </Button>
          ),
        }}
      />
    </div>
  );
};

export default Login;
