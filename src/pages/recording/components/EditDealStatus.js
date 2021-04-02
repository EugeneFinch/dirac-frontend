import React from 'react';
import { Col, Select, Row } from 'antd';
import { get } from 'lodash';
import { putRecording } from '../services'


const EditAccountName = ({ data, onGetUploadedList, location}) => {
  const submit = async (status) => {
    data.deal_status = status;
    await putRecording({ ...data });
    const page = get(location, 'query.page');
    const limit = get(location, 'query.limit');
    const filter = get(location, 'query.filter');
    onGetUploadedList({ page, limit, filter });
  };

  return (
    <div>
    <Row align="middle" gutter={15}>
      <Col>
        <Select style={{ width: 140 }}  bordered={false}
        onClick={(e) => {e.stopPropagation()}}
          value={data.deal_status}
          onChange={( target ) => {submit(target)}}
        >
         <Option value="won">Closed: Won</Option>
         <Option value="lost">Closed: Lost</Option>
         <Option value="ip">In progress</Option>
         </Select>
      </Col>
    </Row>
  </div>
  );
};

export default EditAccountName;
