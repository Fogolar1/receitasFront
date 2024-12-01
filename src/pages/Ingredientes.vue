<template>
    <NavbarReceitas />
    <div class="d-flex justify-center ma-5">
        <h1>Lista de Ingredientes</h1>
    </div> 
    <div class="d-flex justify-center ma-5">
        <v-btn class="me-4" type="submit" @click="redirectCadastro()">Novo Ingrediente</v-btn>
    </div>
    <div class="three-elements-per-row">
        <div v-for="ingrediente in ingredientes" :key="ingrediente.id" class="border-md" style="width: 30%; cursor: pointer;" @click="redirectCadastro(ingrediente.id)">
            <h2 class="pa-1">{{ ingrediente.nome }}</h2>
            <div class="position-relative d-flex justify-end pa-1">
                <h4>Quantidade : {{ ingrediente.quantidade }}</h4>
            </div>
        </div>
    </div>
</template>
  
<script>
import NavbarReceitas from './NavbarReceitas.vue';

export default {
    data() {
        return {
            ingredientes : [ { nome: "Ovo", quantidade: 1, id : 1 }, { nome: "Ovo", quantidade: 1, id : 2 }, { nome: "Ovo", quantidade: 1, id : 2 },  { nome: "Ovo", quantidade: 1, id : 2 }]
        }
    },
    methods: {
        redirectCadastro(id) {
            this.$router.push({
                name: "cadastroIngredientes",
                params : { id: this.id }
            })
        } 
    },
    components: { NavbarReceitas }
}   
</script>

<style scoped>
    .three-elements-per-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        place-items: center;
        gap : 10px
    }
</style>