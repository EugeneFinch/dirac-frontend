import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import {hotjar} from 'react-hotjar'
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { getToken, setToken } from '@/utils/utils';
import { get } from 'lodash';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch, location } = this.props;

    const access_token = get(location, 'query.access_token', '');
    if (access_token) {
      setToken(access_token);
      // history.replace('/');
    }
    if (dispatch) {
      if (getToken()) {
        dispatch({
          type: 'user/fetchCurrent',
          access_token,
        });
      }
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser, location } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.id;
    const queryString = stringify({
      redirect: location.pathname,
    });

    hotjar.initialize(2300244, 6)
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
