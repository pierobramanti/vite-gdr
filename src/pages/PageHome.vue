<script>
export default {
    
}
</script>
<template>
    <div class="wrapper d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-center flex-column align-items-center">
                        <h1>Titolo gioco</h1>
                        <form action="POST">
                            <div class="row">
                                <div class="col-12">
                                    <label for="" class="form-label">Inserisci il tuo nome, viandante</label>
                                    <input class="form-control" type="text" id="" placeholder="Il tuo nome">
                                </div>
                            </div>
                        </form>
                        <router-link :to="{name: 'characters' }">Inizia</router-link>
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