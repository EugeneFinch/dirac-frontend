import React, { useState } from 'react';
import { connect } from 'umi';
import { Col, Input, Row, Spin } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined } from '@ant-design/icons';

const EditSpeakerName = ({ name, id, putSpeakerName, loading }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(name);

  const submit = () => {
    putSpeakerName({ id, name: input, cb: () => setEdit(false) });
  };

  if (edit) {
    return (
      <Spin spinning={!!loading}>
        <Row align="middle" gutter={10}>
          <Col>
            <Input
              defaultValue={name}
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
          </Col>
          <Col>
            <CloseCircleTwoTone
              style={{ fontSize: 25 }}
              onClick={() => setEdit(false)}
              twoToneColor="#eb2f96"
            />{' '}
            <CheckCircleTwoTone style={{ fontSize: 25 }} onClick={submit} twoToneColor="#52c41a" />
          </Col>
        </Row>
      </Spin>
    );
  }

  return (
    <Spin spinning={!!loading}>
      <Row gutter={15}>
        <Col>{name}</Col>
        <Col>
          <EditOutlined onClick={() => setEdit(true)} />
        </Col>
      </Row>
    </Spin>
  );
};

const mapDispatchToProps = (dispatch) => ({
  putSpeakerName: (params) =>
    dispatch({
      type: 'uploadManagement/putSpeakerName',
      params,
    }),
});

export default connect(null, mapDispatchToProps)(EditSpeakerName);
