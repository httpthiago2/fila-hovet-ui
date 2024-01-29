import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/gerenciar-filas',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'GerenciarFilas', path: '', component: () => import('pages/Filas/ListagemFilas.vue') }],
  },
  {
    path: '/teste-ws',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'TesteWs', path: '', component: () => import('pages/WebSocket/TesteWebSocket.vue') }],
  },
  {
    path: '/manipular-ws',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'ManipularWs', path: '', component: () => import('pages/WebSocket/ManipularWebSocket.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
