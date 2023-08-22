<template>
  <div class="template">
    <h1>{{ title }}</h1>

    <div
      v-for="(donut, index) in donuts"
      :key="index"
      class="donut-item"
      :class="{
        removed: donut.removed,
        'order-false': !donut.orderStatus,
        'order-true': donut.orderStatus,
      }"
    >
      <h2>Donut: {{ donut.donutname }}</h2>
      <p>Topping: {{ donut.topping }}</p>
      <p>Glaze: {{ donut.glaze }}</p>
      <p>Dough: {{ donut.dough }}</p>

      <p>Companyname: {{ donut.companyname }}</p>
      <p>Streetname: {{ donut.streetname }}</p>
      <p>Housenumber: {{ donut.housenumber }}</p>
      <p>City: {{ donut.city }}</p>
      <p>Postalcode: {{ donut.postalcode }}</p>

      <p>Extra info:</p>
      <p>OrderAmount: {{ donut.orderAmount }}</p>
      <p>OrderStatus: {{ donut.orderStatus }}</p>
      <a
        v-on:click.prevent="changestatus(index, donut)"
        class="btnstatus"
        href="#"
        :data-id="donut._id"
        ><img src="../../assets/images/order.png" alt="order image"
      /></a>
      <br />
      <a
        v-on:click.prevent="deleteDonut(index, donut)"
        class="btndelete"
        href="#"
        :data-id="donut._id"
        ><img src="../../assets/images/DELETE.png" alt="delete image"
      /></a>
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

    deleteDonut(index, donut) {
      let donutId = donut._id;
      let token = window.localStorage.getItem("token");

      fetch(`http://localhost:3000/api/v1/donuts/${donutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response.ok) {
            donut.removed = true;
            setTimeout(() => {
              this.donuts.splice(index, 1);
              if (this.donuts[index]) {
                this.donuts[index].removed = false;
              }
            }, 1000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    changestatus(index, donut) {
      const donutId = donut._id;
      const newOrderStatus = !donut.orderStatus;

      fetch(`http://localhost:3000/api/v1/donuts/${donutId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: newOrderStatus,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.status === "error") {
            console.error("Error:", json.message);
          } else if (json.status == "succes") {
            donut.orderStatus = newOrderStatus;
            if (newOrderStatus) {
            } else if (!newOrderStatus) {
            }
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
#app {
  overflow-x: hidden;
  background-color: #83d1e5;
}

h1 {
  font-family: sans-serif;
  padding-left: 20px;
  padding-top: 20px;
}

.template {
  font-family: sans-serif;
  background-color: #f8f594;
  height: 100vh;
  width: 100%;
  margin-left: -8px;
  padding-right: 20px;
  margin-top: -20px;
  overflow: hidden;
}

h2 {
  font-size: 25px;
}

img {
  border-radius: 10px;
  heigth: 50px;
  width: 50px;
}

p {
  font-size: 18px;
}

.donut-item {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 1.5s ease-in;
  gap: 20px;

  border: 2px solid;
  border-radius: 10px;
  font-family: sans-serif;
}

.order-false {
  border-color: #ff4c8e;
}

.order-true {
  border-color: #61d1d6;
}

.removed {
  transform: translateX(2000px);
}
</style>
