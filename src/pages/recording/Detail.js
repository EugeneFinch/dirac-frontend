import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { get } from 'lodash';
import moment from 'moment'
import KeywordSearch from '@/pages/recording/components/KeywordSearch';
import Transcript from '@/pages/recording/components/Transcript';
import AudioComponent from '@/pages/recording/components/AudioComponent';
import Coaching from '@/pages/recording/components/Coaching';
import { Col, Row, Tag, Modal, Button } from 'antd';
import UsersPopover from '@/pages/recording/components/usersPopover';
import {  CheckCircleOutlined,
  CloseCircleOutlined } from '@ant-design/icons';

const Detail = ({
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
  const [seekTime, setSeekTime] = useState(0);
  const [recordDuration, setRecordDuration] = useState(0);
  let dealStatus = () => {
    switch (recordingDetail.deal_status) {
      case 'won': return (<Tag icon={<CheckCircleOutlined />} color="success">Closed: Won</Tag>);
      case 'lost': return (<Tag icon={<CloseCircleOutlined />} color="error">Closed: Lost</Tag>);
      default: return (<Tag color="processing">In progress</Tag>);
    }
  }

  const modalText = () => {
    if (recordingDetail.status === 'RECORDING') return (<div>This recording is currently in the recording</div>)
    if (recordingDetail.status === 'IN_PROGRESS') return (<div>This recording is currently in processing</div>)
    return (
      <div>Record contains error.
        <br></br>Status: {recordingDetail.status} | ID: {recordingDetail.id}
        <br></br>Сontact the administrator
      </div>
    )
  }

  const onClickParagraph = (item) => {
    if (recordDuration) {
      const startTime = Number(get(item, 'start_time'), 0);
      setSeekTime(startTime / recordDuration);
    }
  };
  const date = `${moment(recordingDetail.created_at).format('MMM DD, YYYY')} | ${moment(recordingDetail.created_at).format('HH:mm')}`;
  return (
    <PageContainer breadcrumb={false}>
      <a onClick={() => history.push(`/recording`)}><b>{`< Back `}</b></a>
      <h2 style={{ marginTop: 15, marginBottom: 15 }}>{recordingDetail.subject} | {recordingDetail.account_name} {dealStatus()}</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <KeywordSearch />
          <Col style={{ marginTop: 15, marginBottom: 15, fontSize: 15 }}>
            <UsersPopover data={recordingDetail} />
            <span style={{ marginLeft: 15 }}>{date}</span>
          </Col>
        </Col>
        <Modal
          visible={recordingDetail.id && (!recordingDetail.url || recordingDetail.status !== 'COMPLETED')}
          title="Info"
          onCancel={() => history.go(0)}
          footer={[
            <Button key="submit" onClick={() => history.go(0)}>
              Reload
            </Button>,
            <Button key="back" type="primary" onClick={() => history.push(`/recording`)}>
              Back
            </Button>,
          ]}
        >
          {recordingDetail.status && modalText()}
        </Modal>
        <Col xs={24} sm={24} md={14} lg={16} xl={17}>
          <Transcript
            {...transcript}
            getSpeakerInfo={getSpeakerInfo}
            speakers={speakers}
            loadingSpeaker={loadingSpeaker}
            id={id}
            recordingDetail={recordingDetail}
            location={location}
            getTranscript={getTranscript}
            processTime={processTime}
            putSpeakerName={putSpeakerName}
            onClickParagraph={onClickParagraph}
            recordDuration={recordDuration}
          />
        </Col>
        <Col xs={24} sm={24} md={10} lg={8} xl={7}>
          <Coaching id={id} />
        </Col>
        <Col xs={24}>
          <AudioComponent
            id={id}
            seekTime={seekTime}
            loading={loadingRecording}
            recordingDetail={recordingDetail}
            getRecodingDetail={getRecodingDetail}
            onProcess={setProcessTime}
            setRecordDuration={setRecordDuration}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

const mapSateToProps = ({ loading, uploadManagement }) => {
  const transcript = get(uploadManagement, 'transcript');
  const recordingDetail = get(uploadManagement, 'recordingDetail');
  const speakers = get(uploadManagement, 'speakers');
  return {
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

export default connect(mapSateToProps, mapDispatchToProps)(Detail);
