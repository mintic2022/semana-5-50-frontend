
<template>
 
    <v-navigation-drawer
      v-model="drawer"      
      permanent
      v-if="isAuthenticated"
    >
      
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="images/logo.png" contain></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Grupo-50</v-list-item-title>
<!-- 
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(item, j) in items" :key="j" :to="item.link"         
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   
    </v-navigation-drawer>
    
 
</template>


<script>
import { mapGetters } from 'vuex'
  export default {
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
    data () {
      return {
        drawer: true,
        items: [                
        { title: "Inicio", icon: "mdi-home", link: "/" },
         { title: "Perfil", icon: "mdi-account", link: "profile" },   
        { title: "Servicios", icon: "mdi-pencil", link: "servicios" },
        { title: "Categorías", icon: "mdi-group", link: "categorias" },         
        { title: "Usuarios", icon: "mdi-account-multiple", link: "usuarios" }
        
        ],
        mini: true,
      }
    },
  }
</script>
