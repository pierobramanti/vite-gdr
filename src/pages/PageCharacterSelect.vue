<script>
import CharacterCards from '../components/CharacterCards.vue';
import axios from 'axios';
import {store} from '../store.js'
export default {
    components: {
        CharacterCards
    },
    data() {
        return {
            store,
            characters: [],
            current_page: null,
            last_page: null,
            first_page: 1
        }
    },
    created() {
        const playerName = localStorage.getItem('playerName')
        if(playerName) {
            this.store.playerName = playerName
            this.getCharacters()
        }
    },
    methods: {
        getCharacters() {
            axios.get(`${store.url}${store.urlCharacters}`).then((res) => {
                this.characters = res.data.results.data
                this.current_page = res.data.results.current_page
                this.last_page = res.data.results.last_page
            }).catch((error) => {
                console.error('Errore recupero', error)
            })
        },
        changePage(p) {
            this.current_page = p
            axios.get(`${store.url}${store.urlCharacters}`, {params: { page: p}}).then((res) => {
                this.characters = res.data.results.data
            })
        }
    }
   
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center my-5">
                    <h1>Ave, {{store.playerName}}!</h1>
                    <h2>Selezionate il Vostro combattente</h2>
                </div>
            </div>
        </div>
        <div class="row gy-3 py-5">
            <CharacterCards v-for="character in characters" :key="character.id" :character="character"/>
        </div>
        <div class="col-12">
            <nav aria-label="Page navigation" class="d-flex justify-content-center my-3">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" :class="current_page == first_page ? 'disabled' : ''" href="#" @click="changePage(current_page - 1)" aria-label="Previous">Mi volgo indietro</a></li>
                  <li class="page-item" v-for="page in last_page"><a class="page-link" href="#" @click="changePage(page)">{{page}}</a></li>
                  <li class="page-item"><a class="page-link" :class="current_page == last_page ? 'disabled' : ''" href="#" @click="changePage(current_page + 1)" aria-label="Next">Vado oltre</a></li>
                </ul>
              </nav>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../styles/generals.scss';
</style>