import React from 'react';
import './signin.css';
import Img from '../image/myblog.png';
import getRequest from '../function/function';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox,Layout, message } from 'antd';
var {Footer} = Layout;
class NormalLoginForm extends React.Component {
  componentWillMount(){
    const token=cookie.load('token');
    if(token){
      const url={
        method:'post',
        url:'http://118.31.104.164:3001/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':token 
        },  
      }
      getRequest(url,this.funca.bind(this))
    }
  }
  funca(req){
    if(req.data.code){
      this.props.history.push('/index');
    }
  }
  func(req){
    if(!req.data.code){
      cookie.save("token",req.data.token,{path:'/'});
      this.props.history.push('/index');  
      message.success("登陆成功",4)
    }else{
      message.error(req.data.errorMsg,4)
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const url={
          method:'post',
          url:'http://118.31.104.164:3001/reglogin/login',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data:values,
        }
        getRequest(url,this.func.bind(this));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="main">
        <div>
            <img alt="myblog" src={Img} style={{display: 'block',
                height:'80px',
                margin:  'auto'}}/>
        </div>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              className="login-form-button"
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }
            ,{
              min:8,
              message:"密码最少8位！"
            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              className="login-form-button"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <button className="login-form-forgot" onClick={()=>{message.info('暂时没有此功能，若忘记密码请联系站长。QQ：1477497597')}}>
            Forgot password
          </button>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to='/signup'><button>还没有账号吗？快来注册吧!</button></Link>
        </Form.Item>
      </Form>
      <Footer style={{ background:'rgb(250,250,250)',textAlign: 'center', marginTop:'20px' }}>  WJ©2020Created 仅供学习交流 </Footer>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;