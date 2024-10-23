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
            action: false, //false (il bottone azioni non è cliccato)
            showGameOver: false, //flag per visualizzare il messaggio di sconfitta
            showWin: false, //flag per visualizzare il messaggio di vittoria
        }
    },
    created() {
      this.getCharacters();
    },
    computed: {
        playerHealthPercentage() {
    const maxLife = store.playerMaxLife; 
    const currentLife = store.playerCharacter.life;
    return (currentLife / maxLife) * 100;
  },
  
  // Percentuale della vita del nemico
  enemyHealthPercentage() {
    const maxLife = store.enemyMaxLife;
    const currentLife = this.selectedEnemy.life;
    return (currentLife / maxLife) * 100;
  }
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
        store.enemyMaxLife = this.selectedEnemy.life; //rendo la vita massima del nemico la sua effettiva vita massima (x healtbar)
        console.log(this.selectedEnemy)
    },
    // TURNO NEMICO
    enemyTurn() {
        //funzione calcolo critico per nemico
        const damage = calculateDamage(this.selectedEnemy)
        // vita scende in base al valore di attacco
        // calcolo danno che nemico mi da, in base alla mia difesa
        const damageTaken = calculateDamageTaken(this.selectedEnemy, store.playerCharacter);
        store.playerCharacter.life -= damageTaken

        if(store.playerCharacter.life <= 0) {
            //sconfitta 
            this.lossCase()
        } else {
            // cambia turno
            this.endTurn()
        }
    },
    yourTurn(){
         //funzione calcolo critico per player
        const damage = calculateDamage(store.playerCharacter)
        // calcolo danno che faccio a nemico, in base alla sua difesa
        const damageTaken = calculateDamageTaken(store.playerCharacter, this.selectedEnemy);
        // vita scende in base al valore di attacco
       this.selectedEnemy.life -= damageTaken;

        if(this.selectedEnemy.life  <= 0) {
            //vittoria
            this.victoryCase()
        } else {
            // cambia turno
            this.endTurn()
        }
    },
    endTurn() {
        //cambia sempre il turno
        this.turn = !this.turn
        if(!this.turn) {
            // se è false, chiama l'attacco nemico
            setTimeout(this.enemyTurn, 3000)
        }
    },
    //metdo per restartare il gioco dopo aver finito
    restart() {
        this.showGameOver = false
        this.showWin = false
        this.getCharacters()
    },
    //istanza vittoria
    victoryCase(){
        //sconfitta se HP nemico è a 0
        console.log('nemico sconfitto')
        //ricompense vittoria
        store.playerCharacter.life += 60;
        store.playerCharacter.strenght += 2;
        store.playerCharacter.defense += 2;
        store.PLayerScore += 10;
        //
        //mostro schermata vittoria
         this.showWin = true; 
    },
    //istanza sconfitta
    lossCase(){
       //sconfitta se HP player è a zero
        console.log('sei stato sconfitto')
        // mostro schermata sconfitta
        this.showGameOver = true;
    },
    visibleActions() {
            this.action = true
        },

        notVisibleActions() {
            this.action = false
        },
    }
}
</script>

