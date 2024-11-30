<template>
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
            <div class="d-flex justify-center">
                <v-btn
                type="submit"
                >
                    Enviar
                </v-btn>
            </div>
        </form>
    </div>
</template>


<script>
    export default {
        props : ['id'],
        data() {
            return{
                ingrediente: { nome: '', quantidade : ''},
                regraQuantidade : [
                    v => !!v || 'Quantidade é obrigatória',
                    v => /^\d+$/.test(v) || "Quantidade deve ser um número"
                ]
            }
        }
    }

</script>