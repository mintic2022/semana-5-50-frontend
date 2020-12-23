<template>
  <v-card>
    <v-card flat>
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        class="elevation-1 pa-6"
        :loading ="loader"
         loading-text="Loading... Please wait"
      >
      <template v-slot:item.estado="{ item }">
        <v-chip
          :color="getColor(item.estado)"
          dark
        >
          {{ item.estado }}
        </v-chip>
      </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical>
              
            </v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Usuario
                </v-btn>
              </template>
              <v-card max-width="600" >
                <!-- <v-img
                    height="500"
                    :src="`../photos/${editedItem.photo}`"
                    :retain-focus="false"
                  ></v-img> -->
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedUserItem.rol"
                          label="Rol"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedUserItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedUserItem.email"
                          label="emal"
                        ></v-text-field>
                      </v-col>                     
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedUserItem.password"
                          label="Password"
                        ></v-text-field>
                      </v-col>                    
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="guardar">
                    Guardar
                  </v-btn>

                  <v-btn color="blue darken-1" text @click="close"
                    >Cerrar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to change this item status?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeChangeStatus"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="changeStatusConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium @click="changeStatus(item)">
            <template v-if="item.estado"> mdi-toggle-switch </template>

            <template v-else> mdi-toggle-switch-off-outline </template>
          </v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>

export default {  
  middleware: ['auth'],
  data: () => ({
    
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      {
        text: "Rol",
        align: "start",
        sortable: false,
        value: "rol",
      },
      {
        text: "email",
        value: "email",
        visibility: "hidden-xs-only",
      },
      {
        text: "Estado",
        value: "estado",
        visibility: "hidden-xs-only",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    loader: true,
    dialogDelete: false,
    dessertFilterValue: "",
    linesFilterValue: "",
    dialog: false,
    currentItem: "tab-Web",
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      id: 0,
      nombre: "",
      rol: "",
      estado: 0,
      email: "", 
      password: ""
          
    } ,
    editedUserItem: {
      id: 0,
      nombre: "",
      rol: "",
      estado: 0,
      email: "", 
      password: ""
          
    }    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    getColor (estado) {
        if (estado == 1) return 'blue'        
        else return 'red'
    },
    async initialize() {
      let usuario = await this.getusuario();
      this.desserts = usuario;
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.editedUserItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.$nextTick(() => {
        this.editedUserItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedUserItem = "";
        this.dialog = false;
      });
    },
    // nameFilter(value) {
    //   // If this filter has no value we just skip the entire filter.
    //   if (!this.dessertFilterValue) {
    //     return true;
    //   }

    //   // Check if the current loop value (The dessert name)
    //   // partially contains the searched word.
    //   return value
    //     .toLowerCase()
    //     .includes(this.dessertFilterValue.toLowerCase());
    // },

    linesFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.linesFilterValue) {
        return true;
      }
      return value.toLowerCase().includes(this.linesFilterValue.toLowerCase());
    },
    async getusuario() {

      try {
        let usuario = await this.$axios.get("/usuario/list");
        this.loader=false;
        return usuario.data;
        
      } catch (error) {
        return error;
      }
    },
    async guardar() {
      if (this.editedIndex > -1) {
        //put
        try {
          let response = await this.$axios.put("/usuario/update", {
            "nombre": this.editedUserItem.nombre,
            "password": this.editedUserItem.password,
            "id": this.editedUserItem.id,  
            "email": this.editedUserItem.email,  
            "rol" : this.editedUserItem.rol    
          })
          this.initialize();
          console.log(response)
              
        } catch (error) {
          return error;
        }
      } else {
        //post
        this.$axios
          .post("/usuario/add",{
            "nombre": this.editedUserItem.nombre,
            "password": this.editedUserItem.password,    
            "email": this.editedUserItem.email,
            "rol" : this.editedUserItem.rol,
            "estado":"0"
          })
          .then((response) => {
            this.initialize();
          })
          .catch((error) => {
            return error;
          });
      }
      this.close();
    },
    closeChangeStatus() {
      this.dialogDelete = false;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async changeStatusConfirm() {
      if (this.editedUserItem.estado === 1) {
        try {
          let response = await this.$axios.put("/usuario/deactivate", {
            id: this.editedUserItem.id,
          });
          this.initialize();
        } catch (error) {
          return error;
        }
      } else {
        this.$axios
          .put("/usuario/activate", {
            id: this.editedUserItem.id,
          })
          .then((response) => {
            this.initialize();
          })
          .catch((error) => {
            return error;
          });
      }

      this.closeChangeStatus();
    },

    changeStatus(item) {
      this.editedIndex = item.id;
      this.editedUserItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
  },
};
</script>