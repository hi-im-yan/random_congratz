<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <Footer v-if="this.$route.name != 'Admin'"></Footer>
  </v-app>
</template>
<script>
  import Footer from './components/Footer/Footer'
  export default {
    components: {
      Footer
    }
  }

</script>
<style>
</style>
