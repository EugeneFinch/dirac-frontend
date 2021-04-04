import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Spin, Select } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined } from '@ant-design/icons';
import { find, get } from 'lodash';
import TeamMember from './TeamMember';

const { Option } = Select;


const EditSpeakerName = ({ speakers, id, putSpeakerName, loading, recordingDetail }) => {
  const [edit, setEdit] = useState(false);
  const speaker = find(speakers, (obj) => obj.id === id);
  let users;
  const children = [];
  if (recordingDetail.record && recordingDetail.record.users) {
    users = JSON.parse(recordingDetail.record.users);
    for (let i = 0; i < users.length; i++) {
      children.push(<Option key={users[i].email}>{users[i].email}</Option>);
    }
  }
  const [input, setInput] = useState('');
  const name = get(speaker, 'name', '');

  useEffect(() => {
    setInput(name);
  }, [name]);

  const team_member = get(speaker, 'team_member', '');

  const submit = () => {
    putSpeakerName({ id, name: input, cb: () => setEdit(false), team_member });
  };

  if (edit) {
    return (
      <Spin spinning={!!loading}>
        <Row align="middle" gutter={10}>
          <Col>
            {children && children.length > 1 ? (<Select defaultValue={name} style={{ width: 180 }} onChange={(status) => setInput(status)} tokenSeparators={[',']}>
              {children}
            </Select>) : (<Input
              autoFocus
              defaultValue={name}
              value={input}
              onPressEnter={({ target }) => {
                putSpeakerName({ id, name: target.value, cb: () => setEdit(false), team_member });
              }}
              onChange={({ target }) => setInput(target.value)}
            />)}
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
        <Col onClick={() => setEdit(true)}>{name}</Col>
        <Col>
          <EditOutlined onClick={() => setEdit(true)} />
        </Col>
        <Col>
          <TeamMember {...{ speakers, id, putSpeakerName, loading }} />
        </Col>
      </Row>
    </Spin>
  );
};

export default EditSpeakerName;
