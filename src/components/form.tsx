
import { Button, Form, Input, InputNumber, Select } from 'antd';
import Layout from './Layout';


const FormProject = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values: string[]) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: string) => {
    console.log('Failed:', errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
    <Layout/>
      <div className="Form">
      <Form
      form={form}
      name="create_project"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

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
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="image_url"
        name="URL de la imagen"
        rules={[{ required: true, message: 'Please input your bank account!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="description"
        name="Descripción"
        rules={[{ required: true, message: 'Please input your bank account!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="goal"
        name="Meta"
        rules={[{ required: true, message: 'Please input your bank account!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="type"
        name="Tipo"
        rules={[{ required: true, message: 'Please input your project type!' }]}
      >
        <Select
            placeholder="Selecciona tipo de proyecto"
            allowClear
          >
            <Select.Option value="ONG">Ong</Select.Option>
            <Select.Option value="city">Participación ciudadana</Select.Option>
            <Select.Option value="other">Otro</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
      </Form.Item>
    </Form>
    </div>
  </div>
  );
};

  

export default FormProject;