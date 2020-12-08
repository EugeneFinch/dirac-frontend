import React, { useEffect } from 'react';
import { Card } from 'antd';
import { get } from 'lodash';

import Waveform from './Waveform';

export default ({ processTime, recordingDetail, getRecodingDetail, loading, id, onProcess }) => {
  const url = get(recordingDetail, 'url', '');

  useEffect(() => {
    getRecodingDetail({ id });
  }, [id]);

  return (
    <Card
      style={{ marginTop: 15 }}
      loading={loading}
      bordered={false}
      bodyStyle={{ padding: '5px 10px 0 10px', background: '#ccc', borderRadius: 8 }}
    >
      <Waveform processTime={processTime} url={url} onProcess={onProcess} />
    </Card>
  );
};
