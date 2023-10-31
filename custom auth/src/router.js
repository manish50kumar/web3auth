import Home from './Home.vue'
import Contact from './components/Contact.vue'
import About from './components/About.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: Home,
        path:'/'
    },
    {
        name: 'Contact',
        component: Contact,
        path:'/contact'
    },
    {
        name: "About",
        component: About,
        path:'/about'
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;


