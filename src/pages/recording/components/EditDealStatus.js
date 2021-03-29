import React, { useState } from 'react';
import { Col, Select, Row } from 'antd';

import { putRecording } from '../services'
const EditAccountName = ({ data }) => {
  const [status, setStatus] = useState(false);
  const submit = (status) => {
    data.deal_status = status;
    putRecording({ ...data });
    setStatus(status)
  };

  return (
    <div>
    <Row align="middle" gutter={1}>
      <Col>
        <Select style={{ width: 120 }}  bordered={false}
          value={status || data.deal_status}
          onChange={( target ) => submit(target)}
        >
         <Option value="won">Close: Won</Option>
         <Option value="lost">Close: Lost</Option>
         <Option value="ip">In progress</Option>
         </Select>
      </Col>
    </Row>
  </div>
  );
};

export default EditAccountName;
