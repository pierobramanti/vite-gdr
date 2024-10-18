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
        this.getCharacters()
    },
    methods: {
        getCharacters() {
            axios.get(`${store.url}${store.urlCharacters}`).then((res) => {
                console.log(res.data.results)
            })
        }
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">Seleziona il tuo personaggio</div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="card">
                    <img src="" class="card-img-top">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>