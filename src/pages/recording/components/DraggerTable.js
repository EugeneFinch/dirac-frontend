import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, Popover } from 'antd';

import { get } from 'lodash';
import moment from 'moment';
import EditAccountName from './EditAccountName'
import EditDealStatus from './EditDealStatus'

import { LIMIT, UPLOAD_STATUS } from '../constants';
import EditRecordingName from './EditRecordingName';
import CallsActions from './callsActions';
import UsersPopover from './usersPopover';
import ThreeDotComponent from './ThreeDotComponent';

export default ({ data, pagination = {}, loading, onGetUploadedList, location, putRecording, removeRecording, user }) => {
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

  const isAdmin = user['team_user.is_admin'] === 1;

  const columns = [
    {

      title: 'Subject',
      key: 'subject',
      render: (recording) => <EditRecordingName
        id={recording?.id}
        name={recording?.subject}
        recording={recording}
        putRecording={putRecording}
      />
    },
    {
      title: 'Participants',
      key: 'user.email',
      render: (data) =>  <UsersPopover data={data}/>
    },
    {
      title: 'Account name',
      key: 'accName',
      width: 280,
      dataIndex: '',
      render: (data) => <EditAccountName data={data}/>
    },
    {
      title: 'Deal status',
      key: 'status',
      dataIndex: '',
      render: (data) => <EditDealStatus data={data}/>
    },
    {
      title: 'Date',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at) => (<div>{moment(created_at).format('MMM DD, YYYY')}<br></br>{moment(created_at).format('HH:mm:ss')}</div>),
    },
    {
      title: 'Action',
      render: ({ id }) => <ThreeDotComponent
        id={id}
        removeRecording={removeRecording}
        isAdmin={isAdmin}
      />
    },
  ];

  const handleTableChange = ({ current, pageSize }) => {
    history.push(`/recording?page=${current}&limit=${pageSize}&filter=${filter}`);
  };

  return (
    <div>
    Filter by: {filter === 'my' ? <a onClick={() => history.push(`/recording?page=${page}&limit=${LIMIT}&filter=all`)}>My calls</a>: <a onClick={() => history.push(`/recording?page=${page}&limit=${LIMIT}&filter=my`)}>Team member calls</a>}
    <Table
      style={{ marginTop: 15, cursor: 'pointer' }}
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
    </div>
  );
};
