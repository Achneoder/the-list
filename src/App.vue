<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <t-list />
      <v-btn fixed dark fab bottom right color="pink" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog :value="dialog" persistent max-width="600px">
              <v-card>
        <v-card-title>
          <span class="headline">New Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Item" required v-model="newItem"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog(true)">Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TList from "./components/TList.vue";
import ListStore from './store/ListStore';
import { getModule } from 'vuex-module-decorators';

@Component({
  components: {
    TList
  },
})
export default class App extends Vue {
  public listStore: ListStore = getModule(ListStore, this.$store);
  private dialog = false;
  private newItem: string | null = null;

  private closeDialog(save = false) {
    if(save && this.newItem) {
      this.listStore.addListItem(this.newItem);
    }
    this.newItem = null;
    this.dialog = false;
  }


}
</script>