<template>
<div class="g-wrapper">
    <!--score-->
    <h1 class="text-success score">Score: {{store.PLayerScore}}</h1>
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
                        <div class="frame px-2">
                            <p class="text-health m-0 mx-2">HP: {{store.playerCharacter.life}}</p>
                            <div class="health-bar-container">
                                <div class="health-bar" :style="{ width: playerHealthPercentage + '%', backgroundColor: playerHealthPercentage < 50 ? '#f44336' : '#4caf50' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="char-spot d-flex mb-3 justify-content-center">
                    <img v-if="selectedEnemy.type" :src="selectedEnemy.type.image" alt="">
                    <div class="pedistal"></div>
                    <div class="ui-g-wrapper-sm-enemy p-3">
                        <div class="frame px-2">
                            <p class="text-health m-0 mx-2">HP: {{selectedEnemy.life}}</p>
                            <div class="health-bar-container">
                                <div class="health-bar" :style="{ width: enemyHealthPercentage + '%', backgroundColor: enemyHealthPercentage < 50 ? '#f44336' : '#4caf50' }"></div>
                              </div>
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
                            <div class="bt-ui" @click="visibleActions()">Azioni</div>
                            <div class="bt-ui" @click="notVisibleActions()">Oggetti</div>
                            <router-link :to="{ name: 'homepage'}" class="bt-ui">Scappa</router-link>
                        </div>
                        <div class="col-6">
                            <div v-if="action" class="boxy d-flex flex-column  align-items-center">
                                <div class="bt-ui bg-darker" @click="yourTurn">Attacca</div>
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
<!-- sconfitta -->
 <div v-if="showGameOver" :class="{'game-over-screen gradual': showGameOver}" class="game-over-screen d-flex justify-content-center align-items-center">
    <div class="content">
        <h1 class="text-uppercase">Game over</h1>
        <p>Sei morto, non eri poi granchè, "eroe".</p>
        <h1 class="text-danger">Score: {{store.PLayerScore}}</h1>
        <div class="d-flex btns">
            <router-link :to="{name: 'characters'}">Cerco un eroe migliore</router-link>
        </div>
    </div>
 </div>
 <div v-if="showWin" :class="{'win-screen gradual': showWin}" class="win-screen d-flex justify-content-center align-items-center">
    <div class="content">
        <h1 class="text-uppercase">Hai vinto!</h1>
        <div class="d-flex btns">
            <button @click="restart">Combatto ancora!</button>
            <router-link :to="{name: 'characters'}">Cerco un eroe migliore</router-link>
            <router-link :to="{name: 'homepage'}">Torno a casa</router-link>
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
    position: relative;
    
    .score{
        position: absolute;
        top: 20%;
        left: 10%;
        font-size: 55pt;
        text-shadow: #fff 1px 1px 2px;
    }

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

        .text-health{
            font-size: 22px;
            margin-left: 5px;
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

                .health-bar-container {
                    width: 100%;
                    background-color: #e0e0e0;
                    border-radius: 10px;
                    overflow: hidden;
                }
                
                .health-bar {
                    height: 20px;
                    background-color: #4caf50;
                    width: 100%; /* La larghezza sarà dinamica in base alla vita del giocatore */
                    transition: width 0.5s; /* Aggiunge un'animazione fluida */
                }
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

                .health-bar-container {
                    width: 100%;
                    background-color: #e0e0e0;
                    border-radius: 10px;
                    overflow: hidden;
                }
                
                .health-bar {
                    height: 20px;
                    background-color: #4caf50;
                    width: 100%; /* La larghezza sarà dinamica in base alla vita del giocatore */
                    transition: width 0.5s; /* Aggiunge un'animazione fluida */
                }
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

        a {
            text-decoration: none;
            color: black;
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

.win-screen, .game-over-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: all 1s ease-in;
}

.win-screen {
    color: $seal-brown;
    background-color: #cdbeaccb;
    &.gradual {
        display: flex;
        opacity: 1;
    }
}
.game-over-screen {
    color: white;
    background-color: #352f28c2;
    &.gradual {
        display: flex;
        opacity: 1;
    }   
}
.content {
    text-align: center;
    .btns {
        margin-top: 20px;
        button, a {
            text-decoration: none;
            transition: all 0.3s;
            border: none; 
            text-align: center;  
            font-family: 'Cinzel', serif;
            padding: 10px 20px; 
            color: #fff;
            cursor: pointer;
        }
        a {
            margin-left: 20px;
            background-color: #8e7444;
            &:hover {
                background-color: #c49743;
            }
        }
        button {
            background-color:#83c546;; 
            &:hover {
                background-color: $acid-green;
            }    
        }
    }
}
</style>