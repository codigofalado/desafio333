<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style >
#app {
  background-color: #fbf8f2;
}
</style>