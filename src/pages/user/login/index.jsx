import { Button, Col, Row } from 'antd';
import React, { useEffect, Fragment } from 'react';
import ProForm from '@ant-design/pro-form';
import { history } from 'umi';
import googleIcon from '@/assets/google.png';
import microsoftIcon from '@/assets/Microsoft-logo.png'
import { getToken } from '@/utils/utils';
import config from '@/config';

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
            <Fragment>
            <Button type="primary" onClick={handleSubmit} className={styles.googleButton}>
              <Row justify="start" align="middle">
                <Col className={styles.iconContainer}>
                  <img alt="google" src={googleIcon} />
                </Col>
                <Col className={styles.center}>Continue with Google account</Col>
              </Row>
            </Button>
            <Button type="primary" disabled={true} className={styles.googleButton}>
              <Row justify="start" align="middle">
                <Col className={styles.iconContainer}>
                  <img alt="microsoft" src={microsoftIcon} />
                </Col>
                <Col className={styles.center}>Continue with Microsoft</Col>
              </Row>
            </Button>
            <div className={styles.footer_info}>Dirac PTE LTD. All rights reserved</div>
            </Fragment>
          ),
        }}
      />
    </div>
  );
};

export default Login;
