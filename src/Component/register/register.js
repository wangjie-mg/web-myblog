import React from 'react'; 
import {Form,Input,Select,Button,message} from 'antd';
import getRequest from '../../function/function';
import { withRouter } from 'react-router-dom';
class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  func(req){
    console.log(req);
    if(req.data.code){
      message.config({
        top: 100,
      });
      message.error(req.data.errorMsg,3,);
    }else{
      message.success('注册成功');
      this.props.history.push('/');
    }
  }
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err ) {
          const url={
            method:'post',
            url:'http://118.31.104.164:3001/reglogin/signup',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:values,
          }
          getRequest(url,this.func.bind(this));
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { Option } = Select;
      const { TextArea } = Input;

      return (
        <Form  onSubmit={this.handleSubmit}
            style={{maxWidth:'60vw',margin:'0 auto'}}
        >
           <Form.Item label="Name">
            {getFieldDecorator('name', {
            rules: [{ required: true }],
            })(<Input placeholder="Please input your name"/>)}
            </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },{
                  min:8,
                  message:"密码最少8位！"
                }
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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
                 <TextArea rows={5} placeholder="Please input your description" />
              )}
            </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  export default withRouter(WrappedRegistrationForm)