import React from 'react';
import { Skeleton, Avatar } from 'antd';
import { get, find } from 'lodash';

const AvatarSpeaker = ({ speakers, id, onClick }) => {
  const speaker = find(speakers, (obj) => obj.id === id);

  const name = get(speaker, 'name', '');

  if (!name) return <Skeleton.Avatar active size={32} shape="circle" />;

  return (
    <div onClick={onClick}>
      <Avatar style={{ backgroundColor: '#f56a00' }}>{name.charAt(0).toUpperCase()}</Avatar>
    </div>
  );
};

export default AvatarSpeaker;
