import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {hotjar} from 'react-hotjar'
// import { Link, SelectLang, useIntl, connect } from 'umi';
import { Link, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/DIRAC_AI_logo.png';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  hotjar.initialize(2300244, 6)
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          <div className={styles.cart}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                {/* <span className={styles.title}></span> */}
              </Link>
            </div>
            <div className={styles.second_header}>Welcome</div>
            <div className={styles.desc}>
            Log in to Dirac AI to continue with Dirac AI
            </div>
            {/* <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="Ant Design 是西湖区最具影响力的 Web 设计规范"
              />
            </div> */}
          </div>
          {children}
          </div>
          <div className={styles.links}>
            <a href={"https://diracnlp.com/privacy"} className={styles.link}>Terms of service</a>
            <a href={"https://diracnlp.com/terms"} className={styles.link}>Privacy policy</a>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
