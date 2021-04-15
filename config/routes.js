export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'login',
        path: '/user/login/success',
        component: './user/login-success',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/recording',
            name: 'Calls',
            icon: 'file-text',
            component: './recording',
          },
          {
            path: '/recording/:id',
            icon: 'table',
            component: './recording/Detail',
          },
          {
            path: '/analytic',
            name: 'Analytics',
            icon: 'bulb',
            component: './analytic',
          },
          {
            path: '/team',
            name: 'Team',
            icon: 'user',
            component: './team',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
