<template>
  <div>
    <v-container pa-12>
      <v-toolbar
          color="deep-purple lighten-4"
          dense
      >
        <v-spacer></v-spacer>
        <v-btn
            icon
            color="purple accent-4"
            @click="dialogNew = !dialogNew"
        >
          <v-icon
              large
          >
            mdi-plus-box
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="tableHeader"
          :items="categorias"
          class="elevation-2"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item);"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-container>
    <v-dialog
        v-model="dialogEdit"
        width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edição de Item
          <v-spacer></v-spacer>
          <v-btn
              icon
              color="red"
              large
              @click="dialogEdit = !dialogEdit">
            <v-icon>mdi-close-box</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-9">
          <v-btn disabled>id: {{ editedItem.id }}</v-btn>
          <v-divider class="ma-4"></v-divider>
          <v-text-field
              outlined
              label="Editar Categoria"
              v-model="editedItem.nome"
              color="purple"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="purple"
              fill
              dark
              @click="dialogEdit = false"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialogDelete"
        width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Deletação de Item
          <v-spacer></v-spacer>
          <v-btn
              icon
              color="red"
              large
              @click="dialogDelete = !dialogDelete">
            <v-icon>mdi-close-box</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-9">
          <p>Deletar o item:</p>
          <v-btn disabled>id: {{editedItem.id}}</v-btn>
          <br><br>
          <v-btn disabled>categoria: {{editedItem.nome}}</v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="purple"
              dark
              fill
              @click="dialogDelete = false"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialogNew"
        width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Adição de Categoria
          <v-spacer></v-spacer>
          <v-btn
              icon
              color="red"
              large
              @click="dialogNew = !dialogNew">
            <v-icon>mdi-close-box</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-9">
          <v-text-field
              outlined
              label="Nova Categoria"
              color="purple"
              v-model="newItem"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="purple"
              dark
              fill
              @click="createItem()"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import AdminCategorias from "./AdminCategorias-script";

export default {
  name: "AdminCategorias",

  data: () => ({
    categorias: [],
    tableHeader: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Categoria',
        value: 'nome',
        sortable: true
      },
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    newItem: '',
    editedItem: {
      id: '',
      nome: ''
    },
    dialogNew: false,
    dialogEdit: false,
    dialogDelete: false
  }),

  methods: {
    editItem(item) {
      this.editedItem.id = item.id
      this.editedItem.nome = item.nome
      this.dialogEdit = true

    },
    deleteItem(item) {
      this.editedItem.id = item.id
      this.editedItem.nome = item.nome
      this.dialogDelete = true
    },
    createItem(){
      console.log(this.newItem)
      this.dialogNew = false
    }
  },

  created() {
    this.$nextTick(function () {
      const api = new AdminCategorias();
      api.getCategorias()
          .then(res => {
            this.categorias = res.data
          })

    })
  },
}
</script>

<style scoped>

</style>