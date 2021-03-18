import { Button, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import { history } from 'umi';
import googleIcon from '@/assets/google.png';
import { getToken } from '@/utils/utils';
import config from '@/config';
console.log(`config`, config)
import styles from './index.less';

const Login = () => {
  useEffect(() => {
    if (getToken()) {
      history.push('/');
    }
  }, []);

  const handleSubmit = () => {
    window.location.href = `${config.API_HOST}/oauth/google`;
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: () => (
            <Button type="primary" onClick={handleSubmit} className={styles.googleButton}>
              <Row justify="start" align="middle">
                <Col className={styles.iconContainer}>
                  <img alt="google" src={googleIcon} />
                </Col>
                <Col className={styles.center}>Sign in with Google</Col>
              </Row>
            </Button>
          ),
        }}
      />
    </div>
  );
};

export default Login;
