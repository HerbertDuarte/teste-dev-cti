const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [{ path: "", component: () => import("pages/Dashboard.vue") }],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/modules", component: () => import("pages/Modules.vue") },
      {
        path: "/modules/view/:id",
        component: () => import("pages/ViewModule.vue"),
      },
      {
        path: "/modules/create",
        component: () => import("pages/CreateModule.vue"),
      },
      {
        path : "/modules/edit/score/:id",
        component : () => import("pages/EditScore.vue")
      }
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/edit/confirm/:id",
        component: () => import("pages/ConfirmEdit.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/exit", component: () => import("pages/Exit.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/visualizer", component: () => import("pages/Visualizer.vue") },
      {
        path: "/visualizer/:id",
        component: () => import("pages/ViewStudent.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/register", component: () => import("pages/Register.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
