<template>
  <div>
    <v-app-bar
      color="primary accent-4"
      dense
      dark
    >
     <!-- <v-img src="../assets/img/unticket_logo-main.png"  min-height="40" min-width="110" ></v-img>-->
      <v-icon left>mdi-ticket-account</v-icon>
      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="mx-1">
        <span>Logout</span>
      <v-btn icon>
        <v-icon >mdi-forward</v-icon>
      </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
    name:'Navbar'
}
</script>
