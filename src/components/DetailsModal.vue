<script>
export default {
    props: {
        character: Object
    },
    methods: {
        //emetto evento per chiusura modale
        closeModal() {
            this.$emit('closeModal')
        }
    }
}
</script>
<template>
    <div v-if="character" class="modal-overlay" @click.self="closeModal">
        <div class="custom-modal text-white">
            <div class="custom-modal-header">
                <h2 class="modal-title">Scheda di <strong>{{ character.name }}</strong></h2>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="custom-modal-body pt-5 pb-4">
                <ul class="stats list-unstyled">
                    <li><strong class="me-1">Classe:</strong>{{ character.type.name }}</li>
                    <li><strong class="me-1">Forza:</strong>{{ character.strength }}</li>
                    <li><strong class="me-1">Difesa:</strong>{{ character.defence }}</li>
                    <li><strong class="me-1">Destrezza:</strong>{{ character.speed }}</li>
                    <li><strong class="me-1">Intelligenza:</strong>{{ character.intelligence }}</li>
                    <li><strong class="me-1">HP max:</strong>{{ character.life }}</li>
                    <li class="mt-3 mb-2" v-if="character.description"><strong class="me-1">Descrizione:</strong> <p>
                        {{ character.description }}
                    </p></li>
                    <li class="mt-3 mb-2" v-else><strong class="me-1">Descrizione:</strong>
                        <p>Nessuna descrizione disponibile</p>
                    </li>
                </ul>
                <div class="pg-img-box mx-auto" v-if="character.type.image">
                    <img :src="character.type.image" class="img-fluid mb-3" :alt="`${character.type.name} class`">
                </div>
            </div>
            <div class="custom-modal-footer">
                <button type="button" class="me-3" @click="closeModal">Indietro</button>
                <router-link :to="{name: 'confirmChoices', params: { slug: character.slug } }" type="button">Scelgo te!</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../styles/generals.scss';
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: 0;
    animation: fadeIn 0.6s ease-out;
    .custom-modal {
        background: #212121;
        border-radius: 10px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        padding: 10px 30px;
        .custom-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .modal-title {
                font-size: 32px;
                strong {
                    color: $acid-green;
                    letter-spacing: 2px;
                    font-size: 34px;
                }
            }
        }        
        .custom-modal-body {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            .pg-img-box {
                width: 200px;
                img {
                    max-width: 100%;
                    object-fit: contain;
                }
            }
            .stats {
                li {
                    font-size: 24px;
                    strong {
                        letter-spacing: 1px;
                    }
                }
            }
        }
        .custom-modal-footer {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 10px;
            a {
                background-color:#83c546;; 
                color: #fff; 
                padding: 10px 20px;
                text-align: center; 
                text-decoration: none; 
                display: inline-block;
                &:hover {
                    background-color: $acid-green; 
                }
            }
            button {
                background-color: #969696;
                color: #fff;
                &:hover {
                    background-color: #666666; 
                }
            }
            button, a {
                font-size: 14px;
                letter-spacing: 2px;
                font-family: 'Cinzel', serif;
                transition: all 0.3s;
                border: none;
                padding: 10px 20px; 
                cursor: pointer;
            }
        }
    }
}

//animation
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>