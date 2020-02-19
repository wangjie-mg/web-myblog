import  React from 'react';
import Model from '../Model/Model'
import { Input,Button } from 'antd';
import getRequest from '../../function/function'
import './Find.css';


class Find extends React.Component{
    constructor(props) {
        super(props);
        this.name="";
    }
    handlechange(e){
        this.name = e.target.value;
    }
    handleClick(){
        var contion=null;
        if(this.name === ""){
            contion="all";
        }else{
            contion="find";
        }
        const url={
            method:'post',
            url:'http://118.31.104.164:3001/user/find',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{
                msg:contion,
                name:this.name
            }
        };
        getRequest(url,this.props.msg)
    }
    render(){
        return(
        <div>
            <div className="example-input" style={{display:this.props.user?'block':'none'}}>
                <label>
                Name:
                    <Input 
                        size="large" 
                        placeholder="name"
                        onChange={this.handlechange.bind(this)}
                    />
                </label>
                <div className="a">
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
                </div><div className="b">
                <Model title="添加"></Model>    
                </div>
            </div>
            <div style={{display:this.props.user?'none':'block'}}>
             <p style={{margin:'auto',textAlign:'center'}}>不好意思，你不是管理员呢。</p>
            </div>
        </div>
        );
    }
}

export default Find;