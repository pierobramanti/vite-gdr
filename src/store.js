import { reactive } from "vue";

const store = reactive({
    url: 'http://127.0.0.1:8000/api',
    urlCharacters: '/characters',
    urlConfirm: '/confirm-choices',
    urlItems: '/items',

    playerName: ''
})

export { store }