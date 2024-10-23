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
            this.selectedCharacter = null //forse non mi serve
        },
        saveSelectedCharacter(character) {
            localStorage.setItem('selectedCharacter', JSON.stringify(character));
        }
    }
}
</script>

<template>
    <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
        <div class="card rounded-0" style="width: 20rem; height: 26rem;">
            <div v-if="character.type.image" class="background-images">
                <div class="img_box">
                    <img :src="character.type.image" :alt="`${character.type.name} class`">
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">
                    {{ character.name }}
                </h3>
                <h5 >Classe: {{character.type.name}}</h5>
                <div class="d-flex justify-content-center mb-2 mt-3">
                    <button class="custom-button me-3 fw-bolder" @click="openModal"><i class="bi bi-eye-fill me-2 "></i>Dettagli</button>
                    <router-link :to="{name: 'confirmChoices', params: { slug: character.slug } }" class="custom-link-button fw-bolder" @click="saveSelectedCharacter(character)"> <i class="bi bi-hand-index me-2"></i>Scelgo te!</router-link>
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
        background-color: $coffee;

        .img_box {
            height: 220px;
            width: 100%;
            padding: 15px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}


.card {
    background-color: $blue-black; 
    transition: transform 0.3s ease, box-shadow 0.3s ease; 
}


.card:hover {
    transform: scale(1.03); 
}


.card-title {
    font-family: 'Dungeon', sans-serif; 
    color: $acid-green; 
    text-align: center; 
    margin-bottom: 0.5rem; 
    font-size: 45px;
}


h5 {
    font-family: 'Dungeon', sans-serif; 
    color: $coffee; 
    text-align: center; 
    font-size: 30px;
}


.custom-button {
    font-size: 14px;
    background-color: #8e7444;
    color: #fff; 
    padding: 10px 20px; 
    border: none; 
    font-family: 'Cinzel', serif; 
    cursor: pointer; 
    
}

.custom-button:hover {
    background-color: #c49743;
}


.custom-link-button {
    font-size: 14px;
    background-color:#83c546;
    color: #fff; 
    padding: 10px 20px; 
    border: none; 
    font-family: 'Cinzel', serif; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    cursor: pointer; 
    
}

.custom-link-button:hover {
    background-color: $acid-green; 
}


.d-flex button, .d-flex .custom-link-button {
    padding: 8px 16px; 
}

</style>
