import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Library from '@/views/Library.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import MyBooks from '@/views/MyBooks.vue'
import BookAdd from '@/views/book/Add.vue'
import BookEdit from '@/views/book/Edit.vue'
import BookDetails from '@/views/book/Details.vue'
import BookLayout from '@/views/book/Layout.vue'
import ReviewLayout from '@/views/book/review/Layout.vue'
import ReviewAdd from '@/views/book/review/Add.vue'
import ReviewEdit from '@/views/book/review/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/library',
      name: 'GetBooks',
      component: Library,
    },
    {
      path: '/books/add',
      name: 'BookAdd',
      component: BookAdd,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/mybooks',
      name: 'MyBooks',
      component: MyBooks,
    },
    {
      path: '/books/:id',
      name: 'BookLayout',
      props: true,
      component: BookLayout,
      children: [
        {
          path: '',
          name: 'BookEdit',
          component: BookEdit,
          props: true,
        },
        {
          path: 'details',
          name: 'BookDetails',
          component: BookDetails,
        },
        {
          path: 'reviews',
          name: 'ReviewLayout',
          props: true,
          component: ReviewLayout,
          children: [
            {
              path: '/edit/:id',
              name: 'ReviewEdit',
              component: ReviewEdit,
            },
            {
              path: '/add/:id',
              name: 'ReviewAdd',
              component: ReviewAdd,
            },
          ],
        },
      ],
    },
  ],
})

export default router
