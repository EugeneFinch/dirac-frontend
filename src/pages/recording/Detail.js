import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { get } from 'lodash';

import Transcript from '@/pages/recording/components/Transcript';
import AudioComponent from '@/pages/recording/components/AudioComponent';

const UploadManagement = ({
  loadingTranscript,
  getTranscript,
  transcript,
  location,
  match,
  recordingDetail,
  getRecodingDetail,
  loadingRecording,
  getSpeakerInfo,
  speakers,
  loadingSpeaker,
  putSpeakerName,
}) => {
  const id = get(match, 'params.id');
  const [processTime, setProcessTime] = useState(0);

  return (
    <PageContainer title="Transcript" breadcrumb={false}>
      <Transcript
        {...transcript}
        getSpeakerInfo={getSpeakerInfo}
        speakers={speakers}
        loadingSpeaker={loadingSpeaker}
        id={id}
        location={location}
        loading={loadingTranscript}
        getTranscript={getTranscript}
        processTime={processTime}
        putSpeakerName={putSpeakerName}
      />
      <AudioComponent
        id={id}
        loading={loadingRecording}
        recordingDetail={recordingDetail}
        getRecodingDetail={getRecodingDetail}
        processTime={processTime}
        onProcess={setProcessTime}
      />
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement }) => {
  const transcript = get(uploadManagement, 'transcript');
  const recordingDetail = get(uploadManagement, 'recordingDetail');
  const speakers = get(uploadManagement, 'speakers');
  return {
    loadingTranscript: loading.effects['uploadManagement/getTranscript'],
    loadingRecording: loading.effects['uploadManagement/getRecodingDetail'],
    loadingSpeaker: loading.effects['uploadManagement/putSpeakerName'],
    transcript,
    recordingDetail,
    speakers,
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
  getSpeakerInfo: (params) =>
    dispatch({
      type: 'uploadManagement/getSpeakerInfo',
      params,
    }),
  putSpeakerName: (params) =>
    dispatch({
      type: 'uploadManagement/putSpeakerName',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(UploadManagement);
