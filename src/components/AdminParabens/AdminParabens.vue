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
          :items="mensagens"
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
          <v-combobox
              append-inner-icon
              color="purple"
              outlined
              label="Selecione um evento para comemorar!"
              placeholder="O que vamos comemorar?"
              :items="datasComemorativas"
              item-text="nome"
              item-value="id"
              item-color="purple"
              v-model="editedItem.categoria"
              clearable
              persistent-placeholder
          ></v-combobox>
          <v-textarea
              outlined
              label="Texto de Parabéns"
              v-model="editedItem.message"
              color="purple"
          ></v-textarea>
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
          {{editedItem}}
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
          Adição de Item
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
          <v-combobox
              append-inner-icon
              color="purple"
              outlined
              label="Categoria"
              :items="datasComemorativas"
              item-text="nome"
              item-value="id"
              item-color="purple"
              v-model="newItem.categoria"
              clearable
          ></v-combobox>
          <v-textarea
              outlined
              label="Texto de Parabéns"
              v-model="newItem.message"
              color="purple"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="purple"
              fill
              dark
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
import AdminParabensScript from "./AdminParabens-script";

export default {
  name: "AdminParabens",

  data: () => ({
    datasComemorativas: [],
    mensagens: [],
    tableHeader: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Frase',
        value: 'message'
      },
      {
        text: 'Categoria',
        value: 'categoria',
        sortable: true
      },
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    newItem: {
      message: '',
      categoria: ''
    },
    editedItem: {
      id: '',
      message: '',
      categoria: ''
    },
    dialogNew: false,
    dialogEdit: false,
    dialogDelete: false
  }),

  methods: {
    editItem(item) {
      this.editedItem.id = item.id
      this.editedItem.message = item.message
      this.dialogEdit = true

    },
    deleteItem(item) {
      this.editedItem.id = item.id
      this.editedItem.message = item.message
      this.dialogDelete = true
    },
    createItem(){
      console.log(this.newItem)
    }
  },

  created() {
    this.$nextTick(function () {
      const api = new AdminParabensScript();
      api.getCategorias()
          .then(res => {
            this.datasComemorativas = res.data
          })

      api.getMensagens()
          .then(res => {
            this.mensagens = res.data
          })
    })
  },
}
</script>

<style scoped>

</style>