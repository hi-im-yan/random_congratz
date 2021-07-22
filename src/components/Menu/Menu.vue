<template>
  <div>
    <v-toolbar
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Admin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawer"
        absolute
        temporary
    >
      <v-list>
        <v-list-item
            v-for="([icon, text], i) in items"
            :key="i"
            link
            @click="sendToParent(i)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Menu",

  data: () => ({
    items: [
      ['mdi-view-dashboard', 'Dashboard'],
      ['mdi-message-bulleted', 'Frases'],
      ['mdi-shape', 'Categorias'],
      ['mdi-account-group', 'Usuários'],
    ],
    drawer: false
  }),

  methods: {
    sendToParent(value){
      this.drawer = false
      this.$emit('clicked', value)
    }
  }
}
</script>

<style scoped>

</style>