import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { get } from 'lodash';
import { connect } from 'umi';

import Dragger from '@/pages/recording/components/Dragger';
import DraggerTable from '@/pages/recording/components/DraggerTable';

const UploadManagement = ({ loading, onUpload, onGetUploadedList, uploadedList, location, putRecording, removeRecording, user }) => {
  return (
    <PageContainer>
      <Spin spinning={!!loading}>
        <Dragger onUpload={onUpload} />
        <DraggerTable
          location={location}
          loading={loading}
          {...uploadedList}
          onGetUploadedList={onGetUploadedList}
          putRecording={putRecording}
          removeRecording={removeRecording}
          user={user}
        />
      </Spin>
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement, user }) => {
  const uploadedList = get(uploadManagement, 'uploadedList');
  return {
    loading:
      loading.effects['uploadManagement/onUpload'] ||
      loading.effects['uploadManagement/getUploadedList'],
    uploadedList,
    user: user.currentUser
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
  putRecording: (params) =>
    dispatch({
      type: 'uploadManagement/putRecording',
      params,
    }),
  removeRecording: (params) =>
    dispatch({
      type: 'uploadManagement/removeRecording',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
