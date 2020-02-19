import React, { Component } from 'react';
import Nav from "../Component/Nav/Nav";
import cookie from 'react-cookies';
import getRequest from '../function/function';
import { message } from 'antd';
export default class user extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:false,
      data:[],
    }
  }
  funca(req){
    if(req.data.code){
      this.setState({
        user :true,
        data:req.data,
      })
      message.success("登陆成功");
    }else{
      message.info("你还没有登录，请先登录再编辑博客！")
    }
  }
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
    render() {
        return (
            <div>
                <Nav keycode="3" user={this.state.user} data={this.state.data}/>
            </div>
        )
    }
}
