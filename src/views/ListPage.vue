<template>
  <div>
    <v-container>
      <t-list />
    </v-container>
    <v-btn fixed dark fab bottom right color="pink" @click="dialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <new-item-dialog :modalOpen.sync="dialog" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TList from "../components/TList.vue";
import NewItemDialog from "../components/NewItemDialog.vue";

@Component({
  components: {
    TList,
    NewItemDialog,
  },
})
export default class ListPage extends Vue {
  private dialog = false;
}
</script>
