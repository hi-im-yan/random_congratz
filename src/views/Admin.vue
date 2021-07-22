<template>
  <div >
    <AdminLogin v-if="!logged"></AdminLogin>
    <Menu @clicked="clickedElementFromMenu" v-if="logged"></Menu>
    <AdminParabens v-if="selectedMenu == 1"></AdminParabens>
    <AdminCategorias v-if="selectedMenu == 2"></AdminCategorias>
  </div>
</template>

<script>
import Menu from '../components/Menu/Menu.vue'
import AdminParabens from '../components/AdminParabens/AdminParabens.vue'
import AdminCategorias from "../components/AdminCategorias/AdminCategorias.vue";
import AdminLogin from "../components/AdminLogin/AdminLogin.vue";

export default {
  name: "Admin",

  data: () => ({
    drawer: false,
    selectedMenu: -1,
    logged:false
  }),

  components: {
    Menu,
    AdminParabens,
    AdminCategorias,
    AdminLogin,
  },

  methods: {
    clickedElementFromMenu(menuIndex){
      this.selectedMenu = menuIndex
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>