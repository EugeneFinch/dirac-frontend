import React from 'react';
import { Popover } from 'antd';

const UsersPopover = ({ data }) => {
  let users;
  if (data.record && data.record.users) {
    users = data.record.users;
  } else return (<span>{data['user.email']}</span>);

  const prepareData = (data) => {
    return (<div>{data.name} </div>)
  }
  return (
    <Popover content={users.length > 0 ? users.map(res => prepareData(res)) : <span> </span>} title="Participating users" trigger="hover">
      {users.length ? users[0].name : ''} {users.length > 1 ? ` + ${users.length - 1}`: ''}
    </Popover>
  );
};

export default UsersPopover;
