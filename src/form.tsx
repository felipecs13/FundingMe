import React from 'react';
import './index.css';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

+ bank_account: varchar
+ image_url: varchar
+ description: varchar
+ goal: int
+ state_goal: int
+ creation_date: timestamp
+ final_date: timestamp
+ state_post: varchar (se logro meta o que)
+ type: varchar 
    <Form.Item
      label="Name"
      name="name of the project"
      rules={[{ required: true, message: 'Please input the name of the project!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="bank_account"
      name="Cuenta Bancaria"
      rules={[{ required: true, message: 'Please input your bank account!' }]}
    >
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;