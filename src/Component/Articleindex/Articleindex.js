import React, { Component } from 'react'
import getRequest from '../../function/function';
import CodeBlock from "../CodeBlock/CodeBlock";
import './Articleindex.css';
import { PageHeader, Tag, Avatar,Comment,  Form, Button, List, Input ,message } from 'antd';
const ReactMarkdown = require('react-markdown');
const UserList = ['U', 'Lucy', 'Tom', 'Edward',"Jack","Lee","NB","Amy","Love","Boy","Moon","Carl","John","Fred","Cindy"];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae','#E8FFE8','rgb(38,188,213)','rgb(214,200,75)','rgb(129,214,110)','rgb(153,77,82)','rgb(18,53,85)',"rgb(119,52,96)",'rgb(229,187,129)',"rgb(0,90,171)","rgb(147,224,255)","rgb(175,215,237)"];

const { TextArea } = Input;


export default class Articleindex extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:"",
            name:'',
            auther:'',
            ava:'',
            avc:'',
            writetype:'',
            comments: [],
            submitting: false,
            value: '',
        }
    }
    componentWillMount(){
        const url={
            method:'post',
            url:'http://118.31.104.164:3001/write/writefind',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },  
            data:{
              msg:"one",
              _id:this.props.id,
            }
          }
          getRequest(url,this.func.bind(this))
    }
    func(req){
        this.setState({
            data:req.data.write,
            name:req.data.name,
            auther:req.data.auther,
            ava:req.data.ava,
            avc:req.data.avc,
            writetype:req.data.writetype,
            comments: req.data.numc,
        })
    }

    funca(req){
      if(!req.data.code){
        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              lname: this.props.data.name,
              lava: this.props.data.ava,
              lavc:this.props.data.avc,
              lvalue: this.state.value,
            },
            ...this.state.comments,
          ],
        });
      }
    }
  
    handleSubmit = () => {
      if(this.props.user === false){
        message.info("只有登录才可以留言哦，快去登陆吧！",3);
        return;
      }
      if (!this.state.value ) {
        return;
      }
      this.setState({
        submitting: true,
      });
      const url={
        method:'post',
        url:'http://118.31.104.164:3001/write/addl',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:{
          _id:this.props.id,
          name:this.props.data.name,
          ava:this.props.data.ava,
          avc:this.props.data.avc,
          value:this.state.value,
        }  
      }
      getRequest(url,this.funca.bind(this));
    };
  
    handleChange (e){
      this.setState({
        value: e.target.value,
      });
    };
    render() {
      console.log(this.state.comments);
      const CommentList = ({ comments }) => (
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={item => 
            <Comment 
            author={<span>{item.lname}</span>}
            avatar={
              <Avatar style={{ backgroundColor: colorList[item.lavc], verticalAlign: 'middle' }} size="large">
                {UserList[item.lava]}
              </Avatar>
            }
            content={
              <p>{item.lvalue}</p>
            }
          />}
        />
      );
      return (
          <div>
            <div className="main-write">
            <PageHeader
            onBack={() => window.history.back()}
                style={{margin:'1vh 0 4vh 0'}}
            title={
                <div><Avatar style={{ backgroundColor: colorList[this.state.avc], verticalAlign: 'middle' }} size="large">
            {UserList[this.state.ava]}
          </Avatar>
          <span>&nbsp;&nbsp;{this.state.name}&nbsp;&nbsp;</span>
          </div>}
            tags={<Tag color="blue">{this.state.writetype}</Tag>}
            subTitle={this.state.auther}
          >
          </PageHeader>
            <ReactMarkdown source={this.state.data} escapeHtml={false}
            renderers={{
              code: CodeBlock,
            }}/>
            </div>
            
            <div className="main-write">
              {this.state.comments.length > 0 && <CommentList comments={this.state.comments} />}
            
              <Comment
              avatar={
                <Avatar style={{ backgroundColor: colorList[this.props.data.avc], verticalAlign: 'middle' }} size="large">
                    {UserList[this.props.data.ava]}
                </Avatar>
              }
              content={
                <div>
                  <Form.Item>
                    <TextArea rows={4} onChange={this.handleChange.bind(this)} value={this.state.value} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" loading={this.state.submitting} onClick={this.handleSubmit.bind(this)} type="primary">
                      留言
                    </Button>
                  </Form.Item>
                </div>
              }
            />
          </div>
          </div>
        )
    }
}
