import React from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import logoImage from '../../image/logo/logo512.png';

import { login } from '../../api/user';

export default function LoginModal(props) {
  const { visible, onClose } = props;

  const onFinish = async (values) => {
    const res = await login(values);
    if (res.code == 1) {
      message.success(res.data);
      onClose();
      window.location.reload();
    } else {
      message.error(res.msg);
    }
  };

  return (
    <>
      <Modal
        title='请登录'
        open={visible}
        closable={false}
        keyboard={false}
        maskStyle={{ color: 'black' }}
        footer={<></>}
        style={{ top: '50%', marginTop: '-40%' }}
      >
        <>
          <img
            src={logoImage}
            style={{
              width: '160px',
              position: 'absolute',
              left: '50%',
              marginLeft: '-80px',
              bottom: '-5%',
            }}
          ></img>
          <Form
            name='basic'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete='off'
          >
            <Form.Item
              label='密钥'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type='primary'
                htmlType='submit'
                style={{ marginLeft: '50%', backgroundColor: '#FFEFD5' }}
              >
                OK
              </Button>
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
}
