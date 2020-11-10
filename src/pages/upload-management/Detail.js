import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

import Transcript from '@/pages/upload-management/components/Transcript';
import { get } from 'lodash';

const UploadManagement = ({
  loading, getTranscript, transcript, location
}) => {
  return (
    <PageContainer title='Transcript' breadcrumb={false}>
      <Transcript {...transcript} location={location} loading={loading} getTranscript={getTranscript} />
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement }) => {
  const transcript = get(uploadManagement, 'transcript')
  return {
    loading:
      loading.effects['uploadManagement/getTranscript'],
    transcript
  }
};

const mapDispatchToProps = dispatch => ({
  getTranscript: params =>
    dispatch({
      type: 'uploadManagement/getTranscript',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
