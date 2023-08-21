<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-for="(donut, index) in donuts" :key="index" class="donut-item">
      <h2>Donut Name: {{ donut.donutname }}</h2>
      <p>Company: {{ donut.companyname }}</p>
      <p>City: {{ donut.city }}</p>
      <!-- Add other properties as needed -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Donut List",
      donuts: [], // Initialize an empty array to hold donut data
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
            this.donuts = data.data;
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
.donut-item {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
