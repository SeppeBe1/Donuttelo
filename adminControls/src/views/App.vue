<template>
  <div>
    <login-component v-if="!isLoggedIn" @authenticated="onAuthenticated" />
    <library-component v-else />
  </div>
</template>

<script>
import LoginComponent from "./Login.vue";
import LibraryComponent from "./Library.vue";

export default {
  components: {
    LoginComponent,
    LibraryComponent,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    onAuthenticated() {
      this.isLoggedIn = true;
    },
  },
};
</script>
