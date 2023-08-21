<!-- import components -->

<template id="login">
  <h1>{{ title }}</h1>

  <label for="username">username:</label><br />
  <input type="text" id="username" name="username" required /><br /><br />

  <label for="password">password:</label><br />
  <input type="text" id="password" name="password" required /><br /><br />

  <button @click="login">Login</button>
</template>

<script>
export default {
  data() {
    return {
      title: "Login here",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Logging in...");
    },
  },
};
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
