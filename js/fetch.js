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

  if (!donutName.value || !companyName.value || !streetname.value || !housenumber.value || !city.value || !postalcode.value || isNaN(orderAmount.value)) {
    if (!donutName.value) {
      donutName.classList.add("invalid");
      isValid = false;
  } else {
      donutName.classList.remove("invalid");
  }

  if (!companyName.value) {
    companyName.classList.add("invalid");
      isValid = false;
  } else {
    companyName.classList.remove("invalid");
  }

  if (!streetname.value) {
    streetname.classList.add("invalid");
      isValid = false;
  } else {
    streetname.classList.remove("invalid");
  }

  if (!housenumber.value) {
    housenumber.classList.add("invalid");
      isValid = false;
  } else {
    housenumber.classList.remove("invalid");
  }

  if (!city.value) {
    city.classList.add("invalid");
      isValid = false;
  } else {
    city.classList.remove("invalid");
  }

  if (!postalcode.value) {
    postalcode.classList.add("invalid");
      isValid = false;
  } else {
    postalcode.classList.remove("invalid");
  }

  if (isNaN(orderAmount.value)) {
    orderAmount.classList.add("invalid");
      isValid = false;
  } else {
    orderAmount.classList.remove("invalid");
  }

  

  if (!isValid) {
      alert("Please fill in all required fields with valid values.");
  }
      alert("Please fill in all required fields with valid values.");
      return false;
  } else {
    createDonut();
  }


  return true;
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
        } else if (data.status == "succes") {
          setInputValue("");
          if (isChanged == false) {
            setIsChanged(true);
          } else {
            setIsChanged(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };