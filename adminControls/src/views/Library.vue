<template id="library">
  <h1>{{ title }}</h1>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      title: "we zijn er",
    };
  },

  mounted() {
    this.getDonuts();
  },

  methods: {
    getDonuts() {
      fetch("http://localhost:3000/api/v1/donuts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == "failed") {
            console.log("geen donuts");
          } else if (data.status == "succes") {
            console.log("gelukt");
            console.log(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
