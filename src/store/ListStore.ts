import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { ListItem } from "@/types/ListItem";
import { v4 } from "uuid";
import Gun from "gun";

@Module({ namespaced: true, name: "ListStore" })
export default class ListStore extends VuexModule {
  private db = Gun(process.env.VUE_APP_GUN_PEERS?.split(",")).get(
    "the-list-todo"
  );
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
    //@ts-ignore
    this.db.set(item);
  }

  @Mutation
  public setListItem(item: ListItem) {
    const existingItem = this.items.find(
      (existing: ListItem) => existing.uuid === item.uuid
    );
    if (existingItem) {
      const index = this.items.indexOf(existingItem);
      this.items.splice(index, 1, item);
    } else {
      this.items.push(item);
    }
  }

  @Mutation
  public setDone(uuid: string) {
    const existingItem = this.items.find(
      (item: ListItem) => item.uuid === uuid
    );
    if (existingItem) {
      const updated = { ...existingItem, done: true };
      //@ts-ignore
      this.db.get(updated.id).put(updated);
    }
  }

  @Mutation
  public triggerDelete(uuid: string) {
    const existingItem = this.items.find(
      (item: ListItem) => item.uuid === uuid
    );
    if (existingItem) {
      //@ts-ignore
      this.db.get(existingItem.id).put(null);
    }
  }

  @Mutation
  deleteItem(id: string | number | symbol) {
    const existingItem = this.items.find((item: ListItem) => item.id === id);
    if (existingItem) {
      this.items.splice(this.items.indexOf(existingItem), 1);
    }
  }
}
