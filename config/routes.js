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
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
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
  // {
  //   path: '/',
  //   component: '../layouts/SecurityLayout',
  //   routes: [
  //     {
  //       path: '/',
  //       component: '../layouts/BasicLayout',
  //       authority: ['admin', 'user'],
  //       routes: [
  //         {
  //           path: '/',
  //           redirect: '/welcome',
  //         },
  //         {
  //           path: '/welcome',
  //           name: 'welcome',
  //           icon: 'smile',
  //           component: './Welcome',
  //         },
  //         {
  //           path: '/upload-management',
  //           name: 'upload.management',
  //           icon: 'table',
  //           component: './upload-management',
  //         },
  //         {
  //           path: '/upload-management/:id',
  //           // name: 'upload.management',
  //           icon: 'table',
  //           component: './upload-management/Detail',
  //         },
  //         {
  //           component: './404',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    component: './404',
  },
];
