import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Checkbox, Row, Col } from 'antd';
import { connect } from 'umi';
import { UserAddOutlined } from '@ant-design/icons';
import { addTeamUser } from './models/team.services';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

function AddUserModal({ getTeamUser }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    addTeamUser(values).then((res) => {
      if (res.status && res.status >= 400) {
        return;
      }
      setIsModalVisible(false);
      getTeamUser();
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    }
  }, [isModalVisible]);

  return (
    <Row justify="end">
      <Col span={2}>
        <Button style={{ marginBottom: 15 }} type="primary" onClick={showModal}>
          <UserAddOutlined /> Add User
        </Button>
      </Col>

      <Modal title="Add User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout} name="is_admin" valuePropName="checked">
            <Checkbox>Admin</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getTeamUser: (params) =>
    dispatch({
      type: 'team/getTeamUser',
      params,
    }),
});

export default connect(null, mapDispatchToProps)(AddUserModal);
