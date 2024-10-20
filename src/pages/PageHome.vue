<script>
import { store } from '../store';

export default {
    data() {
        return {
            playerName: '',
            store
        }
    },
    methods: {
        saveName() {
            if(this.playerName) {
                localStorage.setItem('playerName', this.playerName)
                store.playerName = this.playerName
                this.$router.push({name: 'characters'})
            }
        }
    }
}
</script>
<template>
    <div class="wrapper d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-center flex-column align-items-center">
                        <h1>Titolo gioco</h1>
                        <form action="POST" @submit.prevent="saveName">
                            <div class="row">
                                <div class="col-12">
                                    <label for="player" class="form-label">Inserite il Vostro nome, viandante</label>
                                    <input class="form-control" type="text" id="player" name="player" v-model="playerName" placeholder="Il tuo nome">
                                </div>
                            </div>
                        </form>
                        <router-link :to="{name: 'characters' }" @click="saveName">Inizia</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .wrapper {
        height: 100vh;
    }
</style>