<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app class="background">
      <v-list dense nav>
        <v-list-item
          outlined
          link
          v-for="item in drawerItens"
          :key="item.text"
          router
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon color="primary" v-text="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="background" />
      <v-toolbar-title class="text-uppercase background--text">
        <span class="font-weight-light" v-text="`Leitura `" />
        <span v-text="`Orgânica`" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab small text :to="{name: 'Dashboard'}">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn text @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    drawerItens: [
      {
        text: "Histórico de E-mail",
        icon: "mdi-email",
        link: { name: "EmailHistory" }
      },
      {
        text: "Textos disponíveis",
        icon: "mdi-text",
        link: { name: "AvailableTexts" }
      }
    ]
  }),
  methods: {
    async logout() {
      try {
        await this.$post("/user/logout");
        localStorage.setItem('token', '')
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style>
</style>