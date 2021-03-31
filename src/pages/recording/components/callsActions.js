import React, { useEffect, useState } from 'react';
import {Col, Button, Row, Modal} from 'antd';
import {
  DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { history } from "umi";

const { confirm } = Modal;

const CallsActions = ({ isAdmin, id, removeRecording }) => {
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
    <Button onClick={onViewDetail}>
      View
    </Button>
  );

  const onClickStopPropagation = (e) => {
    e.stopPropagation();
  }
  const deleteAction = (
    <Button style={{ marginLeft: 4 }} type="danger" onClick={showDeleteConfirm}>
      <DeleteOutlined />
    </Button>

  )

  return (
    <Row gutter={15} justify="start" align="middle">
      <Col onClick={onClickStopPropagation}>
        {isAdmin ? (<div>
          {editAction}
          {deleteAction}
        </div>) :
          (<div>
            {editAction}
          </div>)
        }
      </Col>
    </Row>
  );
};

export default CallsActions;
