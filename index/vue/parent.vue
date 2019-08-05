<template>
  <div>
    <child message="Hello Vue!!"></child>
  </div>
</template>
<script>
import Child from "./child.vue";
export default {
  components: {
    Child
  }
};
</script>
