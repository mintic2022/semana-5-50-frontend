<template>
  <v-card>
    <v-card flat>
      <v-data-table
        :headers="header"
        :items="desserts"
        item-key="name"
        class="elevation-1 pa-6"
        :loading ="loader"
         loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat>
              <v-toolbar-title>Servicios</v-toolbar-title>
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
                  Nuevo Servicio
                </v-btn>
              </template>
              <v-card max-width="600">
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
                          v-model="editedArticleItem.id"
                          label="Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedArticleItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedArticleItem.descripcion"
                          label="Descripción"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="editedArticleItem.codigo"
                          label="Código"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">

                        <v-select
                            v-model="category"
                            label="Categoría"
                            :items="categories"
                            item-text="nombre"
                            item-value="id"
                            return-object>
                        </v-select>
                        <!-- <v-text-field
                          v-model="editedArticleItem.categoriaId"
                          label="Categoría"
                        ></v-text-field> -->
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
  middleware: 'auth',
  data: () => ({
    header: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Código",
        align: "start",
        sortable: false,
        value: "codigo",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      {
        text: "Descripción",
        value: "descripcion",
        visibility: "hidden-xs-only",
      },
      {
        text: "Estado",
        value: "estado",
        visibility: "hidden-xs-only",
      },
      {
        text: "Categoría",
        align: "start",
        sortable: false,
        value: "categoria.nombre",
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
    category: "",
    categories: [],
    editedIndex: -1,
    defaultItem: {
      id: 0,
      codigo: "",
      nombre: "",
      descripcion: "",
      estado: 0,
      photo: "",  
      categoriaId: 0,    
      categoria:{
          id:0,
          nombre:""
      }
    },
    editedArticleItem: {
      id: 0,
      codigo: "",
      nombre: "",
      descripcion: "",
      estado: 0,
      photo: "",  
      categoriaId: 0,   
      categoria:{
          id:0,
          nombre:""
      }
    },
    researchers: ["Servicios"],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Servicio" : "Editar Servicio";
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.desserts = await this.getArticles()
      this.categories = await this.getCategories()     
    },

    editItem(item) {
      this.editedIndex = item.id
      this.category = item? item.categoria : ''
      this.editedArticleItem = Object.assign({}, item)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedArticleItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1                
        this.category=""
      });
    },
    nameFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.dessertFilterValue) {
        return true;
      }

      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value
        .toLowerCase()
        .includes(this.dessertFilterValue.toLowerCase())
    },

    linesFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.linesFilterValue) {
        return true;
      }
      return value.toLowerCase().includes(this.linesFilterValue.toLowerCase());
    },

    async getArticles() {
      let articles = await this.$axios.get("/articulo/list")     
      return articles.data
    },

    async getCategories() {

        try {
            let categories = await this.$axios.get("/categoria/list")   
            this.loader=false   
            return categories.data
            
        } catch (error) {
            return error
        }

    
     
    },


    async guardar() {
      if (this.editedIndex > -1) {
        //put
        try {
          let response = await this.$axios.put("/articulo/update", {
            nombre: this.editedArticleItem.nombre,
            descripcion: this.editedArticleItem.descripcion,
            id: this.editedArticleItem.id,
            codigo: this.editedArticleItem.codigo,
            estado: this.editedArticleItem.estado,
            photo: this.editedArticleItem.photo,
            categoriaId: this.category.id
          });
          this.initialize();
          console.log(response);
        } catch (error) {
          return error;
        }
      } else {
        //post
        this.$axios
          .post("/articulo/add", {
            nombre: this.editedArticleItem.nombre,
            descripcion: this.editedArticleItem.descripcion,
            codigo: this.editedArticleItem.codigo,
            estado: this.editedArticleItem.estado,
            photo: this.editedArticleItem.photo,
            categoriaId: this.category.id
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
      this.dialogDelete = false
      this.dialog = false     
      this.$nextTick(() => {
        this.editedArticleItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      });
    },
    async changeStatusConfirm() {
      if (this.editedArticleItem.estado === 1) {
        try {
          let response = await this.$axios.put("/articulo/deactivate", {
            id: this.editedArticleItem.id,
          });
          this.initialize();
        } catch (error) {
          return error;
        }
      } else {
        this.$axios
          .put("/articulo/activate", {
            id: this.editedArticleItem.id,
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
      this.editedArticleItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
  },
};
</script>