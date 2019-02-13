<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>EMAIL</th>
        <th>DESCRIPTION</th>
        <th>DEFAULT SOURCE</th>
        <th>CREATED</th>
      </tr>
    </thead>
    <tbody>
      <appCustomerRow v-for="(customer, index) in customers" :key="index" :customer="customer"></appCustomerRow>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
import appCustomerRow from "./CustomerRow";

export default {
  computed: {
    customers() {
      return this.$store.getters.getCustomers;
    }
  },
  components: {
    appCustomerRow
  },
  beforeMount() {
    this.$store.dispatch("retriveCustomers");
  }
};
</script>
<style>
</style>
