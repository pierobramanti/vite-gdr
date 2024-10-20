<script>
import {store} from '../store.js'
export default {
    props: {
        character: Object
    }
}
</script>
<template>
    <div class="col-6 col-md-4">
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
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
</style>