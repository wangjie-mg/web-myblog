import React, { Component } from 'react';
import cookie from 'react-cookies';
import getRequest from '../function/function';
import Nav from '../Component/Nav/Nav';
export default class myblogindex extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:false,
      data:""
    }
  }
  funca(req){
    // console.log(req.data);
    if(req.data.code){
      this.setState({
        user:true,
        data: req.data
      })
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
                <Nav keycode="1" user={this.state.user} data={this.state.data}/>
            </div>
        )
    }
}
