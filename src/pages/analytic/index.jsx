import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

import { Tabs } from 'antd';
import TalkToListen from './components/TalkToListen'
import Engagement from './components/Engagement'

const { TabPane } = Tabs;

const Analytic = ({ talkingRateList, user, getTalkToListenList }) => {
  const renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props} className="site-custom-tab-bar"  />
  );

  return (
    <PageContainer
      extra={[
      ]}>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Talk to Listen" key="1" >
            <TalkToListen {...talkingRateList} userId={user.id} getTalkToListenList={getTalkToListenList}/>
          </TabPane>
          <TabPane tab="Engagement" key="2">
            <Engagement />
          </TabPane>
          <TabPane tab="Longest monoogue" key="3">
            <Engagement />
          </TabPane>
        </Tabs>

    </PageContainer>
  );
};

const mapSateToProps = ({ loading, user }) => {

  return {
    loading,
    user: user.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTalkToListenList: (params) =>
    dispatch({
      type: 'analytic/getTalkToListenList',
      params,
    }),
});

export default connect(mapSateToProps, mapDispatchToProps)(Analytic);
