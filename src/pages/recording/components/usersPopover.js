import React, { useState } from 'react';
import { Popover } from 'antd';
import { now } from 'lodash';

const UsersPopover = ({ data }) => {
  let users;
  if (data.record && data.record.users) {
    users = JSON.parse(data.record.users);
  } else return (<span>{data['user.email']}</span>);

  const prepareData = (data) => {
    return (<div>{!data.organizer ? data.email : <b>{data.email}</b>} </div>)
  }

  return (
      <Popover content={users.map(res => prepareData(res))} title="Participating users" trigger="hover">
        {data.record.org} + {users.length - 1}
      </Popover>
  );
};

export default UsersPopover;
