import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PokemonPage from '../views/PokemonPage.vue';
import FiltersView from '../views/FiltersView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/filter',
    name: 'filter',
    component: FiltersView
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: PokemonPage,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
