
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import Receitas from "../pages/Receitas.vue"
import Ingredientes from "../pages/Ingredientes.vue"
import IngredienteCadastro from '@/pages/IngredienteCadastro.vue'
import ReceitaCadastro from '@/pages/ReceitaCadastro.vue'
import { components } from 'vuetify/dist/vuetify.js'

const routes = [
  { path : "/receitas", component: Receitas},
  { path : "/ingredientes", component: Ingredientes},
  { path : "/ingredientes/cadastro", component: IngredienteCadastro, name: "cadastroIngredientes", props : true },
  { path : "/receitas/cadastro", component: ReceitaCadastro, name: "cadastroReceitas", props: true}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
