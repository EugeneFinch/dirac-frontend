import React, { useEffect } from 'react';
import { history } from 'umi';
import { Col, Input, Row, Spin, Button, Table, Tag } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import EditAccountName from './EditAccountName'
import EditDealStatus from './EditDealStatus'

import { LIMIT, UPLOAD_STATUS } from '../constants';

export default ({ data, pagination = {}, loading, onGetUploadedList, location }) => {
  const page = get(location, 'query.page');
  const limit = get(location, 'query.limit');
  const filter = get(location, 'query.filter');
  useEffect(() => {
    if (!page || !limit || !filter) {
      history.push(`/recording?page=1&limit=${LIMIT}&filter=my`);
      return;
    }
    onGetUploadedList({ page, limit, filter });
  }, [page, limit, filter]);

  const columns = [
    {
      title: 'Subject',
      key: 'subject',
      dataIndex: 'subject',
    },
    {
      title: 'Participans',
      key: 'user.email',
      dataIndex: 'record',
      render: (v) => v ? `${v.org} + ${v.users - 1}` : '',
    },
    {
      title: 'Account name',
      key: 'accName',
      width: 280,
      dataIndex: '',
      render: (data) => (
        <EditAccountName data={data}/>
      )
    },
    {
      title: 'Deal status',
      key: 'status',
      dataIndex: '',
      render: (data) => (
        <EditDealStatus data={data}/>
      )
    },
    {
      title: 'Date',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at) => (<div>{moment(created_at).format('MMM DD, YYYY')}<br></br>{moment(created_at).format('HH:mm:ss')}</div>),
    },
    {
      title: 'Action',
      render: ({ id }) => {
        const onViewDetail = () => {
          history.push(`/recording/${id}`);
        };
        return (
          <Row gutter={15} justify="start" align="middle">
            <Col>
              <Button onClick={onViewDetail} type="primary">
                View Detail
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleTableChange = ({ current, pageSize }) => {
    history.push(`/recording?page=${current}&limit=${pageSize}&filter=${filter}`);
  };

  return (
    <div>
    Filter by: {filter === 'my' ? <a onClick={() => history.push(`/recording?page=${page}&limit=${LIMIT}&filter=all`)}>My calls</a>: <a onClick={() => history.push(`/recording?page=${page}&limit=${LIMIT}&filter=my`)}>Team member calls</a>}
    <Table
      style={{ marginTop: 15 }}
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
    </div>
  );
};
