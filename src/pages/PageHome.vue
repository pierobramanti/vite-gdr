<script>
import { store } from '../store';

export default {
    data() {
        return {
            playerName: '',
            store,
            // messaggio d'errore se non viene inserito nickname, inizializzato a stringa vuota
            errorMessage: ''
        }
    },
    methods: {
        saveName() {
            if(this.playerName) {
                localStorage.setItem('playerName', this.playerName)
                store.playerName = this.playerName
                this.$router.push({name: 'characters'})
            } else {
                // riempi stringa con messaggio di errore
                this.errorMessage = "Un nome o un soprannome e' d'obbligo"
            }
        }
    }
}
</script>
<template>
    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div id="overlay_effect" class="col-12 py-5 text-center">
                    <p>RACCOON: THE GAME</p>

                    <!-- 2° OPZIONE
                    <div class="d-flex flex-column">
                        <p class="m-0">RACCOON</p> -> eventuale 'text-white' solo qui
                        <p class="m-0">THE GAME</p>
                    </div> 
                    -->

                    <div class="d-flex justify-content-center align-items-center pb-4"> <!-- possibilità: rimuovere flex e gestire meglio la grandezza dell'overlay -->
                        <form action="POST" @submit.prevent="saveName">
                            <div class="row">
                                <div class="col-12">
                                    <label for="player" class="form-label">Inserite il Vostro nome, <strong class="name_color">viandante</strong></label>
                                    <input class="form-control" type="text" id="player" name="player" v-model="playerName" placeholder="Il Vostro nome" @input="errorMessage = ''">
                                    <p v-if="errorMessage" class="alert m-0">{{ errorMessage }}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <button type="submit" @click="saveName" :class="!playerName ? 'disabled' : ''">Inizia</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';

.wrapper {
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

        label,
        input {
            letter-spacing: 2px;
            font-size: 30px;
        }

        .name_color {
            color: $seal_brown;
        }

        p {
            color: $seal-brown;
            font-size: 66px;
            font-weight: 700;
            letter-spacing: 6px;
        }
        .alert{
            font-size: 22px;
            letter-spacing: 1px;
            background-color: $coffee;
        }

        button {
            background-color: transparent;
            text-decoration: none;
            transition: all 0.5s;
            font-size: 30px;
            letter-spacing: 1px;
            padding: 6px 0;
            color: $blue-black;
            border: none;
            border-bottom: 1px solid $blue-black;
            &:hover {
                padding: 6px;
                border-bottom: 1px solid white;
                color: white;
            }
        }
    }
}
</style>