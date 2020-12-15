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

const Company = ({ companyUsers, getCompanyUser, user, updateIsAdmin, removeCompanyUser }) => {
  useEffect(() => {
    getCompanyUser();
  }, []);

  const onChangeRole = (id, val) => {
    updateIsAdmin({ id, is_admin: val });
  };
  const isAdmin = user['company_user.is_admin'] === 1;

  const columns = getColumns(isAdmin, onChangeRole, removeCompanyUser);

  return (
    <PageContainer>
      {isAdmin && <AddUserModal />}
      <Table
        pagination={companyUsers.pagination}
        dataSource={companyUsers.data}
        columns={columns}
        rowKey={(v) => v.id}
      />
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, company, user }) => {
  const companyUsers = get(company, 'companyUsers');
  return {
    loading: loading.effects['company/getCompanyUser'],
    companyUsers,
    user: user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCompanyUser: (params) =>
    dispatch({
      type: 'company/getCompanyUser',
      params,
    }),
  updateIsAdmin: (params) =>
    dispatch({
      type: 'company/updateIsAdmin',
      params,
    }),
  removeCompanyUser: (id) =>
    dispatch({
      type: 'company/removeCompanyUser',
      params: {
        id,
      },
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(Company);
