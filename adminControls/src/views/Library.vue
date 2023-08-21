<template id="library">
  <h1>{{ title }}</h1>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      title: "we zijn er",
      username: "",
      password: "",
    };
  },

  methods: {
    // login() {},
  },
};
</script>
