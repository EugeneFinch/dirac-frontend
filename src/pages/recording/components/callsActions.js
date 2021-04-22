import React, { useEffect, useState } from 'react';
import {Col, Button, Row, Modal} from 'antd';
import {
  DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { history } from "umi";

const { confirm } = Modal;

const CallsActions = ({ isAdmin, id, removeRecording, page, limit, filter }) => {
  const onViewDetail = () => {
    history.push(`/recording/${id}?page=${page}&limit=${limit}&filter=${filter}`);
  };

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure you want to delete the recording? This action cannot be undone.',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        removeRecording({ id, page, limit, filter });
      },
      onCancel() {},
    });
  }

  const vievAction = (
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
          {vievAction}
          {deleteAction}
        </div>) :
          (<div>
            {vievAction}
          </div>)
        }
      </Col>
    </Row>
  );
};

export default CallsActions;
