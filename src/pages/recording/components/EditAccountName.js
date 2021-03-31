import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined } from '@ant-design/icons';
import { putRecording } from '../services'
const EditAccountName = ({ data }) => {
  const [edit, setEdit] = useState(false);
  let accountName = data.account_name ? data.account_name : 'null';
  const [name, setName] = useState('');
  const submit = (e) => {
    e.stopPropagation()
    if (name) {
      data.account_name = name;
      putRecording({ ...data });
      setName(name)
    }
    setEdit(false);

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
        <EditOutlined onClick={(e) => { e.stopPropagation(); setEdit(true) }} />
      </Col>
    </Row>
  );
};

export default EditAccountName;
