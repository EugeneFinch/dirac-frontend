import React, { useEffect, useState } from 'react';
import {Col, Dropdown, Menu, Row, Modal } from 'antd';
import {history} from "umi";
import {MoreOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const { confirm } = Modal;
const ThreeDotComponent = ({ isAdmin, id, removeRecording }) => {
  const onViewDetail = () => {
    history.push(`/recording/${id}`);
  };

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure you want to delete the recording? This action cannot be undone.',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        removeRecording({ id });
      },
      onCancel() {},
    });
  }

  const editAction = (
    <Menu.Item onClick={onViewDetail}>
      View
    </Menu.Item>
  );
  const deleteAction = (
    <Menu.Item onClick={showDeleteConfirm}>
      Delete
    </Menu.Item>
  );

  const onClickStopPropagation = (e) => {
    e.stopPropagation();
  }

  return (
    <Row justify="left" align="middle">
      <Col onClick={onClickStopPropagation}>
        <Dropdown placement="bottomCenter" overlay=
                           {isAdmin ? (<Menu>
                               {editAction}
                               {deleteAction}
                             </Menu>) :
                             (<Menu>
                               {editAction}
                             </Menu>)
                           }>
          <MoreOutlined style={{
            cursor: 'pointer',
            marginBottom: 15,
            marginLeft: 10
          }}></MoreOutlined>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ThreeDotComponent;
