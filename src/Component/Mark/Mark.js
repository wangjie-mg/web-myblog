import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import getRequest from '../../function/function' ;
import { Form, Input, Select, Button, message } from 'antd';
import "./Mark.css";
import 'react-markdown-editor-lite/lib/index.css';
const MOCK_DATA = "## 由于站长是初步学习，目前这个markdom，还存在一些限制。\n* 编辑中请勿离开本页面，或重新加载此页面，防止之前的编辑丢失。\n* 不支持图片，虽然导航栏有这个功能，但是无法正常显示。\n* 不支持在本站插入可跳转的代码，插入的可跳转网址只会重新加载一次所在页面。\n### 那么欢迎在 **myblog** 编辑你的博客"
const { Option } = Select;

class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const Str = this.props.texta.replace(/%/g,"")
        const Strb=  Str.replace(/=/g,"%3D");
        const Stra = Strb.replace(/&/g,"%26")
        const token=cookie.load('token');
        const url={
          method:'post',
          url:'http://118.31.104.164:3001/write/writeadd',
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':token },
          data:{
            name:values.writename,
            writetitle:values.writetitle,
            writetype:values.writetype,
            write:Stra,
            ava:this.props.data.ava,
            avc:this.props.data.avc,
          },
        }
       getRequest(url,this.func.bind(this)) 
      }
    });
  };
  func(req){
    if(!req.data.code){
      message.success('文章发表成功', 10);
      this.props.history.push('/article/'+req.data.id);
    }
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const a=[];
    const children = ["前端","后端","大数据","产品","安全","Java","Javascript","python","Go","c","c#","c++"];
    for (let i = 0; i < children.length; i++) {
      a.push(<Option key={i}>{children[i]}</Option>);
    }
    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item >
        {getFieldDecorator('writetitle', {
          rules: [{ required: true, message: '请选择博客标签'}],
        
        })(<Select
          mode="multiple"
          placeholder="请选择博客的标签"
          style={{minWidth:'20vw'}}
        >
          {a}
        </Select>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('writename', {
            rules: [{ required: true, message: '请输入博客名' }],  
        })(<Input  style={{minWidth:'30vw'}} placeholder="请输入博客名"/>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('writetype', {
            rules: [{ required: true }],
            initialValue : '原创',
          })(
            <Select
              style={{width:'100px'}}
              onChange={this.handleSelectChange}
            >
              <Option value="原创">原创</Option>
              <Option value="转载">转载</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            发表文章
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

 class Write extends React.Component {
  mdParser = null
  constructor(props) {
    super(props)
    this.state = {
      textion:""
    }
    this.mdParser = new MarkdownIt()
  }
  handleEditorChange ({html, text}) {    
    console.log( text)
    this.setState({
      textion: text 
    })
  }
  render() {
    return (      
      <div>
      <div>
        <div className="mark-a">
          <WrappedApp {...this.props} texta={this.state.textion} data={this.props.data}/>
        </div>
      </div>
      <div style={{height: '500px'}}>
        <MdEditor
          value={MOCK_DATA}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange.bind(this)} 
        />                
      </div>
      </div>
    )
  }
}
export default withRouter(Write);