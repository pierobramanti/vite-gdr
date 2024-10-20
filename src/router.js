import { createRouter, createWebHistory } from "vue-router";

import PageHome from "./pages/PageHome.vue";
import PageCharacterSelect from "./pages/PageCharacterSelect.vue";
import PageConfirmChoises from "./pages/PageConfirmChoises.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: PageHome
        },
        {
            path: '/characters',
            name: 'characters',
            component: PageCharacterSelect
        },
        {
            path: '/confirm-choises',
            name: 'confirm-choises',
            component: PageConfirmChoises
        }
    ]
})

export {router}