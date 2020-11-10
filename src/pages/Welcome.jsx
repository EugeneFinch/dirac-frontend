import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

export default () => (
  <PageContainer>
    <Card>
      <Typography.Text strong>
        Hello{' '}
        <a
          href="https://google.com"
          rel="noopener noreferrer"
          target="__blank"
        >
          DIRAC
        </a>
      </Typography.Text>
    </Card>
  </PageContainer>
);
