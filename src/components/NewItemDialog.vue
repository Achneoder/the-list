<template>
  <v-dialog :value="open" persistent max-width="600px">
    <v-form @submit.prevent="closeDialog(true)">
      <v-card>
        <v-card-title>
          <span class="headline">New Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  ref="itemName"
                  label="Item"
                  required
                  v-model="newItem"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog(true)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  PropSync,
  Ref,
  Watch,
} from "vue-property-decorator";
import ListStore from "../store/ListStore";
import { getModule } from "vuex-module-decorators";
import { ListItem } from "../types/ListItem";

@Component
export default class ListCard extends Vue {
  @PropSync("modalOpen", { type: Boolean }) private open!: boolean;
  @Ref("itemName") readonly itemNameInput!: HTMLInputElement;
  private listStore: ListStore = getModule(ListStore, this.$store);
  private newItem: string | null = null;

  @Watch("open")
  onPersonChanged1(val: boolean, oldVal: boolean) {
    if (val) {
      this.$nextTick(() => {
        //FIXME: not working...
        this.itemNameInput.focus();
      });
    }
  }

  private closeDialog(save = false) {
    if (save && this.newItem) {
      this.listStore.addNewListItem(this.newItem);
    }
    this.newItem = null;
    this.open = false;
  }
}
</script>
<style lang="scss" scoped></style>
