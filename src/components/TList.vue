<template>
  <v-list two-line subheader>
    <v-subheader inset>Entries</v-subheader>
    <div v-for="(item, index) in listItems" :key="item.uuid">
      <v-list-item>
        <v-list-item-avatar>
          <v-checkbox
            :value="item.done"
            @change="setDone(item.uuid)"
          ></v-checkbox>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="deleteItem(item.uuid)">
            <v-icon color="red lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="index + 1 < listItems.length" :key="index"></v-divider>
    </div>
  </v-list>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ListStore from "../store/ListStore";
import { getModule } from "vuex-module-decorators";
import { ListItem } from "../types/ListItem";

@Component
export default class ListCard extends Vue {
  private listStore: ListStore = getModule(ListStore, this.$store);

  get listItems(): Array<ListItem> {
    return this.listStore.listItems.filter((item: ListItem) => !item.done);
  }

  private setDone(uuid: string) {
    this.listStore.setDone(uuid);
  }

  private deleteItem(uuid: string) {
    this.listStore.triggerDelete(uuid);
  }
}
</script>
<style lang="scss" scoped></style>
