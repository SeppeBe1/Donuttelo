<!-- import components -->

<template id="login">
  <h1>{{ title }}</h1>

  <label for="username">Username:</label><br />
  <input type="text" id="username" v-model="username" required /><br /><br />

  <label for="password">Password:</label><br />
  <input
    type="password"
    id="password"
    v-model="password"
    required
  /><br /><br />

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
      console.log(this.username);
      console.log(this.password);
      fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == "failed") {
            console.log("ni gelukt");
          } else if (data.status == "succes") {
            console.log("gelukt");
            this.$emit("authenticated");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
