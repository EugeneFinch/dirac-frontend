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
            component: './Welcome',
          },
          {
            path: '/upload-management',
            name: 'upload.management',
            icon: 'table',
            component: './upload-management',
          },
          {
            path: '/upload-management/:id',
            // name: 'upload.management',
            icon: 'table',
            component: './upload-management/Detail',
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
