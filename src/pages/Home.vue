<template>
    <NavbarReceitas />
    <div class="d-flex justify-center ma-5">
        <h1>Bem vindo ao site de receitas!</h1>
    </div>
    <div class="d-flex justify-center">
        <div style="margin-right : 15%; margin-top: 5%;" @click="this.$router.push({path : '/ingredientes'})">
            <h1>Ingredientes</h1>
            <v-icon icon="mdi-shaker-outline" style="font-size: 150px; margin-top: 5%;"></v-icon>
        </div>
        <div style="margin-left : 15%; margin-top: 5%;" @click="this.$router.push({path : '/receitas'})">
            <h1>Receitas</h1>
            <v-icon icon="mdi-food-turkey" style="font-size: 150px; margin-top: 5%;"></v-icon>
        </div>
    </div>
</template>

<script>
import NavbarReceitas from './NavbarReceitas.vue';

export default {
    components : {NavbarReceitas}
}
</script>