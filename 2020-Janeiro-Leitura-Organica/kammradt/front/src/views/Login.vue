<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          {{error}}
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Eai, beleza?</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large color="red" v-on="on">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </template>
              <span>Com amor :)</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginData.email"
                label="Email"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="loginData.password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      error: null,
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$post("/user/login", this.loginData);
        localStorage.setItem('token', response.token)
        this.$router.push({name: 'Dashboard'})
      } catch (error) {
        this.error = error.error;
      }
    }
  }
};
</script>