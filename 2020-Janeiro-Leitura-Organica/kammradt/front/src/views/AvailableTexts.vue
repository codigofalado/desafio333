<template>
  <v-card outlined>
    <v-data-table
      :loading="loading"
      :headers="headers2"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <span class="display-1">Textos disponíveis</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                @click="setDefault"
                class="mb-2"
                large
                v-on="on"
                v-text="'Adicionar'"
              />
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field counter="150" v-model="editedItem.title" label="Title" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        auto-grow
                        clearable
                        v-model="editedItem.text"
                        :label="`Palavras: ${editedItem.text.split(' ').length}`"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="close" v-text="'Fechar'" />
                <v-btn text color="primary" @click="save" v-text="'Salvar'" />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn text>
          <v-icon color="info" @click="editItem(item)" v-text="'mdi-pencil'" />
        </v-btn>
        <v-btn text>
          <v-icon color="red" @click="deleteItem(item)" v-text="'mdi-delete'" />
        </v-btn>
      </template>
      <template v-slot:item.text="{ item }">
        <span v-text="`${item.text.substring(0, 100)} ...`" />
      </template>
    </v-data-table>
    <v-snackbar top color="success" v-model="snackbar">
      <span color="background" v-text="snackbarText" />
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "AvailableTexts",
  data: () => ({
    dialog: false,
    loading: false,
    snackbar: false,
    snackbarText: "",
    headers2: [
      { text: "Título", align: "left", value: "title" },
      { text: "Texto", value: "text" },
      { text: "Palavras", value: "size" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      text: ""
    },
    defaultItem: {
      title: "Meu título",
      text: "Meu texto"
    }
  }),
  computed: {
    formTitle() {
      return this.editedPIndex === -1 ? "Adicionar" : "Editar";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getAvailableTexts();
  },
  methods: {
    async getAvailableTexts() {
      let response = await this.$get("texts");
      this.desserts = response.text;
    },
    setDefault() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      await this.$delete(`texts/${item._id}`);
      this.snackbarText = "Texto deletado com sucesso!";
      this.snackbar = true;
      this.desserts = this.desserts.filter(text => text._id !== item._id);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        await this.$put(`/texts/${this.editedItem._id}`, this.editedItem);
        await this.getAvailableTexts();
      } else {
        let newText = await this.$post("/texts", this.editedItem);
        this.desserts.push(newText);
      }
      this.close();
    }
  }
};
</script>
