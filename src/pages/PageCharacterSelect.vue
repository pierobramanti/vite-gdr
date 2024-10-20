<script>
import axios from 'axios';
import {store} from '../store.js'
export default {
    data() {
        return {
            store,
            characters: []
        }
    },
    created() {
        const playerName = localStorage.getItem('playerName')
        if(playerName) {
            this.store.playerName = playerName
        }
        this.getCharacters()
    },
    methods: {
        getCharacters() {
            axios.get(`${store.url}${store.urlCharacters}`).then((res) => {
                console.log(res.data.results)
                this.characters = res.data.results
            }).catch((error) => {
                console.error('Errore recupero', error)
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
        <div class="row gy-3">
            <div class="col-6 col-md-4" v-for="character in characters" :key="character.id">
                <div class="card">
                    <div v-if="character.type.image" class="background-images">
                        <img :src="character.type.image" class="card-img-top p-3" :alt="`${character.type.name} class`">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            {{ character.name }}
                        </h3>
                        <h6>Tipo: {{character.type.name}}</h6>
                        <p class="card-text" v-if="character.description">{{character.description}}</p>
                        <p class="card-text" v-else>Nessuna descrizione presente</p>
                        <h5 class="text-end">Statistiche:</h5>
                        <ul class="list-unstyled text-end">
                            <li>Forza: {{ character.strength }} </li>
                            <li>Difesa: {{ character.defence }} </li>
                            <li>Destrezza: {{ character.speed }} </li>
                            <li>Intelligenza: {{ character.intelligence }} </li>
                            <li>HP max: {{ character.life }} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../styles/generals.scss';
</style>