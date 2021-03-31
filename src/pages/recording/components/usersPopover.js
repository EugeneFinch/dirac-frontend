import React, { useState } from 'react';
import { Popover } from 'antd';

const UsersPopover = ({ data }) => {
  let users;
  if (data.record && data.record.users) {
    users = JSON.parse(data.record.users);
  } else return (<p>{data['user.email']}</p>);

  const prepareData = (data) => {
    return (<div>{!data.organizer ? data.email : <b>{data.email}</b>} </div>)
  }

  return (
    <div>
      <Popover content={users.map(res => prepareData(res))} title="Participating users" trigger="hover">
        {data.record.org} + {users.length - 1}
      </Popover>
    </div>
  );
};

export default UsersPopover;
