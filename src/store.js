import Vue from "vue";
import Vuex from "vuex";
import conf from "./conf";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    displayModal: false,
    customers: []
  },
  getters: {
    getDisplayModal(state) {
      return state.displayModal;
    },
    getCustomers(state) {
      return state.customers;
    }
  },
  actions: {
    toggleModal({ commit }, status) {
      commit("toggleModal", status);
    },
    async retriveCustomers({ commit }) {
      let customers = await axios.get("https://api.stripe.com/v1/customers", {
        headers: { Authorization: `Bearer ${conf.apiSecretKey}` }
      });

      commit("setCustomers", customers.data.data);
    }
  },
  mutations: {
    toggleModal(state, status) {
      state.displayModal = status;
    },
    setCustomers(state, customers) {
      state.customers = customers;
    }
  }
});

export default store;
