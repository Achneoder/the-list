import Vue from "vue";
import Vuex from "vuex";
import ListStore from './ListStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {ListStore}
});
