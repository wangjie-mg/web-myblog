import React, { Component } from 'react'
import { List } from 'antd';
import Model from '../Model/Model'
import getRequest from '../../function/function'
import './Findlist.css'
export default class Findlist extends Component {
    constructor(props){
      super(props);
      this.handleClickremove = this.handleClickremove.bind(this);
      this.data=[];
    }
    func(res){
      console.log(res.data);
    // return flag =1;
    }
        
    handleClickremove(name){
      console.log(1)
      const url={
        method:'post',
        url:'http://118.31.104.164:3001/user/remove',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:{
          name:name,
        }
      }
      getRequest(url,this.func);
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].name === name ){
            console.log(name,i)
            this.data.splice(i, 1);
            // flag=0;
            this.setState({
              data:this.data
            })
          } 
        }
    }
    render() {
      this.data = this.props.data;
        return (
            <List
                className="demo-loadmore-list"
                pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                itemLayout="horizontal"
                dataSource={this.data}
                renderItem={item => (
                    <List.Item
                      actions={[
                        
                        <Model title="编辑" findname={item.name}/>,
                        <button onClick={this.handleClickremove.bind(this,item.name)
                        }>删除</button>
                        ]}
                    >
                    <List.Item.Meta
                      title={<p >{item.name}</p>}
                      description={item.dio}
                    />
                    </List.Item>
                  )}
            />
        )
    }
}
