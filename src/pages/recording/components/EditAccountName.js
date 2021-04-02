import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined } from '@ant-design/icons';
import { putRecording } from '../services'
import { get } from 'lodash';


const EditAccountName = ({ data, onGetUploadedList, location }) => {
  const [edit, setEdit] = useState(false);
  let accountName = data.account_name ? data.account_name : '';
  const [name, setName] = useState('');
  const submit = async () => {
    setEdit(false);
    if (name) {
      data.old_name = data.account_name;
      data.account_name = name;
      await putRecording({ ...data });
      const page = get(location, 'query.page');
      const limit = get(location, 'query.limit');
      const filter = get(location, 'query.filter');
      onGetUploadedList({ page, limit, filter });
    }
  };

  if (edit) {
    return (
      <div>
        <Row align="middle" gutter={15}>
          <Col>
            <Input style={{ width: 180 }} bordered={false}
              autoFocus
              defaultValue={name || accountName}
              value={name || accountName}
              onPressEnter={submit}
              onChange={({ target }) => setName(target.value)}
            />
          </Col>
          <Col>
            <CloseCircleTwoTone
              style={{ fontSize: 25 }}
              onClick={(e) =>     { e.stopPropagation(); setEdit(false) }}
              twoToneColor="#eb2f96"
            />{' '}
            <CheckCircleTwoTone style={{ fontSize: 25 }} onClick={submit} twoToneColor="#52c41a" />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Row gutter={5}>
      <Col onClick={(e) => { e.stopPropagation(); setEdit(true) }}>{accountName}</Col>
      <Col>
        <EditOutlined onClick={() => setEdit(true)} />
      </Col>
    </Row>
  );
};

export default EditAccountName;
