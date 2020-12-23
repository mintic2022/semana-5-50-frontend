<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Nuxt Auth</nuxt-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="isAuthenticated">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              My Account
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/myprofile">Mi Perfil</nuxt-link>
              <hr class="navbar-divider"/>
              <a class="navbar-item" @click="logout">Salir</a>
            </div>
          </div>
          </template>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">Registrar</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Ingresar</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    } , 
},
}
</script>