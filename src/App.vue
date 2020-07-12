<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2>The List</h2>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NewItemDialog from "./components/NewItemDialog.vue";
import TList from "./components/TList.vue";
import ListStore from "./store/ListStore";
import { getModule } from "vuex-module-decorators";

@Component
export default class App extends Vue {
}
</script>
