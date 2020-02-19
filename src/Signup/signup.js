import React from 'react';
import cookie from 'react-cookies';
import getRequest from '../function/function';
import Nav from '../Component/Nav/Nav';
 class signup extends React.Component {
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
                <Nav keycode="6"/>
            </div>
        )
    }
}
export default signup;
