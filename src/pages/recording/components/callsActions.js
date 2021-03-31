import React, { useEffect, useState } from 'react';
import { Col, Button, Popconfirm, Row } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { history } from "umi";

const CallsActions = ({ isAdmin, id, removeRecording }) => {
  const onViewDetail = () => {
    history.push(`/recording/${id}`);
  };

  const confirmDelete = () => {
    removeRecording({ id });
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
    <Button style={{ marginLeft: 4 }}type="danger">
      <Popconfirm
        title="Are you sure to delete this recording?"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No">
        <DeleteOutlined />
      </Popconfirm>
    </Button>

  )

  return (
    <Row gutter={15} justify="start" align="middle">
      <Col>
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
