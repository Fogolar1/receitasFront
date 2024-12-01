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
            <v-textarea
                v-model="receita.procedimento"
                label="Procedimento"
                :rules="[v => !!v || 'Procedimento é obrigatório']"
            ></v-textarea>
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
    import NavbarReceitas from './NavbarReceitas.vue';

    export default {
        props : ['id'],
        data() {
            return{
                receita: { nome: '', procedimento : '', ingredientes : {}},
            }
        },
        components: {NavbarReceitas}
    }
</script>