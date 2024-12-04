<template>
    <NavbarReceitas />
    <div class="d-flex justify-center ma-5">
        <h1>Cadastro de ingrediente</h1>
    </div>
    <div class="d-flex justify-center">
        <form @submit.prevent="submit" style="width: 40%;">
            <v-text-field 
                v-model="ingrediente.nome"
                label="Nome do ingrediente"
                :rules="[v => !!v || 'Nome é obrigatório']"
            ></v-text-field>
            <v-text-field
                v-model="ingrediente.quantidade"
                label="Quantidade do ingrediente"
                :rules="regraQuantidade"
            ></v-text-field>
            <v-select
                v-model="ingrediente.unidade"
                :items="this.unidades"
                label="Unidade"
            ></v-select>
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
    import axios from 'axios';
    import { useRoute } from 'vue-router'

    export default {
        data() {
            return{
                ingrediente: { nome: '', quantidade : '', unidade : '', id : undefined},
                regraQuantidade : [
                    v => !!v || 'Quantidade é obrigatória',
                    v => /^\d+$/.test(v) || "Quantidade deve ser um número"
                ],
                unidades : []
            }
        },
        components : { NavbarReceitas },
        mounted(){
            axios({
                    method: "get",
                    url : "http://localhost:8080/ingrediente/unidades"
                }).then(response => {
                    this.unidades = response.data;
                })
            
            const route = useRoute();
            if(route.query.id) {
                axios({
                    method: "get",
                    url : "http://localhost:8080/ingrediente/" + route.query.id
                }).then(response => {
                    this.ingrediente = response.data;
                })
            }
        },
        methods: {
            enviar(){

                if(this.ingrediente.nome === ''){
                    alert("Nome deve ser preenchido");
                    return;
                }
                if(this.ingrediente.quantidade === ''){
                    alert("Quantidade deve ser preenchida");
                    return;
                }
                if(this.ingrediente.unidade === ''){
                    alert("Unidade deve ser preenchida");
                    return;
                }
                    
                axios.post("http://localhost:8080/ingrediente/save", this.ingrediente)
                .then(response => {
                    this.$router.push({
                       path : '/ingredientes'
                    })
                })
            }
        }
    }

</script>