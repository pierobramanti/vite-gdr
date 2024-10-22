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
    <div class="container py-4">
        <div id="overlay_effect">
            <div id="home_button">
                <router-link :to="{ name: 'homepage' }"><i class="bi bi-house-door-fill"></i></router-link>
            </div>
            <div class="row pt-5">
                <div class="col-12">
                    <div class="text-center text-white">
                        <h1>Ave, <strong class="name_color">{{store.playerName}}</strong>!</h1>
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
                      <li class="page-item fw-bolder"><a class="page-link" :class="current_page == first_page ? 'disabled' : ''" href="#" @click="changePage(current_page - 1); $event.target.blur()" aria-label="Previous">Mi volgo indietro</a></li>
                      <li class="page-item fw-bolder" v-for="page in last_page"><a class="page-link" href="#" @click="changePage(page); $event.target.blur()">{{page}}</a></li>
                      <li class="page-item fw-bolder"><a class="page-link" :class="current_page == last_page ? 'disabled' : ''" href="#" @click="changePage(current_page + 1); $event.target.blur()" aria-label="Next">Vado oltre</a></li>
                    </ul>
                  </nav>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../styles/generals.scss';

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
        }
        
        .name_color {
            color: $seal_brown;
        }
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
    }


    .page-link {
        font-family: 'Cinzel', serif; 
        background-color:  #8e7444; 
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

</style>