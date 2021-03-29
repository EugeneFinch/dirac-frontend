import React, { useEffect, useState } from 'react';
import {Col, Dropdown, Menu, Popconfirm, Row} from 'antd';
import {history} from "umi";

const ThreeDotComponent = ({ isAdmin, id, removeRecording }) => {
  const onViewDetail = () => {
    history.push(`/recording/${id}`);
  };

  const confirmDelete = () => {
    removeRecording({ id });
  }

  const editAction = (
    <Menu.Item onClick={onViewDetail}>
      Edit
    </Menu.Item>
  );

  const onClickStopPropagation = (e) => {
    e.stopPropagation();
  }
  const deleteAction = (
    <Menu.Item>
      <Popconfirm
        title="Are you sure to delete this recording?"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
        onClick={onClickStopPropagation}
      >
        <a onClick={onClickStopPropagation}>Delete</a>
      </Popconfirm>
    </Menu.Item>
  )

  return (
    <Row gutter={15} justify="start" align="middle">
      <Col onClick={onClickStopPropagation}>
        <Dropdown.Button overlay=
                           {isAdmin ? (<Menu>
                               {editAction}
                               {deleteAction}
                             </Menu>) :
                             (<Menu>
                               {editAction}
                             </Menu>)
                           }>
        </Dropdown.Button>
      </Col>
    </Row>
  );
};

export default ThreeDotComponent;
