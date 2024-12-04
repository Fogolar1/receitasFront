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
                class="ma-5"
                >
                    Enviar
                </v-btn>
                <v-btn
                @click="deletar()"
                class="ma-5"
                v-if="this.receita.id"
                >
                    Deletar Receita
                </v-btn>
                <v-btn
                @click="fazerReceita()"
                class="ma-5"
                v-if="this.receita.id"
                >
                    Fazer Receita
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
            this.setup();
        },
        methods : {
            setup(id){
                axios({
                    method: "get",
                    url : "http://localhost:8080/ingrediente/list"
                }).then(response => {
                    this.ingredientes = response.data;
                })

                if(!id){
                    const route = useRoute();
                    id = route.query.id
                }
                     
                if(id) {
                    axios({
                        method: "get",
                        url : "http://localhost:8080/receita/" + id
                    }).then(response => {
                        this.receita = response.data;
                        console.log(response.data.ingredientes.length)
                        for(let i = 0; i < response.data.ingredientes.length; i++){
                            this.possuiIngrediente(response.data.ingredientes[i]);
                        }
                    })
                }
            },
            adicionarIngrediente(){
                this.receita.ingredientes.push({ nome : ''});
            },
            removerIngrediente() {
                if (this.receita.ingredientes.length == 1) return;

                this.receita.ingredientes.pop();
            },
            enviar(){
                if(this.receita.nome === ''){
                    alert("Nome deve ser preenchido");
                    return;
                }
                if(this.receita.procedimento === ''){
                    alert("Procedimento deve ser preenchido");
                    return;
                }
                for(let i = 0; i < this.receita.ingredientes.length; i++){
                    if(!this.receita.ingredientes[i].ingredienteId){
                        alert("Ingrediente " + i + 1 + " deve ser preenchido");
                        return;
                    }
                    if(!this.receita.ingredientes[i].quantidade){
                        alert("Quantidade do ingrediente " + i + 1 + " deve ser preenchida");
                        return;
                    }
                }

                axios.post("http://localhost:8080/receita/save", this.receita)
                .then(() => {
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
            },
            deletar(){
                if(confirm("Deletar Receita? (Essa ação não pode ser revertida)"))
                axios.delete("http://localhost:8080/receita/" + this.receita.id)
                .then(() => {
                    this.$router.push({
                        path : '/receitas'
                    })
                });
            },
            fazerReceita(){
                for(let i = 0; i < this.receita.ingredientes.length; i++){
                    if(!this.receita.ingredientes[i].possui){
                        alert("Não é possível fazer a receita (Ingredientes insuficientes)");
                        return;
                    }
                }
                if(confirm("Deseja fazer a receita? (As quantidades de ingrediente serão diminúidas)")){
                    axios.post("http://localhost:8080/receita/fazer/" + this.receita.id)
                    .then(() => {
                        alert("Receita feita com sucesso");
                        this.setup(this.receita.id);
                    })
                    .catch(function(error){
                        alert(error.message);
                    })
                }
            }
        }
    }
</script>