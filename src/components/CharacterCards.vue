<script>
import DetailsModal from '../components/DetailsModal.vue';
export default {
    components: {
        DetailsModal
    },
    props: {
        character: Object
    },
    data() {
        return {
            visibleModal: false,
            selectedCharacter: null
        }
    },
    methods: {
        openModal() {
            // character selezionato + mostra modale
            this.visibleModal = true
            this.selectedCharacter = this.character
        },
        closeModal() {
            //reset character + nascondi modale
            this.visibleModal = false
            // this.selectedCharacter = null
        }
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
                <h5>Classe: {{character.type.name}}</h5>
                <div class="d-flex justify-content-center mt-3 mb-2">
                    <button class="btn btn-primary mx-auto" @click="openModal">Dettagli</button>
                </div>
            </div>
        </div>
        <DetailsModal v-if="visibleModal" :character="selectedCharacter" @closeModal="closeModal"/>
    </div>

</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.card {
    min-height: 300px;

    .background-images {
        background-color: #e0e0e7;
    }
}
</style>