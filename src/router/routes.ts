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
  {
    path: '/prontuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'GerenciarProntuario', path: 'index', component: () => import('pages/Prontuario/ProntuarioLista.vue') },
      { name: 'NovoProntuario', path: 'create', component: () => import('pages/Prontuario/ProntuarioForm.vue') },
      { name: 'EditarProntuaio', path: 'edit/:id', component: () => import('pages/Prontuario/ProntuarioForm.vue') },
    ],
  },
  {
    path: '/sala',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'GerenciarSalas', path: 'index', component: () => import('pages/Salas/ListagemSalas.vue') },
      { name: 'NovaSala', path: 'create', component: () => import('pages/Salas/FormSalas.vue') },
      { name: 'EditarSala', path: 'edit/:id', component: () => import('pages/Salas/FormSalas.vue') },
    ],
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
