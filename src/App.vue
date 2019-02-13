<template>
  <main class="container d-flex flex-column">
    <button type="button" class="btn btn-light my-2 align-self-end" @click="showModal">+ New</button>
    <appCustomersTable></appCustomersTable>
    <appNewCustomerModal></appNewCustomerModal>
  </main>
</template>

<script>
import appCustomersTable from "./components/CustomersTable";
import appNewCustomerModal from "./components/NewCustomerModal";

export default {
  name: "app",
  components: {
    appCustomersTable,
    appNewCustomerModal
  },
  methods: {
    showModal() {
      this.$store.dispatch("toggleModal", true);
    }
  }
};
</script>

<style>
</style>
