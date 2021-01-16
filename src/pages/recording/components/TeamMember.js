import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { find, get } from 'lodash';

const TeamMember = ({ speakers, id, putSpeakerName }) => {
  const speaker = find(speakers, (obj) => obj.id === id);
  const team_member = get(speaker, 'team_member', '');
  const name = get(speaker, 'name', '');

  const submit = () => {
    putSpeakerName({ id, team_member: team_member ? 0 : 1, name });
  };

  return (
    <Row gutter={15}>
      <Col>
        <Checkbox checked={!!team_member} onChange={submit}>
          Team Member
        </Checkbox>
      </Col>
    </Row>
  );
};

export default TeamMember;
