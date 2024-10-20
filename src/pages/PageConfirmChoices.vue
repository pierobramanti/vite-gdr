<script>
import {store} from '../store.js'
import axios from 'axios';
export default {
    data() {
        return {
            store,
            selectedCharacter: null
        }
    },
    created() {
        this.recoveryPlayerName()

        const slug = this.$route.params.slug
        if (slug) {
            this.getDetails(slug)
        } else {
            console.error("Slug inesistente")
        }
    },
    methods: {
        getDetails(slug) {
            axios.get(`${store.url}${store.urlCharacters}${store.urlConfirm}/${slug}`).then((res) => {
                console.log(res.data.character.name);
                this.selectedCharacter = res.data.character;
            }).catch((error) => {
                console.error("errore", error);
            });
        },
        recoveryPlayerName() {
            const playerName = localStorage.getItem('playerName')
            if(playerName) {
                this.store.playerName = playerName
            }
        }
    }
}
</script>
<template>
    <div class="wrapper d-flex justify-content-center align-items-center flex-column">
        <h1>All'attenzione dell'eroe <strong>{{store.playerName}}</strong></h1>
        <h3 v-if="selectedCharacter">Avete scelto <strong>{{selectedCharacter.name}}</strong> come campione</h3>
        <h4>Avete la certezza di voler proseguire?</h4>
        <!-- ancora da gestire -->
         <div class="d-flex my-3">
             <router-link :to=" {name: 'characters' }" class="me-3">Ci ripenso</router-link>
             <!-- <router-link>Voglio {{selectedCharacter.name}}</router-link> -->
         </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.wrapper {
    height: 100vh;
}
</style>