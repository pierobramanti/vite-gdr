<script>
export default {
}
</script>

<template>
<div class="g-wrapper">
    <!--classico titolo di combattimento e testo di gioco "tizio vs tizio", "è il tuo turno"-->
    <div class="row">
        <div class="col-12 p-5 text-center">
            <h1>
                E' il tuo turno, viandante
            </h1>
        </div>
    </div>
    <!--Questa sarà la zona in cui saranno posizionati i personaggi -->
    <div class="row">
        <div class="col-6">
            <div class="char-spot d-flex mb-3 justify-content-center">
                <div class="pedistal"></div>
            </div>
        </div>
        <div class="col-6">
            <div class="char-spot d-flex mb-3 justify-content-center">
                <div class="pedistal"></div>
            </div>
        </div>
    </div>
    <!--UI di gameplay-->
    <div class="row">
        <div class="col-12 d-flex justify-content-center mb-5">
            <div class="ui-g-wrapper p-2">
                <div class="frame">
                    <div class="col-6 boxy d-flex flex-column justify-content-center align-items-center">
                        <div class="bt-ui">Abilita'</div>
                        <div class="bt-ui">Oggetti</div>
                        <div class="bt-ui">Scappa</div>
                    </div>
                    <div class="col-6"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import '../styles/generals.scss';

.g-wrapper{
    height: 100vh;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    h1{
        font-family: 'Dungeon', sans-serif;
        color: $seal-brown;
        font-size: 85px;
        background-color: white;
        border-radius: 60%;
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
            box-shadow: $seal-brown 8px 8px 8px ;
        }

        .boxy{
            height: 100%;
            border-right: 2px solid $seal-brown;
        }

        .bt-ui{
            font-family: 'Dungeon', sans-serif;
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
        .pedistal{
            width: 275px;
            height: 75px;
            background-color: white;
            border-radius: 60%;
            align-self: end;
        }
    }
}
</style>