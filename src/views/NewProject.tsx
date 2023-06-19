import { Button, Form, Input, InputNumber, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import NavBar from '../components/Layout'
import { useState, useEffect } from 'react'

interface User{
  token: string
  id: number
  email: string
  rut : string
  name : string
}

const FormProject = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>({ token: '', id: 0, email: '', rut: '', name: '' });
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const onFinish = async (values: {
    "name_project": string,
    "bank_account": string,
    "description": string,
    "minimum_donation": number,
    "type_project" : string,
    "goal_amount": number,
    "image": any | null
  }) => {
    console.log('Success:', values)
    setLoading(true)
    try {
      
      const photo = values.image?.fileList[0];
      const formData = new FormData();
      formData.append('project[image]', photo);
      formData.append('project[name_project]', values.name_project);
      formData.append('project[bank_account]', values.bank_account);
      formData.append('project[description]', values.description);
      formData.append('project[minimum_donation]', values.minimum_donation.toString());
      formData.append('project[type_project]', values.type_project);
      formData.append('project[goal_amount]', values.goal_amount.toString());

      const data = await fetch('https://softdeleteiic3143.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" : user.token
        },
        body: formData,
      })
      console.log(data)
      if (data.status != 201) {
        throw new Error('Error')
      }
      // Redirect to login page
      // window.location.href = '/'
    } catch (error) {
      setLoading(false)
      console.log(loading)
      console.log('Error:', error)
    }
  }

  

  // const onFinishFailed = (errorInfo: string) => {
  //   console.log('Failed:', errorInfo);
  // };
  const onReset = () => {
    form.resetFields()
  }
  return (
    <div>
      <NavBar />
      <div className="Form">
        <Form
          form={form}
          name="create_project"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name_project"
            rules={[{ required: true, message: 'Please input the name of the project!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Cuenta Bancaria"
            name="bank_account"
            rules={[{ required: true, message: 'Please input your bank account!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: 'Please input description of your project!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meta"
            name="goal_amount"
            rules={[{ required: true, message: 'Please input your bank account!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Tipo de proyecto"
            name="type_project"
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

          <Form.Item
            label="Monto mínimo"
            name="minimum_donation"
            rules={[{ required: true, message: 'Please input your minimun donation!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Imágen"
            name="image"
          >
            <Upload beforeUpload={Upload.LIST_IGNORE}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default FormProject
