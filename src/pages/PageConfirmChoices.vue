<script>
import {store} from '../store.js'
import axios from 'axios';
export default {
    data() {
        return {
            store,
            selectedCharacter: {}
        }
    },
    created() {
        this.recoveryPlayerName()

        console.log(store.playerCharacter)

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
                this.selectedCharacter = res.data.character;
                console.log(this.selectedCharacter)
                // salvo il personaggio associato all'utente
                store.playerCharacter = res.data.character;
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

    <div id="wrapper">
        <div class="container">
            <div class="row">
                <div id="overlay_effect" class="text-center">
                    <div id="home_button">
                        <router-link :to="{ name: 'homepage' }"><i class="bi bi-house-door-fill"></i></router-link>
                    </div>
                    <div class="container pt-5">
                        <div class="row">
                            <div class="col-12">
                                <h1 class="pb-4">All'attenzione dell'eroe <strong class="name_color">{{store.playerName}}!</strong></h1> <!-- vedere per trombette ai lati dell'h1 -->
                                <h2 v-if="selectedCharacter">Avete scelto <strong class="name_color">{{selectedCharacter.name}}</strong> come campione,</h2>
                                <h3>avete la certezza di voler proseguire?</h3>
                                <!-- ancora da gestire -->
                                <div class="d-flex flex-column align-items-center justify-content-center mt-5 mb-3">
                                    <router-link :to=" {name: 'raccoon-the-game'} " id="back-btn" class="mb-2">E' l'ora di combattere!</router-link>
                                    <router-link :to=" {name: 'characters' }" id="start-btn">Ci ripenso</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
#wrapper {
    height: 100vh;
    color: white;
    display: flex;
    align-items: center;
    #overlay_effect {
        font-family: 'Dungeon', sans-serif;
        padding: 30px;
        background-color: rgba(226, 223, 217, 0.2);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 8px;
        position: relative;

        #home_button {
            position: absolute;
            top: 17px;
            left: 29px;
            font-size: 30px;
            cursor: pointer;
            a {
                color: white;
            }
        }

        h1,
        h2,
        h3 {
            letter-spacing: 3px;
        }

        .name_color {
            color: $seal_brown;
        }

        a {
            text-decoration: none;
            transition: all 0.5s;
            font-size: 24px;
            letter-spacing: 1px;
            &#start-btn {
                padding: 6px 0;
                color: $blue-black;
                border-bottom: 1px solid $blue-black;
                &:hover {
                    padding: 6px;
                    border-bottom: 1px solid white;
                    color: white;
                }
            }
            &#back-btn {
                background-color: $seal-brown;
                color: $coffee;
                padding: 10px 12px;
                &:hover {
                    background-color: $btns_hover;
                    color: #fff;
                }
            }
        }
    }
}
</style>