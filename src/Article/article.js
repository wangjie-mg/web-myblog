import React, { Component } from 'react';
import Nav from "../Component/Nav/Nav";
import cookie from 'react-cookies';
import getRequest from '../function/function';


export default class article extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:false,
      data:[],
    }
  }
  funca(req){
    console.log(req.data.code)
    if(req.data.code){
      this.setState({
        user :true,
        data:req.data,
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
                <Nav keycode="5" user={this.state.user} id={this.props.match.params.id} data={this.state.data}/>
            </div>
        )
    }
}
