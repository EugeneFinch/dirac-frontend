import React, { useEffect } from 'react';
import { Card } from 'antd';
import { get } from 'lodash';

import Waveform from './Waveform';

export default ({
  recordingDetail,
  getRecodingDetail,
  loading,
  id,
  onProcess,
  setRecordDuration,
  seekTime,
}) => {
  const url = get(recordingDetail, 'url', '');

  useEffect(() => {
    getRecodingDetail({ id });
  }, [id]);

  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{ padding: '5px 10px 0 10px', background: '#ccc', borderRadius: 8 }}
    >
      <Waveform
        url={url}
        onProcess={onProcess}
        setRecordDuration={setRecordDuration}
        seekTime={seekTime}
      />
    </Card>
  );
};
