<script>
export default {
    props: {
        character: Object
    },
    methods: {
        //emetto evento per chiusura modale
        closeModal() {
            this.$emit('closeModal')
        },
        // emetto evento per selezione personaggio
        selectCharacter() {
            this.$emit('selectCharacter', this.character)
        }
    }
}
</script>
<template>
    <div v-if="character" class="modal-overlay" @click.self="closeModal">
        <div class="custom-modal text-white">
            <div class="custom-modal-header">
                <h2 class="modal-title">Scheda di {{ character.name }}</h2>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="custom-modal-body">
                <div class="pg-img-box mx-auto" v-if="character.type.image">
                    <img :src="character.type.image" class="img-fluid mb-3" :alt="`${character.type.name} class`">
                </div>
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
            </div>
            <div class="custom-modal-footer">
                <button type="button" class="btn btn-secondary me-3" @click="closeModal">Indietro</button>
                <button type="button" class="btn btn-primary" @click="selectCharacter">Scelgo te!</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
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
    z-index: 2;
    animation: fadeIn 0.6s ease-out;
    .custom-modal {
        background: #212121;
        border-radius: 10px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        padding: 30px;
        .custom-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }        
        .custom-modal-body {
            padding: 10px 0;
            .pg-img-box {
                width: 300px;
                img {
                    max-width: 100%;
                    object-fit: contain;
                }
            }
            .stats {
                strong {
                    letter-spacing: 1px;
                }
            }
        }
        .custom-modal-footer {
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;
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