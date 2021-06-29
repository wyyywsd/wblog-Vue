import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import ArticleHome from '../views/home/ArticleHome.vue'
import About from "../views/home/About.vue"
import UserLogin from "../components/UserLogin.vue"
import ArticleItem from "../components/ArticleItem.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'name',
    component: Home,
    redirect: '/home/articles',
    children: [
      {
        path: 'articles',
        name: 'articles',
        component: ArticleHome,
      },
      {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'article/:id',
        name: 'article_item',
        component: ArticleItem
      },
      {
        path: 'article/error',
        component: ()=> import('../views/home/ArticlePage404.vue')
      },
    ]
  },
  {
    path: '/users/sign_in',
    name: 'signin',
    component: UserLogin
  },
 
  {
    path: '*',
    component: () => import('../views/Page404.vue')
  },
  


]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   console.log(to,from)
//   if (to.name === "article_item"){
//     router.push("about")
//   }
//   next()
// })
export default router
