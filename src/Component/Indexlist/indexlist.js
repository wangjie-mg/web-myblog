import React, { Component } from 'react';
import getRequest from '../../function/function';
import { Timeline,List, Avatar, Icon,Card,Row, Col,Tag } from 'antd';
import { withRouter } from 'react-router-dom';

const { Meta } = Card;
const UserList = ['U', 'Lucy', 'Tom', 'Edward',"Jack","Lee","NB","Amy","Love","Boy","Moon","Carl","John","Fred","Cindy"];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae','#E8FFE8','rgb(38,188,213)','rgb(214,200,75)','rgb(129,214,110)','rgb(153,77,82)','rgb(18,53,85)',"rgb(119,52,96)",'rgb(229,187,129)',"rgb(0,90,171)","rgb(147,224,255)","rgb(175,215,237)"];

const children = ["前端","后端","大数据","产品","安全","Java","Javascript","python","Go","c","c#","c++"];

class indexlist extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state={
            data:[],
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
              msg:"all",
              _id:"",
            }
          }
          getRequest(url,this.func.bind(this))
     }
     func(req){
        this.setState({
            data:req.data
        })
     }
     icon(a){
       console.log("123")
        if(a===1){
          this.props.history.push('/user');
        }else if(a===2){
          this.props.history.push('/writer');
        }
     }
     list(a){
      this.props.history.push('/article/'+a);
     }
     
    render() {
        const user = UserList[this.props.data.ava];
        const color =  colorList[this.props.data.avc];
        return (
            <div>
            <Row>
          <Col span={15}>
            <Timeline style={{marginLeft:'2vw'}}>
            <List
            itemLayout="vertical"
            size="large"
            
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={this.state.data}
            footer={
              <div style={{margin:20}}>
                <b>欢迎大家在社区发表文章！</b>记录分享自己的学习经验！
              </div>
            }
            renderItem={item => (
                <Timeline.Item>
              <List.Item
              onClick={this.list.bind(this,item._id)}
                style={{marginLeft:40 ,cursor:'pointer',}}
              key={item.title}
              >
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: colorList[item.avc], verticalAlign: 'middle' }} size="large">
                  {UserList[item.ava]}
                </Avatar> }
                  title={
                    <div>
                    <span>{item.name}</span>&nbsp;&nbsp;
                    <Tag color={item.writetype === "原创"?"green":"orange"}>{item.writetype}</Tag>
                    </div>}
                  description={
                    <div>
                    <span>作者：{item.auther}&nbsp;&nbsp;</span>
                    {item.writetitle.map(
                      (num)=> <Tag key={num}   color="blue">{children[num]}</Tag>)
                    }
                    </div>
                  }
                  />
                    {item.about}
              </List.Item>
              </Timeline.Item>
            )}
          />
            </Timeline>
    </Col>

    <Col span={9} push={1}>
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <Icon type="user" key="setting" onClick={this.icon.bind(this,1)}/>,
      <Icon type="edit" key="edit" onClick={this.icon.bind(this,2)} />,  
    ]}
  >
    <Meta
      avatar={<Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
      {user}
    </Avatar>}
      title={this.props.user ? this.props.data.name:"还没有登录,快来登录吧。"}
      description={this.props.data.dio}
    />
  </Card>
  <Card title="最热文章" style={{ width: 300,height:'30vh',marginTop:'6vh' }}>
      <p>暂无推荐文章</p>
  </Card>
  </Col>
  
  </Row>
  </div>
  )
    }
}
export default withRouter(indexlist);