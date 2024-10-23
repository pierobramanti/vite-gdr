<script>
import { store } from '../store.js';
export default {
  data() {
    return {
      store,
      countdown: 5,
    };
  },
  mounted() {
    const countdownInterval = setInterval(() => {
      if(this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(countdownInterval);
        this.$router.push({ name: 'raccoon-the-game' });
      }
    }, 1000); 
  },
}
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center" id="loading-page">
    <div class="row w-100 d-flex justify-content-between">
      <div class="col-md-3 d-flex align-items-center justify-content-center overlay p-4">
        <p class="fs-4">"Una volta atterrato nella pagina di combattimento, ti scontrerai con un personaggio casuale scelto dalla lista dei personaggi. Sarai tu a iniziare per primo: clicca sul tasto abilita' per attaccare il tuo avversario."</p>
      </div>
      <div class="col-md-5 d-flex flex-column align-items-center justify-content-center overlay p-4 mx-3">
        <div id="home_button">
        <router-link :to="{ name: 'homepage' }"><i class="bi bi-house-door-fill"></i></router-link>
    </div>
        <p class="fs-2">Verrai reindirizzato alla pagina di combattimento tra:</p>
        <p class="display-1 fw-bold">{{ countdown }}s</p> 
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-center overlay p-4">
        <p class="fs-4">Il primo che ridurra' a zero gli HP (Punti Vita) del proprio avversario vincera' il combattimento. Gli HP verranno sottratti in base al valore dell'attacco dell'attaccante e alla difesa del difensore: l'attacco ridurra' gli HP del difensore in misura proporzionale alla differenza tra il valore dell'attacco e il valore della difesa.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#loading-page {
    background-image: url('../../public/img/background/loading_page.jpg'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    height: 100vh;

    #home_button {
      position: absolute;
      top: 22px;
      left: 29px;
      font-size: 24px;
      cursor: pointer;
      a {
          color: white;
      }
    }
}

.overlay {
    font-family: 'Dungeon', sans-serif;
    background-color: rgba(226, 223, 217, 0.2); 
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(5px); 
    border-radius: 8px; 
    color: black;
    text-align: center; 
}

</style>
