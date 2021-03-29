import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, Tag} from 'antd';

import { get } from 'lodash';
import moment from 'moment';

import { LIMIT, UPLOAD_STATUS } from '../constants';
import EditRecordingName from './EditRecordingName';
import ThreeDotComponent from './ThreeDotComponent';

export default ({ data, pagination = {}, loading, onGetUploadedList, location, putRecording, removeRecording, user }) => {
  const page = get(location, 'query.page');
  const limit = get(location, 'query.limit');

  useEffect(() => {
    if (!page || !limit) {
      history.push(`/recording?page=1&limit=${LIMIT}`);
      return;
    }
    onGetUploadedList({ page, limit });
  }, [page, limit]);

  const isAdmin = user['team_user.is_admin'] === 1;

  const columns = [
    {
      title: 'File name',
      render: (recording) => <EditRecordingName
        id={recording?.id}
        name={recording?.filename}
        recording={recording}
        putRecording={putRecording}
      />
    },
    {
      title: 'Name',
      key: 'user.email',
      dataIndex: 'user.email',
      render: (v) => v.split('@')[0],
    },
    {
      title: 'Created at',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at) => moment(created_at).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (UPLOAD_STATUS[status] && (
        <Tag color={UPLOAD_STATUS[status].color}>{UPLOAD_STATUS[status].text}</Tag>
      ))
    },
    {
      title: 'Action',
      render: ({ id }) => <ThreeDotComponent
        id={id}
        page={page}
        limit={limit}
        onGetUploadedList={onGetUploadedList}
        removeRecording={removeRecording}
        isAdmin={isAdmin}
      />
    },
  ];

  const handleTableChange = ({ current, pageSize }) => {
    history.push(`/recording?page=${current}&limit=${pageSize}`);
  };

  return (
    <Table
      style={{ marginTop: 15 }}
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      onRow={(record) => {
        return {
          onClick: () => history.push(`/recording/${record.id}`),
        };
      }}
    />
  );
};
