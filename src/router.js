import { createRouter, createWebHistory } from "vue-router";

import PageHome from "./pages/PageHome.vue";
import PageCharacterSelect from "./pages/PageCharacterSelect.vue";
import PageConfirmChoices from "./pages/PageConfirmChoices.vue";

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
            path: '/confirm-choices/:slug',
            name: 'confirmChoices',
            component: PageConfirmChoices
        }
    ]
})

export {router}