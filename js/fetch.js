document.querySelector(".submit").addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const donutName = document.querySelector("#donutname");
  const companyName = document.querySelector("#companyname");
  const streetname = document.querySelector("#streetname");
  const housenumber = document.querySelector("#housenumber");
  const city = document.querySelector("#city");
  const postalcode = document.querySelector("#postalcode");
  const orderAmount = document.querySelector("#orderAmount");

  let isValid = true; // Initialize the isValid flag

  // Reset the borders for all fields
  const inputFields = [donutName, companyName, streetname, housenumber, city, postalcode, orderAmount];
  inputFields.forEach(input => {
      input.classList.remove("invalid");
  });

  // Check each field for missing or invalid values
  inputFields.forEach(input => {
      if (!input.value) {
          input.classList.add("invalid");
          isValid = false;
      } else 
      if (input === orderAmount && isNaN(input.value)) {
          input.classList.add("invalid");
          isValid = false;
      } 
  });


  if (!isValid) {
      alert("Please fill in all required fields with valid values.");
  } else {
    createDonut();
  }

  return isValid;
}



const createDonut = () => {

    fetch("http://localhost:3000/api/v1/donuts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donutname: document.querySelector("#donutname").value,
        topping: document.querySelector("#topping").value,
        glaze: document.querySelector("#glaze").value,
        dough: document.querySelector("#dough").value,

        companyname: document.querySelector("#companyname").value,
        streetname: document.querySelector("#streetname").value,
        housenumber: document.querySelector("#housenumber").value,
        city: document.querySelector("#city").value,
        postalcode: document.querySelector("#postalcode").value,

        orderAmount: document.querySelector("#orderAmount").value,
        orderStatus: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status == "failed") {
          console.log(data);

        } else if (data.status == "succes") {
          console.log("created")
          window.location.href = "../thanks.html";

        }
      })
      .catch((error) => {
        console.error(error);
      });
  };