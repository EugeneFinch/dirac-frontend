import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { get } from 'lodash';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Switch, Typography, List } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { LIMIT } from './constants';

const Welcome = ({ getCalendarEvent, calendarEvents, loading }) => {
  const dataSource = get(calendarEvents, 'data', []);
  const page = get(calendarEvents, 'pagination.current', 1);
  const limit = get(calendarEvents, 'pagination.pageSize', LIMIT);

  useEffect(() => {
    getCalendarEvent({ page, limit });
  }, [page]);

  const Item = ({ item }) => (
    <List.Item>
      <Row style={{ width: '100%' }} align="top" justify="space-between">
        <Col>
          <p>
            <Typography.Title level={5} strong>
              {item.summary}
            </Typography.Title>
          </p>
          <Row gutter={20}>
            <Col>
              <Typography.Text strong type="secondary">
                <CalendarOutlined />
              </Typography.Text>{' '}
              <Typography.Text>
                {moment.tz(item.start, 'Asia/Bangkok').format('DD-MM-YYYY HH:mm:ss')}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text strong type="secondary">
                <ClockCircleOutlined />
              </Typography.Text>{' '}
              <Typography.Text>
                {moment.tz(item.start, 'Asia/Bangkok').format('HH:mm:ss')}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Switch />
        </Col>
      </Row>
    </List.Item>
  );
  return (
    <PageContainer>
      <Card>
        <Row style={{ textAlign: 'center' }}>
          <Col span={24}>
            <Typography.Title strong>Welcome to Dirac</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">
              Invite <a href="#">ai@diracnlp.com</a> to a calendar invite to capture your meeting
            </Typography.Text>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <div>
              <Typography.Title level={4} strong>
                <HistoryOutlined /> Upcoming Meetings
              </Typography.Title>
            </div>
          </Col>
        </Row>
        <List
          loading={loading}
          size="large"
          bordered={false}
          dataSource={dataSource}
          renderItem={(item) => <Item item={item} />}
        />
      </Card>
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, welcome }) => {
  const calendarEvents = get(welcome, 'calendarEvents');
  return {
    loading: loading.effects['welcome/getCalendarEvent'],
    calendarEvents,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCalendarEvent: (params) =>
    dispatch({
      type: 'welcome/getCalendarEvent',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(Welcome);
