import React from 'react';
import { Skeleton, Avatar } from 'antd';
import { get, find } from 'lodash';

const AvatarSpeaker = ({ speakers, id }) => {
  const speaker = find(speakers, (obj) => obj.id === id);

  const name = get(speaker, 'name', '');

  if (!name) return <Skeleton.Avatar active size={32} shape="circle" />;

  return <Avatar style={{ backgroundColor: '#f56a00' }}>{name.charAt(0).toUpperCase()}</Avatar>;
};

export default AvatarSpeaker;
