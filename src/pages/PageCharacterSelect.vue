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
            current_page: null,
            last_page: null,
            characters: [],
            first_page: 1
        }
    },
    created() {
        const playerName = localStorage.getItem('playerName')
        if(playerName) {
            store.playerName = playerName;
            this.getCharacters()
        }
        this.resetScore();
    },
    methods: {
        getCharacters() {
            axios.get(`${store.url}${store.urlCharacters}`).then((res) => {
                this.characters = res.data.results.data
                console.log(this.characters)
                store.characters = res.data.results.data;
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
        },
        resetScore(){
            store.PLayerScore = 0
        }
    }
   
}
</script>
<template>

    <div id="wrapper">
        <div class="container p-4">
            <div id="overlay_effect">
                <div id="home_button">
                    <router-link :to="{ name: 'homepage' }"><i class="bi bi-house-door-fill"></i></router-link>
                </div>
                <div class="row">
                    <div class="col-12">
                       <div class="text-center text-white">
                            <h1>Ave, <strong class="name_color">{{store.playerName}}</strong>!</h1>
                            <h2>Selezionate il Vostro combattente</h2>
                        </div>
                    </div>
                </div>
                <div class="row gy-3">
                    <CharacterCards v-for="character in characters" :key="character.id" :character="character"/>
                </div>
                <div class="col-12">
                    <nav aria-label="Page navigation" class="d-flex justify-content-center m-0 py-4">
                        <ul class="pagination">
                          <li class="page-item fw-bolder"><a class="page-link" :class="current_page == first_page ? 'disabled_button' : ''" href="#" @click="changePage(current_page - 1); $event.target.blur()" aria-label="Previous">Mi volgo indietro</a></li>
                          <li class="page-item fw-bolder" v-for="page in last_page"><a class="page-link" href="#" @click="changePage(page); $event.target.blur()">{{page}}</a></li>
                          <li class="page-item fw-bolder"><a class="page-link" :class="current_page == last_page ? 'disabled_button' : ''" href="#" @click="changePage(current_page + 1); $event.target.blur()" aria-label="Next">Vado oltre</a></li>
                        </ul>
                      </nav>
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
            padding: 20px 60px 0;
            background-color: rgba(226, 223, 217, 0.2);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border-radius: 8px;
            position: relative;
    
            #home_button {
                position: absolute;
                top: 22px;
                left: 29px;
                font-size: 30px;
                cursor: pointer;
                a {
                    color: white;
                }
            }
    
            h1,
            h2 {
                letter-spacing: 2px;
                text-shadow: 1px 1px 3px black;
            }

            .name_color {
                color: $titles;
                text-shadow: 1px 1px 3px black;
            }
    
            // NAVBAR //
            nav {
                margin: 20px 0; 
                .pagination {
                    display: flex;
                    list-style: none; 
                    padding: 0;
                    border-radius: 8px;
                    border: 2px solid $espresso;
                    .disabled_button {
                        cursor: not-allowed;
                        background-color: #8e7444b0; 
                        color: darkgrey; 
                        border-color: lightgrey; 
                        text-decoration: none; 
                        opacity: 0.7; 
                        pointer-events: none;
                    }
                }
            
                .page-link {
                    font-family: 'Cinzel', serif; 
                    background-color: #8e7444; 
                    color: #fff; 
                    padding: 8px 15px; 
                    border: 1px solid $acid-green; 
                    text-decoration: none; 
                    transition: background-color 0.5s ease; 
                }
            
                .page-link:hover {
                    background-color:  #c49743; 
                    color: #fff; 
                    font-weight: 800;  
                }
            }
        }
    }

</style>