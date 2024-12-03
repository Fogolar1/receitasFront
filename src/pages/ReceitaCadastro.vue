<template>
    <NavbarReceitas />
    <div class="d-flex justify-center ma-5">
        <h1>Cadastro de receita</h1>
    </div>
    <div class="d-flex justify-center">
        <form @submit.prevent="submit" style="width: 40%;">
            <v-text-field 
                v-model="receita.nome"
                label="Nome da receita"
                :rules="[v => !!v || 'Nome é obrigatório']"
            ></v-text-field>
            <v-row v-for="ingredienteReceita in receita.ingredientes" class="row">
                <v-col>
                    <v-select
                        :items="this.ingredientes"
                        item-title="nome"
                        item-value="id"
                        label="Ingrediente"
                        v-model="ingredienteReceita.ingredienteId"
                        :rules="[v => !!v || 'Ingrediente é obrigatório']"
                        @change="possuiIngrediente(ingredienteReceita)"
                    >
                    <template v-slot:item="{ props, item}">
                        <v-list-item v-bind="props" :subtitle="item.raw.unidade"></v-list-item>
                    </template>
                </v-select>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="ingredienteReceita.quantidade"
                        label="Quantidade"
                        :rules="[v => !!v || 'Quantidade é obrigatória']"
                        @change="possuiIngrediente(ingredienteReceita)"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <template v-if="ingredienteReceita.possui">
                        <p>Possui ingrediente</p>
                    </template>
                    <template v-else>
                        <p>Não possui ingrediente</p>
                    </template>
                </v-col>
            </v-row>
            <div class="d-flex justify-center pa-2">
                <v-btn class="ma-3" @click="adicionarIngrediente()">Adicionar Ingrediente</v-btn>
                <v-btn class="ma-3" @click="removerIngrediente()">Remover Ingrediente</v-btn>
            </div>
            <v-textarea
                v-model="receita.procedimento"
                label="Procedimento"
                :rules="[v => !!v || 'Procedimento é obrigatório']"
            ></v-textarea>
            <div class="d-flex justify-center">
                <v-btn
                type="submit"
                @click="enviar()"
                >
                    Enviar
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script>
    import NavbarReceitas from './NavbarReceitas.vue';
    import { useRoute } from 'vue-router'
    import axios from 'axios';

    export default {
        props : ['id'],
        data() {
            return{
                receita: { nome: '', procedimento : '', id : undefined, ingredientes : [{ nome : ''}]},
                ingredientes : []
            }
        },
        components: {NavbarReceitas},
        mounted(){
            axios({
                    method: "get",
                    url : "http://localhost:8080/ingrediente/list"
                }).then(response => {
                    this.ingredientes = response.data;
                })

            const route = useRoute();
            if(route.query.id) {
                axios({
                    method: "get",
                    url : "http://localhost:8080/receita/" + route.query.id
                }).then(response => {
                    this.receita = response.data;
                    console.log(response.data.ingredientes.length)
                    for(let i = 0; i < response.data.ingredientes.length; i++){
                        this.possuiIngrediente(response.data.ingredientes[i]);
                    }
                })
            }
        },
        methods : {
            adicionarIngrediente(){
                this.receita.ingredientes.push({ nome : ''});
            },
            removerIngrediente() {
                if (this.receita.ingredientes.length == 1) return;

                this.receita.ingredientes.pop();
            },
            enviar(){
                axios.post("http://localhost:8080/receita/save", this.receita)
                .then(response => {
                    this.$router.push({
                        path : '/receitas'
                    })
                })
            },
            possuiIngrediente(ingredienteReceita){
                ingredienteReceita.possui = false;
                if(!ingredienteReceita.ingredienteId)
                    return;

                var ingredienteSelecionado = this.ingredientes.filter(function(ingrediente){ 
                    return ingrediente.id == ingredienteReceita.ingredienteId;
                });

                if(!ingredienteSelecionado[0])
                    return;

                if (ingredienteSelecionado[0].quantidade < ingredienteReceita.quantidade)
                    return;

                ingredienteReceita.possui = true;
                return;
            }
        }
    }
</script>