<template>
  <tr>
    <td>{{customer.email}}</td>
    <td>{{customer.description}}</td>
    <td>{{customer.default_source}}</td>
    <td>{{customer.created | convertTimestamp}}</td>
  </tr>
</template>

<script>
export default {
  props: ["customer"],
  filters: {
    convertTimestamp(value) {
      return new Date(value * 1000).toUTCString();
    }
  }
};
</script>
<style>
</style>
