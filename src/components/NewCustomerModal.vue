<template>
  <div
    class="overlay justify-content-center align-items-center"
    v-bind:class="{ 'd-none': !displayModal, 'd-flex': displayModal }"
  >
    <form class="align-self-center w-25 border rounded p-3 bg-white" action>
      <h5>Create new customer</h5>
      <div class="form-group">
        <label class="label" for="email">Email</label>
        <input
          v-model="newCustomer.email"
          id="email"
          name="email"
          type="email"
          class="form-control w-100"
        >
      </div>
      <div class="form-group">
        <label class="label" for="description">Description</label>
        <input
          v-model="newCustomer.description"
          id="description"
          name="description"
          type="text"
          class="form-control w-100"
        >
      </div>
      <div class="row d-flex justify-content-between p-3">
        <button @click="hideModal" type="button" class="btn btn-secondary">Cancel</button>
        <button @click="createCustomer" type="button" class="btn btn-primary">Create Customer</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import conf from "../conf";

export default {
  data() {
    return {
      newCustomer: {
        email: "",
        description: ""
      }
    };
  },
  computed: {
    displayModal() {
      return this.$store.getters.getDisplayModal;
    }
  },
  methods: {
    async createCustomer() {
      this.hideModal();
      try {
        await axios.post(
          "https://api.stripe.com/v1/customers",
          `email=${this.newCustomer.email};description=${
            this.newCustomer.description
          }`,
          {
            headers: {
              Authorization: `Bearer ${conf.apiSecretKey}`,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        this.newCustomer.email = "";
        this.newCustomer.derelativeiption = "";

        this.$store.dispatch("retriveCustomers");
      } catch (err) {
        console.error(err);
      }
    },
    hideModal() {
      this.$store.dispatch("toggleModal", false);
    }
  }
};
</script>
<style scoped>
.overlay {
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
