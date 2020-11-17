import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { get } from 'lodash';
import { connect } from 'umi';

import Dragger from '@/pages/upload-management/components/Dragger';
import DraggerTable from '@/pages/upload-management/components/DraggerTable';

const UploadManagement = ({ loading, onUpload, onGetUploadedList, uploadedList, location }) => {
  return (
    <PageContainer>
      <Spin spinning={!!loading}>
        <Dragger onUpload={onUpload} />
        <DraggerTable
          location={location}
          loading={loading}
          {...uploadedList}
          onGetUploadedList={onGetUploadedList}
        />
      </Spin>
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement }) => {
  const uploadedList = get(uploadManagement, 'uploadedList');
  return {
    loading:
      loading.effects['uploadManagement/onUpload'] ||
      loading.effects['uploadManagement/getUploadedList'],
    uploadedList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onUpload: (params) =>
    dispatch({
      type: 'uploadManagement/onUpload',
      params,
    }),
  onGetUploadedList: (params) =>
    dispatch({
      type: 'uploadManagement/getUploadedList',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
