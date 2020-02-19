import React from 'react';
import { Layout, Menu, Icon, Button,Row, Col } from 'antd';
import Userc from '../Userc/userc';
import Findlist from '../Findlist/Findlist';
import Find from '../Find/Find';
import Register from '../register/register';
import Write from '../Mark/Mark';
import Article from '../Articleindex/Articleindex';
import { withRouter } from 'react-router-dom';
import Img from "../../image/myblog.png";
import './Nav.css';
import Indexlist from '../Indexlist/indexlist';
import cookie from 'react-cookies';

const { Header, Sider, Content,Footer } = Layout;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            listdata:[],
        };
        this.contextion=null;
        this.text=null;      
    }
    message(msg){
      let datation=[];
      for (var i = 0; i < msg.data.length; i++) {
        const a= {
          name:msg.data[i].name,
          dio:msg.data[i].bio,
        }
        datation.push(a);
      }
      this.setState({
        listdata:datation,
      });
    }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  nav(a){
    if(a===1){
      this.props.history.push('/index');
    }else if(a===2){
      this.props.history.push('/user');
    }else if(a===3){
      this.props.history.push('/writer');
    }else if(a===4){
      this.props.history.push('/Abministrator');
    }
  }

  out(){
    if(this.props.user){
      cookie.remove('token',{path:'/'});
      window.location.reload();
    }else{
      this.props.history.push('/');
    }
  }
  render() {
    if(this.props.keycode ==="1"){
      this.contextion = (
        <div>
          <Indexlist user={this.props.user} data={this.props.data}/>
        </div>
    );
    }else if(this.props.keycode === "2"){
      this.contextion = (
        <div>
         <Userc  user={this.props.user} data={this.props.data}/>
        </div>
    );
    }else if(this.props.keycode === "3"){
      this.contextion = (
      <div>
        <Write user={this.props.user} data={this.props.data}/>
      </div>
      );
    }else if(this.props.keycode === "4"){
      this.contextion = (
          <div>
              <Find msg={this.message.bind(this)} user={this.props.user}/>
              <Findlist data={this.state.listdata}/>
          </div>
      );
  }else if(this.props.keycode === "5"){
    this.contextion = (
      <div>
          <Article id={this.props.id} data={this.props.data}/>
      </div>
    );
  }else if(this.props.keycode === "6"){
    this.contextion = (
      <div>
          <Register />
      </div>
  );
  }
  return (
      <Layout>
        <Sider  trigger={null} style={{overflow: 'auto',
        height: '100vh',position:'fixed'}} collapsible  collapsed={this.state.collapsed}>
          <div className="logo"  />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.keycode}>
            <Menu.Item key="1"  style={{marginTop:30}} onClick={this.nav.bind(this,1)}>
            <Icon type="home" />
              <span style={{marginLeft:10,fontSize:'1.19em'}}>社区</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.nav.bind(this,2)}>
            <Icon type="user" />
              <span style={{marginLeft:10,fontSize:'1.18em'}}>个人主页</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.nav.bind(this,3)}>
              <Icon type="edit" />
              <span style={{marginLeft:10,fontSize:'1.18em'}}>编辑博客</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.nav.bind(this,4)}>
              <Icon type="form" />
              <span style={{marginLeft:10,fontSize:'1.18em'}}>管理员</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ transition:'0.2s', marginLeft:this.state.collapsed?'83px':'200px'}}>
          <Header style={{ background: '#fff', height:'104px'}}>
          <Row type="flex" align="middle">  
            <Col span={9}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            </Col >
            <Col span={11}><img alt="myblog" src={Img} style={{height:'80%'}}/></Col>
            <Col span={4} ><Button size="large" onClick={this.out.bind(this)} style={{width:'100px'}}>{this.props.user?"退出登录":"登录"}</Button></Col>            
            </Row>
          </Header>
          <Content
            style={{
              margin: '34px 26px',
              padding: 24,
              background: '#fff',
              minHeight: '75vh',
            }}
          >
            {this.contextion} 
          </Content>
          <Footer style={{height:'5px',lineHeight:'1px', background:'rgb(240,240,240)',textAlign: 'center', }}>  WJ ©2020 Created 仅供学习交流 </Footer>

        </Layout>
      </Layout>
    );
  }
}

export default withRouter(SiderDemo);