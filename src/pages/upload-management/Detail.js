import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { get } from 'lodash';

import Transcript from '@/pages/upload-management/components/Transcript';
import AudioComponent from '@/pages/upload-management/components/AudioComponent';

const UploadManagement = ({
  loadingTranscript,
  getTranscript,
  transcript,
  location,
  match,
  recordingDetail,
  getRecodingDetail,
  loadingRecording,
}) => {
  const id = get(match, 'params.id');

  return (
    <PageContainer title="Transcript" breadcrumb={false}>
      <Transcript
        {...transcript}
        id={id}
        location={location}
        loading={loadingTranscript}
        getTranscript={getTranscript}
      />
      <AudioComponent
        id={id}
        loading={loadingRecording}
        recordingDetail={recordingDetail}
        getRecodingDetail={getRecodingDetail}
      />
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement }) => {
  const transcript = get(uploadManagement, 'transcript');
  const recordingDetail = get(uploadManagement, 'recordingDetail');
  return {
    loadingTranscript: loading.effects['uploadManagement/getTranscript'],
    loadingRecording: loading.effects['uploadManagement/getRecodingDetail'],
    transcript,
    recordingDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTranscript: (params) =>
    dispatch({
      type: 'uploadManagement/getTranscript',
      params,
    }),
  getRecodingDetail: (params) =>
    dispatch({
      type: 'uploadManagement/getRecodingDetail',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
