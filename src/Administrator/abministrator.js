import React from 'react';
import Nav from '../Component/Nav/Nav'
import cookie from 'react-cookies';
import getRequest from '../function/function';

 class Abministrator extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:false
        }
    }
    funca(req){
        if(req.data.name ==="王杰"){
          this.setState({
            user:true,
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
        return(
            <div>
                <Nav keycode="4" user={this.state.user}/>
            </div>
        );
    }
}
export default Abministrator;