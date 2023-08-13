import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import SignUp from '@/components/SignUp.vue'
import LoginPage from '@/components/LoginPage.vue'
import AddRestaurant from '@/components/AddRestaurant.vue'
import UpdateRestaurant from '@/components/UpdateRestaurant.vue'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login'
    },
    {
        name: 'AddRestaurant',
        component: AddRestaurant,
        path: '/add-restaurant'
    },
    {
        name: 'UpdateRestaurant',
        component: UpdateRestaurant,
        path: '/update-restaurant/:id'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router