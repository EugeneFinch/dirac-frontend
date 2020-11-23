import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import { history } from 'umi';

export default () => {
  history.push('/upload-management');

  return (
    <PageContainer>
      <Card loading>
        <Typography.Text strong>
          Hello{' '}
          <a href="https://google.com" rel="noopener noreferrer" target="__blank">
            DIRAC
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
