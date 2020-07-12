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
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import ListStore from './store/ListStore';
import { ListItem } from './types/ListItem';

@Component
export default class App extends Vue {
  private listStore: ListStore = getModule(ListStore, this.$store);

  mounted() {
    this.listStore.gunDb.map().on((listItem, id) => {
      if(!this.listStore.listItems.find((item: ListItem) => item.id === id)) {
        this.listStore.addListItem({...(listItem as ListItem), id});
      }
    });
  }
}
</script>
