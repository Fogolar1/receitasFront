<template>
    <div class="d-flex justify-center ma-5">
        <h1>Lista de Ingredientes</h1>
    </div> 
    <div class="three-elements-per-row">
        <div v-for="ingrediente in ingredientes" :key="ingrediente.id" class="border-md" style="width: 30%;">
            <h2 class="pa-1">{{ ingrediente.nome }}</h2>
            <div class="position-relative d-flex justify-end pa-1">
                <h4>Quantidade : {{ ingrediente.quantidade }}</h4>
            </div>
            
        </div>
    </div>
</template>
  
  <script>
    export default {
        data() {
            return {
                ingredientes : [ { nome: "Ovo", quantidade: 1, id : 1 }, { nome: "Ovo", quantidade: 1, id : 2 }, { nome: "Ovo", quantidade: 1, id : 2 },  { nome: "Ovo", quantidade: 1, id : 2 }]
            }
        }
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