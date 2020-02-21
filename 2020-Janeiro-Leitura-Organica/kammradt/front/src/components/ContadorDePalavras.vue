<template>
  <v-container class="mb-12">
    <v-card shaped>
      <v-tooltip right v-if="showBtnStart">
        <template v-slot:activator="{ on }">
          <v-btn @click="startTime" color="#baa284" dark right top absolute v-on="on" fab depressed>
            <v-icon color="#faf8f2" v-text="'mdi-play'" large />
          </v-btn>
        </template>
        <span>Iniciar</span>
      </v-tooltip>

      <v-tooltip right v-if="showBtnStop">
        <template v-slot:activator="{ on }">
          <v-btn
            @click="stopTimer"
            color="greyColor"
            dark
            right
            top
            absolute
            v-on="on"
            fab
            depressed
          >
            <v-icon color="#faf8f2" v-text="'mdi-pause'" large />
          </v-btn>
        </template>
        <span>Pausar</span>
      </v-tooltip>

      <v-tooltip v-if="showBtnRet" right>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="keepGoing"
            color="brownColor"
            dark
            right
            top
            absolute
            v-on="on"
            fab
            depressed
          >
            <v-icon color="#faf8f2" v-text="'mdi-play'" large />
          </v-btn>
        </template>
        <span>Retornar</span>
      </v-tooltip>

      <v-card-text
        v-blur="isBlurred"
        class="display-2 mt-5 text-center black--text"
        oncopy="return false"
        oncut="return false"
        onpaste="return false"
        v-if="title"
        v-text="title"
      />
      <v-card-text
        oncopy="return false"
        oncut="return false"
        onpaste="return false"
        v-blur="isBlurred"
        class="text-justify black--text"
        v-text="text"
      />

      <v-card shaped flat>
        <v-card-text></v-card-text>
        <v-tooltip right v-if="showBtnEnd">
          <template v-slot:activator="{ on }">
            <v-btn
              @click="inputEmail"
              color="darkColor"
              dark
              right
              bottom
              absolute
              v-on="on"
              fab
              depressed
            >
              <v-icon color="#faf8f2" v-text="'mdi-stop'" large />
            </v-btn>
          </template>
          <span>Finalizar</span>
        </v-tooltip>
        {{error}}
      </v-card>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="2000">
      Email enviado
      <v-btn color="blue" text @click="snackbar=false">Fechar</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="clearColor">
        <v-form v-model="valid">
          <div
            class="hidden-xs-only text-center applicationEmailElse darkBlue--text"
            v-text="'Teste finalizado!'"
          />
          <div
            class="hidden-sm-and-up text-center applicationEmailMobile darkBlue--text"
            v-text="'Teste finalizado!'"
          />
          <v-card-text>
            <p
              class="hidden-xs-only text-center title applicationSubElse"
              v-text="'Deseja receber seu incrível resultado por e-mail?'"
            />
            <p
              class="hidden-sm-and-up text-center title applicationSubMobile"
              v-text="'Deseja receber seu incrível resultado por e-mail?'"
            />
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-if="showData"
                  v-model="name"
                  :rules="nameRules"
                  label="Nome"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-if="showData"
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <!-- botar  cor certa nisso !!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="white" @click="finishTest" v-on="on">
                      <v-icon v-text="'mdi-replay'" />
                    </v-btn>
                  </template>
                  <span>Refazer teste</span>
                </v-tooltip>
              </v-col>
              <v-col cols="10">
                <v-btn
                  :disabled="!valid || loading"
                  dark
                  :loading="loading"
                  color="darkBlue"
                  @click="saveData"
                  v-text="'Enviar'"
                  block
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card-actions>
                  <v-spacer />
                  <a
                    :href="`https://www.facebook.com/share.php?u=${source}&quote=${textResult}`"
                    rel="noopener"
                    target="_blank"
                    class="ma-4"
                  >
                    <v-icon color="#3b5998" large v-text="'mdi-facebook'" />
                  </a>

                  <a
                    :href="`https://www.linkedin.com/shareArticle?url=${source}&title=Fiz+um+teste+de+leitura!`"
                    rel="noopener"
                    target="_blank"
                    class="ma-4"
                  >
                    <v-icon color="#0e76a8 " large v-text="'mdi-linkedin'" />
                  </a>

                  <a
                    :href="`https://twitter.com/intent/tweet?text=${textResult}&url=${source}`"
                    rel="noopener"
                    target="_blank"
                    class="ma-4"
                  >
                    <v-icon color="#00acee" large v-text="'mdi-twitter'" />
                  </a>
                  <v-spacer />
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      source: "https://leitura-organica.now.sh",
      textResult: "",
      loading: false,
      snackbar: false,
      isBlurred: true,
      dialog: false,
      hover: false,
      valid: false,
      readingTime: 0,
      id: 0,
      showBtnStart: true,
      showData: true,
      error: "",
      showBtnRet: false,
      showBtnStop: false,
      showBtnEnd: false,
      timeout: 2000,
      email: "",
      name: "",
      text: "",
      size: 0,
      title: "",
      nameRules: [v => !!v || "O nome é obrigatório"],
      emailRules: [
        v => !!v || "O e-mail é obrigatório",
        v => /.+@.+/.test(v) || "E-mail inválido"
      ]
    };
  },
  methods: {
    startTime() {
      this.readingTime = 0;
      this.showBtnStart = false;
      this.showBtnStop = true;
      this.showData = false;
      this.isBlurred = false;
      this.id = setInterval(() => {
        this.readingTime++;
      }, 1000);
    },
    keepGoing() {
      this.isBlurred = false;
      this.showBtnStop = true;
      this.showBtnEnd = false;
      this.showBtnRet = false;
      this.id = setInterval(() => {
        this.readingTime++;
      }, 1000);
    },
    stopTimer() {
      this.snackbarStop = true;
      this.showBtnStop = false;
      this.showData = false;
      this.showBtnRet = true;
      this.showBtnEnd = true;
      this.isBlurred = true;
      clearInterval(this.id);
    },
    inputEmail() {
      this.dialog = true;
      this.showData = true;
      this.showBtnRet = false;
      this.showBtnEnd = false;
      this.showBtnStart = true;
      this.textResult = `Meu resultado foi ${Math.trunc(
        (this.size / this.readingTime) * 60
      )}/PPM no teste de leitura! Faça o teste também!`;
    },
    finishTest() {
      clearInterval(this.id);
      this.dialog = false;
      this.readingTime = 0;
      this.name = "";
      this.email = "";
      this.isBlurred = true;
      this.loading = false;
    },
    saveData() {
      this.loading = true;
      let postBody = {
        name: this.name,
        email: this.email,
        score: Math.trunc((this.size / this.readingTime) * 60)
      };
      axios.post("https://leitura-organica-api.herokuapp.com/mail", postBody).then(() => {
        this.snackbar = true;
        this.finishTest();
      });
    }
  },
  mounted() {
    axios.get("https://leitura-organica-api.herokuapp.com/texts-random").then(response => {
      this.text = response.data.text;
      this.title = response.data.title;
      this.size = response.data.size;
    });
  }
};
</script>

<style>
#backgroud {
  background-color: #faf8f2;
}
.mainColor {
  color: #1a1d1f;
}
a:hover,
a:visited,
a:link,
a:active {
  color: #ffffff;
  text-decoration: none;
}
</style>
