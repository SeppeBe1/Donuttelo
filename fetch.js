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
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  document.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission
    createDonut();
  });