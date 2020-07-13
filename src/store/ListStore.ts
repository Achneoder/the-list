import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { ListItem } from "@/types/ListItem";
import { v4 } from "uuid";
import Gun from "gun";
import { GUN_PEERS } from "@/main";

@Module({ namespaced: true, name: "ListStore" })
export default class ListStore extends VuexModule {
  private db = Gun(GUN_PEERS).get("the-list-todo");
  private items: Array<ListItem> = [];

  get listItems(): Array<ListItem> {
    return this.items;
  }

  get gunDb() {
    return this.db;
  }

  @Mutation
  public addNewListItem(title: string) {
    const item = { uuid: v4(), title, done: false };
    // this.items.push(item);
    //@ts-ignore
    this.db.set(item);
  }

  @Mutation
  public addListItem(item: ListItem) {
    this.items.push(item);
  }

  @Mutation
  public setDone(uuid: string) {
    const existingItem = this.items.find(
      (item: ListItem) => item.uuid === uuid
    );
    if (existingItem) {
      const index = this.items.indexOf(existingItem);
      this.items.splice(index, 1, {
        ...existingItem,
        done: true
      });
      const updated = this.items[index];
      //@ts-ignore
      this.db.get(updated.id).put(updated);
    }
  }

  @Mutation
  deleteItem(uuid: string) {
    const existingItem = this.items.find(
      (item: ListItem) => item.uuid === uuid
    );
    if (existingItem) {
      const updated = this.items.splice(this.items.indexOf(existingItem), 1);
      //@ts-ignore
      this.db.get(updated[0].id).put(null);
    }
  }
}
