<template>
  <v-card outlined>
    <v-card-title>
      <span class="display-1">Histórico de envios</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-lookup"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="emailHistory"
      :loading="loading"
      loading-text="Loading... Please wait"
      :search="search"
    >
      <template v-slot:item.score="{ item }">
        <span v-text="`${item.score} PPM`" />
      </template>
      <template v-slot:item.success="{ item }">
        <v-icon
          :color="item.success ? 'green' : 'red'"
          v-text="item.success ? `mdi-check-circle` : `mdi-alert-circle`"
        />
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip right v-if="!item.success">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon
                color="primary"
                class="mr-2"
                @click="retryEmail(item)"
                v-text="'mdi-email-sync-outline'"
              />
            </v-btn>
          </template>
          <span>Enviar novamente</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-snackbar top color="success" v-model="snackbarSuccess">
      <span color="background">Email enviado com sucesso!</span>
    </v-snackbar>
    <v-snackbar top color="error" v-model="snackbarError">
      <span color="background">Email falhou! Verifique os dados!</span>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      snackbarSuccess: false,
      snackbarError: false,
      headers: [
        { text: "Nome", value: "name" },
        { text: "E-mail de contato", value: "email" },
        { text: "Resultado", value: "score" },
        { text: "Status de envio", value: "success" },
        { text: "Ações", value: "action" }
      ],
      emailHistory: [],
      loading: false
    };
  },
  created() {
    this.getEmailHistory();
  },
  methods: {
    async retryEmail(retryEmail) {
      try {
        await this.$put(`/mail/${retryEmail._id}`);
        let updatedWithSuccess = this.emailHistory.find(
          email => email._id === retryEmail._id
        );
        updatedWithSuccess.success = true;
        this.snackbarSuccess = true;
      } catch {
        this.snackbarError = true;
      }
    },
    async getEmailHistory() {
      let response = await this.$get("mail");
      this.emailHistory = response.email;
    }
  }
};
</script>