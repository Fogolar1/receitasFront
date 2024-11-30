<template>
  <div class="d-flex justify-center ma-5">
      <h1>Lista de Receitas</h1>
  </div> 
  <div class="three-elements-per-row">
      <div v-for="receita in receitas" :key="receita.id" class="border-md d-flex justify-center" style="width: 70%;" :class="[receita.available ? 'available' : 'unavailable']">
          <h2 class="pa-1">{{ receita.nome }}</h2>
      </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
              receitas : [ { nome: "Pizza de siri", available: true, id : 1 }, { nome: "Hamburguer de banana", available: true, id : 2 }, { nome: "Macarrão com abacate", available: false, id : 2 },  { nome: "Doritos caseiro", available: false, id : 2 }]
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

  .available {
    color : green;
    background-color: #6bed8d;
  }

  .unavailable {
    color : red;
    background-color: #ec9187;
  }
</style>