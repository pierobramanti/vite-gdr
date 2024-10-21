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
         <div class="d-flex flex-column align-items-center justify-content-center my-3">
             <router-link :to=" {name: 'raccoon-the-game'} " id="back-btn">E' l'ora di combattere!</router-link>
             <router-link :to=" {name: 'characters' }" id="start-btn">Ci ripenso</router-link>
         </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.wrapper {
    height: 100vh;
    a {
        text-decoration: none;
        transition: all 0.5s;
        &#back-btn {
            background-color: $seal-brown;
            color: $coffee;
            padding: 10px 12px;
            &:hover {
                background-color: $btns_hover;
                color: #fff;
            }
        }
        &#start-btn {
            padding: 6px 0;
            color: $blue-black;
            border-bottom: 1px solid $blue-black;
            
            &:hover {
                padding: 6px;
                border: 1px solid $blue-black;
            }
        }
    }
}
</style>