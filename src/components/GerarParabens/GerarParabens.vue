<template>
  <v-container  pa-12>

    <v-row>
      <v-col cols="6">
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
            v-model="categoria"
            clearable
            persistent-placeholder
        ></v-combobox>
        <v-text-field
            label="Dedicatória"
            placeholder="Para quem?"
            v-model="nome"
            color="purple"
            outlined
        ></v-text-field>
        <v-btn
            color="purple lighten-2"
            outlined
            @click="getFrase()"
        >Gerar Frase</v-btn>
        <v-btn
            class="ml-16"
            color="purple lighten-2"
            outlined
            @click="copiarParaTeclado()"
        >Copiar</v-btn>
      </v-col>

      <v-col cols="6">
        <v-textarea
            outlined
            label="Texto de Parabéns"
            v-model="parabens"
            hint="Quando clicar no botão Gerar Frase, o texto já vai estar copiado."
            color="purple"
            v-on:change="copiarParaTeclado()"
            id="textToCopy"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-img src="congratz.png" alt="" :readonly="true" position="absolute"/>
  </v-container>
</template>

<script>
  import GerarParabensScript from "./GerarParabens-script";

  export default {
    name: 'GerarParabens',

    data: () => ({
      datasComemorativas: [],
      parabens: "",
      nome: "",
      categoria: ""
    }),

    methods: {
      getFrase(){
        const api = new GerarParabensScript();
        api.getFrase(this.nome, this.categoria.id)
            .then(res => {this.parabens = res.data.message;})
      },

      copiarParaTeclado(){
        const copyText = document.getElementById("textToCopy");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
      }
    },

    beforeMount() {
      this.$nextTick(function () {
        const api = new GerarParabensScript();
        api.getCategorias()
            .then(res => {this.datasComemorativas = res.data})
      })
    },
  }
</script>
