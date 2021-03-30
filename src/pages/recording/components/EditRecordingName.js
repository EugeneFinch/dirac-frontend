import React, { useEffect, useState } from 'react';
import { Input, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditRecordingName = ({ id, name, recording, putRecording }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(name);
  }, [name]);

  const submit = () => {
    putRecording({ id, ...recording, subject: input, cb: () =>  { setEdit(false); setInput(input) } });
  };

  const onClickRecordingName = (e) => {
    e.stopPropagation();
    setEdit(true);
  }

  const onChangeRecordingName = ({ target }) => {
    setInput(target.value)
  }

  return (
    <Row gutter={15} justify="start" align="middle">
      { edit ? <Input autoFocus defaultValue={input} onPressEnter={submit} onClick={onClickRecordingName} onChange={onChangeRecordingName}></Input> : (
         <Row gutter={5}>
         <Col onClick={onClickRecordingName}>{input}</Col>
         <Col>
           <EditOutlined onClick={onClickRecordingName} />
         </Col>
       </Row>
      )}
    </Row>
  );
};

export default EditRecordingName;
