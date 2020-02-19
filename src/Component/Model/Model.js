import React from 'react';
import { Modal, Button, Input,Select ,Form, } from 'antd';
import getRequest from '../../function/function'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;
      const { TextArea } = Input;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(<Input placeholder="Please input your name"/>)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(<Input placeholder="Please input your password"/>)}
            </Form.Item>
            <Form.Item label="Gender">
              {getFieldDecorator('gender',{
                rules: [{ required: true }],
                initialValue : 'm',
              })(<Select 
                style={{ width: "120px" }} 
                >
                <Option value="m">男</Option>
                <Option value="f">女</Option>
                <Option value="x">保密</Option>
            </Select>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('dio',{
                rules: [{ required: true}],
              })(
                 <TextArea rows={4} placeholder="Please input your description" />
              )}
            </Form.Item>    
          </Form>
        </Modal>
      );
    }
  },
);
class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  func(req){
    console.log(req.data.message);
  }
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let valuetion;
      let burl;
      if(this.props.title ==="添加"){
        burl='http://118.31.104.164:3001/user/add';
        valuetion=values;
      }else if(this.props.title ==="编辑"){
        burl='http://118.31.104.164:3001/user/update';
        valuetion={
          findname:this.props.findname,
          name:values.name,
          password:values.psaaword,
          gender:values.gender,
          dio:values.dio
        };
      }
      const url={
        method:'post',
        url:burl,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:valuetion,
      }
      getRequest(url,this.func)
      console.log(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
        {this.props.title}
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage