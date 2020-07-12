import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { ListItem } from "@/types/ListItem";

@Module({ namespaced: true, name: "ListStore" })
export default class ListStore extends VuexModule {
  private lastId = 0;

  private items: Array<ListItem> = [];

  get listItems(): Array<ListItem> {
    return this.items;
  }

  @Mutation
  public addListItem(title: string) {
    this.items.push({ id: this.lastId, title, done: false });
    this.lastId++;
  }

  @Mutation
  public setDone(id: number) {
    const existingItem = this.items.find((item: ListItem) => item.id === id);
    if (existingItem) {
      this.items.splice(this.items.indexOf(existingItem), 1, {
        ...existingItem,
        done: true,
      });
    }
  }

  @Mutation
  deleteItem(id: number) {
    const existingItem = this.items.find((item: ListItem) => item.id === id);
    if (existingItem) {
      this.items.splice(this.items.indexOf(existingItem), 1);
    }
  }
}
