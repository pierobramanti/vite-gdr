import { reactive } from "vue";

const store = reactive({
    url: 'http://127.0.0.1:8000/api',
    urlCharacters: '/characters',
    urlConfirm: '/confirm-choices',
    urlItems: '/items',

    characters: [],
    // salvataggio dati relativi all'utente giocatore
    playerName: '',
    playerCharacter: '',
    PLayerScore: 0,
    playerMaxLife: 0,
    enemyMaxLife: 0,
})

export { store }