<template>
  <NavbarReceitas />
  <div class="d-flex justify-center ma-5">
      <h1>Lista de Receitas</h1>
  </div> 
  <div class="d-flex justify-center ma-5">
        <v-btn class="me-4" type="submit" @click="redirectCadastro()">Nova Receita</v-btn>
    </div>
  <div class="three-elements-per-row">
      <div 
        v-for="receita in receitas" 
        :key="receita.id" 
        class="border-md d-flex justify-center" 
        style="width: 70%; cursor: pointer;" 
        :class="[receita.available ? 'available' : 'unavailable']"
        @click="redirectCadastro(receita.id)">
          <h2 class="pa-1">{{ receita.nome }}</h2>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarReceitas from './NavbarReceitas.vue';

  export default {
      data() {
          return {
              receitas : []
          }
      },
      components : { NavbarReceitas },
      methods: {
        redirectCadastro(id) {
            this.$router.push({
                name: "cadastroReceitas",
                query : { id: id }
            })
        } 
    }, 
    mounted() { 
      axios({
            method: "get",
            url : "http://localhost:8080/receita/list"
        }).then(response => {
            this.receitas = response.data;
        })
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