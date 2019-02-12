<template>
  <main class="container d-flex flex-column">
    <button type="button" class="btn btn-light mb-2 align-self-end" @click="showFrom=true">+ New</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>EMAIL</th>
          <th>DESCRIPTION</th>
          <th>DEFAULT SOURCE</th>
          <th>CREATED</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index">
          <td>{{customer.email}}</td>
          <td>{{customer.description}}</td>
          <td>{{customer.default_source}}</td>
          <td>{{customer.created | convertTimestamp}}</td>
        </tr>
      </tbody>
    </table>

    <form v-if="showFrom" class="align-self-center w-25 border rounded p-3" action>
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
        <button @click="showFrom=false" type="button" class="btn btn-secondary">Cancel</button>
        <button @click="createCustomer" type="button" class="btn btn-primary">Create Customer</button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      apiKey: "pk_test_2DBellUav75OL6TdEF8AoRH6",
      secretKey: "sk_test_p4wW7fvIYIgPZBdj6gdYsdGS",
      customers: [],
      showFrom: false,
      newCustomer: {
        email: "",
        description: ""
      }
    };
  },
  methods: {
    getAuthHeader() {
      return { Authorization: `Bearer ${this.secretKey}` };
    },
    createCustomer() {
      this.showFrom = false;

      axios
        .post(
          "https://api.stripe.com/v1/customers",
          `email=${this.newCustomer.email};description=${
            this.newCustomer.description
          }`,
          {
            headers: {
              Authorization: `Bearer ${this.secretKey}`,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.retriveCustomers();
          this.newCustomer.email = "";
          this.newCustomer.description = "";
        });
    },
    retriveCustomers() {
      axios
        .get("https://api.stripe.com/v1/customers", {
          headers: this.getAuthHeader()
        })
        .then(res => {
          this.customers = res.data.data;
        });
    }
  },
  filters: {
    convertTimestamp(value) {
      return new Date(value * 1000).toUTCString();
    }
  },
  beforeMount() {
    this.retriveCustomers();
  }
};
</script>

<style>
</style>
