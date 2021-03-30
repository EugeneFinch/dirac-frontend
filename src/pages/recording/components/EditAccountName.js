import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { putRecording } from '../services'
const EditAccountName = ({ data }) => {
  const [edit, setEdit] = useState(false);
  let accountName = data.account_name ? data.account_name : '';
  const [name, setName] = useState('');
  const submit = (e) => {
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
            <Input style={{ width: 180 }}
              autoFocus
              defaultValue={name || accountName}
              value={name || accountName}
              onPressEnter={submit}
              onChange={({ target }) => setName(target.value)}
            />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Row gutter={5}>
      <Col onClick={() => setEdit(true)}>{accountName}</Col>
      <Col>
        <EditOutlined onClick={() => setEdit(true) } />
      </Col>
    </Row>
  );
};

export default EditAccountName;
