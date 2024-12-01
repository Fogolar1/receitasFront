<template>
    <v-navigation-drawer v-model="sidebar" app>
        <v-list>
            <v-list-tile 
                v-for="item in menuItems"
                :key="item.titulo"
                :to="item.path">
                <v-list-tile-content>
                    {{ item.titulo }}
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
        <span class="hidden-sm-and-up">
            <v-toolbar-side-icon @click="sidebar = !sidebar">
            </v-toolbar-side-icon>
        </span>
        <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer; text-decoration: none; color: white;">Site Receitas</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn
                flat
                v-for="item in menuItems"
                :key="item.titulo"
                :to="item.path">
                {{ item.titulo }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

export default {
    data() {
        return {
            sidebar : false,
            menuItems : [
                { titulo : 'Receitas', path : '/receitas'},
                { titulo : 'Ingredientes', path : '/ingredientes'}
            ]
        }
    }
}

</script>