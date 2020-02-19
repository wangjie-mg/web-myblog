import React, { Component } from 'react'
import Img from '../../image/dengdai.svg';
import { Descriptions,Avatar } from 'antd';
import './userc.css';
const UserList = ['U', 'Lucy', 'Tom', 'Edward',"Jack","Lee","NB","Amy","Love","Boy","Moon","Carl","John","Fred","Cindy"];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae','#E8FFE8','rgb(38,188,213)','rgb(214,200,75)','rgb(129,214,110)','rgb(153,77,82)','rgb(18,53,85)',"rgb(119,52,96)",'rgb(229,187,129)',"rgb(0,90,171)","rgb(147,224,255)","rgb(175,215,237)"];

export default class user extends Component {
    render() {
        const context1 = (
            <div className="main-a">
                <div className="main-b">
                    <img src={Img} alt="logo"></img>
                    <p>还没有登录呢，快去登录吧</p>
                </div>
            </div>
        );
        const context2 = (
            <div className="main-a" >
            <div className="main-a-f" >
            <Avatar style={{ backgroundColor: colorList[this.props.data.avc], verticalAlign: 'middle' }} size="large">
                  {UserList[this.props.data.ava]}
                </Avatar>
        <Descriptions title="个人主页" bordered={true}>
            <Descriptions.Item label="Name" span={3}>{this.props.data.name}</Descriptions.Item>
            <Descriptions.Item label="gender" span={3}>{this.props.data.gender}</Descriptions.Item>
            <Descriptions.Item label="decrition" span={3}>{this.props.data.dio}</Descriptions.Item>
        </Descriptions>
        </div>
            </div>
        );
        const context = this.props.user?context2 : context1;
        return (
            <div>
                {context}
            </div>
        )
    }
}
