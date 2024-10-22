<script>
import { store } from '../store';
import axios from 'axios';
import { randomEnemy, calculateDamageTaken, calculateDamage } from '../data/gameLogic';
export default {
    data() {
        return {
            store,
            enemies: [],
            selectedEnemy: {},
            playerTurn: '',
            turn: true, // true è il player, false è l'avversario
            action: true //false (il bottone azioni non è cliccato)
        }
    },
    created() {
      this.getCharacters();
    },
    methods: {
        getCharacters() {
            axios.get(`${store.url}${store.urlCharacters}`).then((res) => {
                this.enemies = res.data.results.data;
                console.log(this.enemies); 
                this.pickEnemy();
            }).catch((error) => {
                console.error("Errore nel caricamento dei personaggi:", error);
            });
        },
    pickEnemy(){
        this.selectedEnemy = randomEnemy(this.enemies);
        console.log(this.selectedEnemy)
    },
    attack(){
        calculateDamage();
    }
    }
}
</script>

<template>
<div class="g-wrapper">
    <!--classico titolo di combattimento e testo di gioco "tizio vs tizio", "è il tuo turno"-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-5 text-center">
                <div class="roundy">
                    <h1 v-if="turn">
                        E' il tuo turno, {{store.playerName}}
                    </h1>
                    <h1 v-else>
                        E' il turno di {{ selectedEnemy.name }}
                    </h1>
                </div>
            </div>
        </div>
    </div>
    <!--Questa sarà la zona in cui saranno posizionati i personaggi -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <div class="char-spot d-flex mb-3 justify-content-center" v-if="store.playerCharacter.type">
                    <img :src="store.playerCharacter.type.image" :alt="store.playerCharacter.name" class="pg-img">
                    <div class="pedistal"></div>
                    <div class="ui-g-wrapper-sm p-3">
                        <div class="frame">
                            <p>HP: {{store.playerCharacter.life}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="char-spot d-flex mb-3 justify-content-center">
                    <img :src="selectedEnemy.type.image" alt="">
                    <div class="pedistal"></div>
                    <div class="ui-g-wrapper-sm-enemy p-3">
                        <div class="frame">
                            HP: {{selectedEnemy.life}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--UI di gameplay-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <div v-if="turn" class="ui-g-wrapper p-3">
                    <div class="frame d-flex">
                        <div class="col-6 boxy d-flex flex-column justify-content-center align-items-center">
                            <div class="bt-ui">Azioni</div>
                            <div class="bt-ui">Oggetti</div>
                            <div class="bt-ui">Scappa</div>
                        </div>
                        <div class="col-6">
                            <div class="boxy d-flex flex-column  align-items-center">
                                <div class="bt-ui bg-darker" @click="attack()">Attacca</div>
                                <div class="bt-ui bg-darker">Passa il turno..</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="ui-g-wrapper p-3">
                    <div class="frame">
                        <div class="col-12 boxy d-flex flex-column justify-content-center align-items-center">
                          <h2>L'avversario sceglie la sua mossa...</h2>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.bg-darker{
    background-color: #cdbeac;
}

.g-wrapper{
    height: 100vh;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-image: url(https://img.goodfon.com/original/1920x1080/e/ee/darkest-dungeon-death-candles-swords-ruins-altar.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    font-family: 'Dungeon', sans-serif;

    .roundy{
        border-radius: 60%;
        position: relative;
        background-image: url(../../public/img/background/rb_2147486747.png);
        background-size: 40%;
        background-position: center;
        background-repeat: repeat;


            h1{
                font-family: 'Dungeon', sans-serif;
                color: white;
                font-size: 150px;
                text-shadow: $seal-brown 8px 8px 8px ;
            }
    }

    .char-spot{
        position: relative;
        .pg-img {
            transform: scaleX(-1);
        }
        .ui-g-wrapper-sm{
            background-color: #cdbeac;
            height: 100px;
            width: 200px;
            border-radius: 30px;
            position: absolute;
            right: 10%;
            top: 40%;
            
            .frame{
                border: 4px solid $seal-brown;
                background-color: white;
                height: 100%;
                box-shadow: black 0px 0px 3px;
            }
        }
        .ui-g-wrapper-sm-enemy{
            background-color: #cdbeac;
            height: 100px;
            width: 200px;
            border-radius: 30px;
            position: absolute;
            left: 10%;
            top: 40%;
            
            .frame{
                border: 4px solid $seal-brown;
                background-color: white;
                height: 100%;
                box-shadow: black 0px 0px 3px;
            }
        }
    }

    .ui-g-wrapper{
        background-color: #cdbeac;
        height: 200px;
        width: 800px;
        border-radius: 30px;

        .frame{
            border: 4px solid $seal-brown;
            background-color: white;
            height: 100%;
            box-shadow: black 0px 0px 3px;
        }

        .boxy{
            height: 100%;
            border-right: 2px solid $seal-brown;
        }

        .bt-ui{
            font-size: 30px;
            border: 2px solid $seal-brown;
            height: calc(100% / 3);
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover{
                box-shadow: inset 0 0 10px $seal-brown;
            }
        }
    }

    .char-spot{
        height: 340px;
        position: relative;
        img{
            position: absolute;
            width: 320px;
            top: -5%;
        }
        .pedistal{
            width: 275px;
            height: 75px;
            background-color: white;
            border-radius: 60%;
            align-self: end;
            box-shadow: inset 0 60px 20px rgba(0, 0, 0, 0.453), /* Ombra nera interna */
            inset 0 0 40px rgba(255, 255, 255, 0.7); /* Ombra bianca esterna */
        }
    }
}
</style>