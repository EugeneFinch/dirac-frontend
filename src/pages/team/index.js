import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Select, Button } from 'antd';
import { get } from 'lodash';
import { connect } from 'umi';
import AddUserModal from './AddUserModal';

const getColumns = (isAdmin, onChangeRole, removeUser) => {
  return [
    {
      title: 'Email',
      dataIndex: 'user.email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'is_admin',
      render: (val, { id }) => {
        if (!isAdmin) {
          return val === 1 ? 'Admin' : 'Staff';
        }
        return (
          <Select style={{ width: 120 }} defaultValue={val} onChange={(v) => onChangeRole(id, v)}>
            <Select.Option value={1}>Admin</Select.Option>
            <Select.Option value={0}>Staff</Select.Option>
          </Select>
        );
      },
    },
    {
      title: 'Action',
      render: (_, { id }) => {
        if (isAdmin) {
          return (
            <Button danger onClick={() => removeUser(id)}>
              Remove
            </Button>
          );
        }
        return null;
      },
    },
  ];
};

const Team = ({ teamUsers, getTeamUser, user, updateIsAdmin, removeTeamUser }) => {
  useEffect(() => {
    getTeamUser();
  }, []);

  const onChangeRole = (id, val) => {
    updateIsAdmin({ id, is_admin: val });
  };
  const isAdmin = user['team_user.is_admin'] === 1;

  const columns = getColumns(isAdmin, onChangeRole, removeTeamUser);

  return (
    <PageContainer>
      {isAdmin && <AddUserModal />}
      <Table
        pagination={teamUsers.pagination}
        dataSource={teamUsers.data}
        columns={columns}
        rowKey={(v) => v.id}
      />
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, team, user }) => {
  const teamUsers = get(team, 'teamUsers');
  return {
    loading: loading.effects['team/getTeamUser'],
    teamUsers,
    user: user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTeamUser: (params) =>
    dispatch({
      type: 'team/getTeamUser',
      params,
    }),
  updateIsAdmin: (params) =>
    dispatch({
      type: 'team/updateIsAdmin',
      params,
    }),
  removeTeamUser: (id) =>
    dispatch({
      type: 'team/removeTeamUser',
      params: {
        id,
      },
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(Team);
