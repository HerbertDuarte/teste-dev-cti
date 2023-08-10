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
        path: "/modules/show/:id",
        component: () => import("pages/ShowScore.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/edit", component: () => import("pages/Edit.vue") },
      {
        path: "/edit/confirm/:id/:from?",
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
      { path: "/search/", component: () => import("pages/SearchPage.vue") },
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
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/delete", component: () => import("pages/Delete.vue") },
      {
        path: "/delete/confirm/:id",
        component: () => import("pages/ConfirmDelete.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
