import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Select } from 'antd';
import { get } from 'lodash';
import { connect } from 'umi';

const getColumns = (isAdmin, onChangeRole) => {
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
  ];
};

const UploadManagement = ({ companyUsers, getCompanyUser, user, updateIsAdmin }) => {
  useEffect(() => {
    getCompanyUser();
  }, []);

  const onChangeRole = (id, val) => {
    updateIsAdmin({ id, is_admin: val });
  };
  const columns = getColumns(user['company_user.is_admin'] === 1, onChangeRole);

  return (
    <PageContainer>
      <Table
        pagination={companyUsers.pagination}
        dataSource={companyUsers.data}
        columns={columns}
      />
      ;
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
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
