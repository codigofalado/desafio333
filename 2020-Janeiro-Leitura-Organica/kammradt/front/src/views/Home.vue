<template>
  <v-app id="backgroud">
    <v-toolbar id="backgroud" flat>
      <v-spacer />
      <v-img class="mt-12" src="@/assets/leitura_organica.png" max-width="200px" />
      <v-spacer />
    </v-toolbar>
    <v-row justify="center">
      <v-col lg="6">
        <v-container>
          <div v-show="!mostrarTexto">
            <v-row>
              <v-spacer />
              <span
                class="hidden-xs-only text-center applicationTitleElse"
                v-text="'Sua leitura é orgânica?'"
              />
              <span
                class="hidden-sm-and-up text-center applicationTitleMobile"
                v-text="'Sua leitura é orgânica?'"
              />
              <!-- Verificar o text-wrap or align dele, não lembro -->
              <v-spacer />
            </v-row>
            <v-card-text
              class="hidden-xs-only grey--text text-justify applicationBodyElse"
              v-text="textLandingPage1"
            />
            <v-card-text
              class="hidden-sm-and-up grey--text text-justify applicationBodyMobile"
              v-text="textLandingPage1"
            />
            <v-card-text
              class="hidden-xs-only grey--text text-justify applicationBodyElse"
              v-text="textLandingPage2"
            />
            <v-card-text
              class="hidden-sm-and-up grey--text text-justify applicationBodyMobile"
              v-text="textLandingPage2"
            />
            <v-row>
              <v-spacer />
              <span
                class="hidden-xs-only text-center applicationSubElse mt-10"
                v-text="'Você já parou para calcular a sua velocidade de leitura?'"
              />
              <span
                class="hidden-sm-and-up text-center applicationSubMobile mt-10"
                v-text="'Você já parou para calcular a sua velocidade de leitura?'"
              />
              <v-spacer />
            </v-row>

            <v-btn dark class="darkBlue my-6" block @click="mostrarTexto = !mostrarTexto" x-large>
              <span class="applicationTitleMobile">Quero calcular!</span>
            </v-btn>
          </div>
          <v-tooltip v-if="mostrarTexto" bottom>
            <template v-slot:activator="{ on }">
              <v-btn  @click="mostrarTexto = !mostrarTexto" v-on="on" icon>
                <v-icon v-text="'mdi-arrow-left'" small />
              </v-btn>
            </template>
            <span v-text="'Retornar'"/>
          </v-tooltip>
          <v-scroll-x-transition>
            <ContadorDePalavras v-show="mostrarTexto" />
          </v-scroll-x-transition>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import ContadorDePalavras from "../components/ContadorDePalavras";

export default {
  data() {
    return {
      mostrarTexto: false,
      clickButton: "false",
      textLandingPage1:
        "Num mundo tão subjetivo quanto o da leitura, a velocidade de leitura é uma métrica objetiva que te permite saber como está a sua leitura nesse momento e te permite acompanhar a sua evolução!",
      textLandingPage2:
        "A medida mais utilizada para calcular a velocidade de leitura é Palavras por Minuto (PPM). Uma leitura em páginas por hora, por exemplo, não pode ser aplicada em qualquer livro (pois tem tamanhos diferentes de páginas), muito menos em artigos ou notícias. ",
      textLandingPage3: "Que tal descobrir agora a sua velocidade de leitura?"
    };
  },
  name: "App",
  components: {
    ContadorDePalavras
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");
.application {
  font-family: "Josefin Sans";
  font-size: 1.5rem;
}
.applicationTitleMobile {
  font-family: "Josefin Sans";
  font-size: 1.6rem;
}
.applicationTitleElse {
  font-family: "Josefin Sans";
  font-size: 3.85rem;
}
.applicationBodyMobile {
  font-size: 1rem;
}
.applicationBodyElse {
  font-size: 1.5rem;
  line-height: 28px;
}
.applicationSubMobile {
  font-family: "Josefin Sans";
  font-size: 1.2rem;
}
.applicationSubElse {
  font-family: "Josefin Sans";
  font-size: 2rem;
}
.applicationEmailMobile {
  font-family: "Josefin Sans";
  font-size: 2.5rem;
}
.applicationEmailElse {
  font-family: "Josefin Sans";
  font-size: 3.85rem;
}

</style>