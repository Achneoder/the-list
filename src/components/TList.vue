<template>
  <v-list two-line subheader>
    <v-subheader inset>Entries</v-subheader>

    <v-list-item v-for="item in listItems" :key="item.id">
      <v-list-item-avatar>
        <v-checkbox :value="item.done" @change="setDone(item.id)"></v-checkbox>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="red lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ListStore from '../store/ListStore';
import { getModule } from 'vuex-module-decorators';
import { ListItem } from '../types/ListItem';

@Component
export default class ListCard extends Vue {
  public listStore: ListStore = getModule(ListStore, this.$store);

  get listItems(): Array<ListItem> {
    return this.listStore.listItems;
  }

  public setDone(id: number) {
    this.listStore.setDone(id);
  }
}
</script>
<style lang="scss" scoped></style>
