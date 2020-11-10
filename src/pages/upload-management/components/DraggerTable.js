import React, { useEffect } from 'react';
import { history } from 'umi';
import { Button, Col, Row, Table, Tag, } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { LIMIT } from '../constants';

export default ({ data, pagination = {}, loading, onGetUploadedList, location }) => {
  const page = get(location, 'query.page');
  const limit = get(location, 'query.limit');

  useEffect(() => {
    if (!page || !limit) {
      history.push(`/upload-management?page=1&limit=${LIMIT}`);
      return;
    }
    onGetUploadedList({ page, limit });
  }, [page, limit])

  const columns = [
    {
      title: 'File name',
      key: 'created_at',
      dataIndex: 'filename',
    },
    {
      title: 'Created at',
      key: 'created_at',
      dataIndex: 'created_at',
      render: created_at => moment(created_at).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => <Tag color='magenta'>{status}</Tag>,
    },
    {
      title: 'Action',
      render: ({ id }) => {
        const onViewDetail = () => {
          history.push('/upload-management/' + id);
        }
        return (
          <Row gutter={15} justify='start' align='middle'>
            <Col>
              <Button>Edit</Button>
            </Col>
            <Col>
              <Button onClick={onViewDetail} type='primary'>View Detail</Button>
            </Col>
          </Row>
        )
      }
    },
  ]

  const handleTableChange = ({ current, pageSize }) => {
    history.push(`/upload-management?page=${current}&limit=${pageSize}`);
  };

  return (
    <Table
      style={{ marginTop: 15 }}
      columns={columns}
      rowKey={record => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  )
}
