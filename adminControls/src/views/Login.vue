<!-- import components -->

<template id="login">
  <div class="loginblock">
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

    <button class="submit" @click="login">Login</button>
  </div>
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

<style scoped>
:root {
  --donutelloBlauw: #83d1e5;
  --donutelloGeel: #ffeb52;
  --donutelloRoze: #fb327f;
}

h1 {
  color: #fb327f;
  font-family: sans-serif;
}

.loginblock {
  background-color: #ffeb52;
  text-align: center;
  width: 200px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px 20px 20px;
  margin-top: 20px;
}

label {
  color: var(--donutelloBlauw);
  font-family: sans-serif;
}

input {
  margin-top: 10px;
  padding: 5px;
  width: 80%;
  border-style: none;
  border-radius: 5px;
  border: 3px solid #83d1e5;
  font-family: sans-serif;
}

.submit {
  background-color: #fb327f;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
  font-size: 20px;
  margin-bottom: 10px;

  align-self: center;

  margin: 0 auto;
  display: block;
}
</style>
