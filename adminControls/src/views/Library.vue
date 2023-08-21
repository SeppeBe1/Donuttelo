<template>
  <div>
    <h1>{{ title }}</h1>

    <div v-for="(donut, index) in donuts" :key="index" class="donut-item">
      <h2>Donut Name: {{ donut.donutname }}</h2>
      <p>Company: {{ donut.companyname }}</p>
      <p>City: {{ donut.city }}</p>

      <a
        v-on:click.prevent="deleteDonut"
        class="btndelete"
        href="#"
        :data-id="donut._id"
        >delete</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Donut List",
      donuts: [],
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
            this.donuts = data.data;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    deleteDonut(e) {
      let currentDonut = e.target.parentElement.parentElement;
      e.target.parentElement.parentElement.classList.add("removed");
      var donutId = e.target.getAttribute("data-id");
      let token = window.localStorage.getItem("token");

      fetch(`http://localhost:3000/api/v1/donuts/${donutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        return response.json();
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
