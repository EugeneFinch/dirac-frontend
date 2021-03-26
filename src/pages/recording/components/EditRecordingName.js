import React, { useEffect, useState } from 'react';
import { Input, Row } from 'antd';

const EditRecordingName = ({ id, name, recording, putRecording }) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(name);
  }, [name]);

  const submit = () => {
    putRecording({ id, ...recording, filename: input, cb: () =>  { setEdit(false); setInput(input) } });
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
        <label defaultValue={input} onClick={onClickRecordingName}>{input}
        </label>
      )}
    </Row>
  );
};

export default EditRecordingName;
