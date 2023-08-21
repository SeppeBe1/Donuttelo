<template>
  <div>
    <h1>{{ title }}</h1>

    <div
      v-for="(donut, index) in donuts"
      :key="index"
      class="donut-item"
      :class="{ removed: donut.removed }"
    >
      <div>
        <h2>Donut: {{ donut.donutname }}</h2>
        <p>topping: {{ donut.topping }}</p>
        <p>glaze: {{ donut.glaze }}</p>
        <p>dough: {{ donut.dough }}</p>
      </div>

      <div>
        <h2>Company: {{ donut.Company }}</h2>
        <p>streetname: {{ donut.streetname }}</p>
        <p>housenumber: {{ donut.housenumber }}</p>
        <p>city: {{ donut.city }}</p>
        <p>postalcode: {{ donut.postalcode }}</p>
      </div>

      <div>
        <h2>Extra info:</h2>
        <p>orderAmount: {{ donut.orderAmount }}</p>
        <p>orderStatus: {{ donut.orderStatus }}</p>
        <a
          v-on:click.prevent="changestatus(index, donut)"
          class="btnstatus"
          href="#"
          :data-id="donut._id"
          >verander orderstatus</a
        >
        <br />
        <a
          v-on:click.prevent="deleteDonut(index, donut)"
          class="btndelete"
          href="#"
          :data-id="donut._id"
          >delete</a
        >
      </div>
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
}

h2 {
  font-size: 15px;
}

p {
  font-size: 12px;
}

.donut-item {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  transition: transform 1.5s ease-in;
  gap: 20px;
}

.removed {
  transform: translateX(2000px);
}
</style>
