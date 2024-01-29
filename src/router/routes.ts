import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/fila',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'GerenciarFilas', path: 'index', component: () => import('pages/Filas/ListagemFilas.vue') },
      { name: 'NovaFila', path: 'create', component: () => import('pages/Filas/FormFila.vue') },
      { name: 'EditarFila', path: 'edit/:id', component: () => import('pages/Filas/FormFila.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
