let myForm = document.querySelector("#form1");

myForm.addEventListener("submit", function (e) {
  let nameValid = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let creditCardNumber = document.getElementById("creditNumber").value;
  let creditMonth = document.getElementById("creditMonth").value;
  let creditYear = document.getElementById("creditYear").value;
  let product1 = document.getElementById("pizza").value;
  let product2 = document.getElementById("hotdogs").value;
  let product3 = document.getElementById("frozen").value;
  let product4 = document.getElementById("candy").value;

  let a = validationName(nameValid);

  let b = validEmail(email);

  let c = validCreditNumber(creditCardNumber);

  let d = validMonth(creditMonth);

  let f = validYear(creditYear);

  let g = verifyProducts(product1, product2, product3, product4);

  if (a && b && c && d && f && g) {
    let tip1 = document.createElement("label");
    tip1.id = "label01";
    tip1.innerHTML = `<input type="checkbox" name="tip" id="tenpercent" value="0.1">Add 10% of the total as donation`;

    let tip2 = document.createElement("label");
    tip2.id = "label10";
    tip2.innerHTML = `<input type="checkbox" name="tip" id="tendollar" value="10">Add $10 to the total as donation`;

    document.querySelector("#extra").appendChild(tip1);
    document.querySelector("#extra").appendChild(tip2);

    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="tip"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== event.target) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    var checkbox1 = document.getElementById("tenpercent");
    var checkbox2 = document.getElementById("tendollar");
    const myCheckout = document.getElementById("checkout");
    myCheckout.style.display = "none";
    let confirmButton = document.createElement("div");
    confirmButton.className = "six columns";
    confirmButton.innerHTML = `<input type="button" value="Confirm" id="confirmBttn" class="u-full-width">`;
    let cancelButton = document.createElement("div");
    cancelButton.className = "six columns";
    cancelButton.innerHTML = `<input type="button" value="Cancel" id="cancelBttn" class="u-full-width" onclick="location.href=location.href">`;
    document.querySelector("#newBttns").appendChild(confirmButton);
    document.querySelector("#newBttns").appendChild(cancelButton);

    let callEventConfirm = document.getElementById("confirmBttn");
    callEventConfirm.addEventListener("click", function () {
      if (checkbox1.checked || checkbox2.checked) {
        const fisrtForm = document.getElementById("form1");
        fisrtForm.style.display = "none";

        let receiptForm = document.createElement("form");
        receiptForm.setAttribute("id", "form2");
        document.querySelector(".container").appendChild(receiptForm);

        let thanksMessage = document.createElement("h3");
        thanksMessage.id = "subtitle";
        thanksMessage.innerText = "Thank you for your purchase!";
        document.querySelector("#form2").appendChild(thanksMessage);

        let maskedNumber = creditCardNumber.replace(
          /^([0-9]{4}-){3}/,
          "XXXX-XXXX-XXXX-"
        );
        let customerTable = document.createElement("table");
        customerTable.id = "customerTable";
        customerTable.innerHTML = `<tr><td class=tableHeaders>Name</td><td>${nameValid}</td></tr><tr><td class=tableHeaders>Email</td><td>${email}</td></tr><tr><td class=tableHeaders>Credit Card</td><td>${maskedNumber}</td></tr>`;
        document.querySelector("#form2").appendChild(customerTable);

        let receiptCustomer = document.createElement("div");
        receiptCustomer.className = "billDetails";
        document.querySelector("#form2").appendChild(receiptCustomer);

        var receiptTable =
          "<table id='receiptTable'><tr><th class='tableHeaders'>Item</th><th class='tableHeaders'>Quantity</th><th class='tableHeaders'>Unit Price</th><th class='tableHeaders'>Total Price</th></tr>";

        productRegex = /^[0-9]{1,}$/;
        let subtotal;
        let price;
        var total = 0;
        if (productRegex.test(product1)) {
          price = 4;
          subtotal = Number(product1) * price;
          let labelName = "Portion of Pizza";
          receiptTable += "<tr>";
          receiptTable += "<td>" + labelName + "</td>";
          receiptTable += "<td>" + product1 + "</td>";
          receiptTable += "<td>" + "$" + price.toFixed(2) + "</td>";
          receiptTable += "<td>" + "$" + subtotal.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + subtotal;
        }
        if (productRegex.test(product2)) {
          price = 7;
          subtotal = Number(product2) * price;
          let labelName = "German Hotdogs";
          receiptTable += "<tr>";
          receiptTable += "<td>" + labelName + "</td>";
          receiptTable += "<td>" + product2 + "</td>";
          receiptTable += "<td>" + "$" + price.toFixed(2) + "</td>";
          receiptTable += "<td>" + "$" + subtotal.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + subtotal;
        }
        if (productRegex.test(product3)) {
          price = 5;
          subtotal = Number(product3) * price;
          let labelName = "Frozen Juice";
          receiptTable += "<tr>";
          receiptTable += "<td>" + labelName + "</td>";
          receiptTable += "<td>" + product3 + "</td>";
          receiptTable += "<td>" + "$" + price.toFixed(2) + "</td>";
          receiptTable += "<td>" + "$" + subtotal.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + subtotal;
        }
        if (productRegex.test(product4)) {
          price = 3;
          subtotal = Number(product4) * price;
          let labelName = "Candy Cotton";
          receiptTable += "<tr>";
          receiptTable += "<td>" + labelName + "</td>";
          receiptTable += "<td>" + product4 + "</td>";
          receiptTable += "<td>" + "$" + price.toFixed(2) + "</td>";
          receiptTable += "<td>" + "$" + subtotal.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + subtotal;
        }
        if (checkbox1.checked) {
          let donation = total * Number(checkbox1.value);
          receiptTable += "<tr>";
          receiptTable += "<td>" + "Donation" + "</td>";
          receiptTable += "<td colspan='2' id='colspan'>" + "Minimum" + "</td>";
          receiptTable += "<td>" + "$" + donation.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + donation;
        } else if (checkbox2.checked) {
          let donation = Number(checkbox2.value);
          receiptTable += "<tr>";
          receiptTable += "<td>" + "Donation" + "</td>";
          receiptTable += "<td colspan='2' id='colspan'>" + "Minimum" + "</td>";
          receiptTable += "<td>" + "$" + donation.toFixed(2) + "</td>";
          receiptTable += "</tr>";
          total = total + donation;
        }

        receiptTable += "<tr>";
        receiptTable += "<td colspan='3' id='total'>" + "Total" + "</td>";
        receiptTable += "<td>" + "$" + total.toFixed(2) + "</tr>";
        receiptTable += "</table>";

        document.querySelector(".billDetails").innerHTML = receiptTable;
      }
    });
  }

  e.preventDefault();
});

function validationName(n) {
  nameRegex = /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/;

  if (nameRegex.test(n)) {
    return true;
  } else {
    ShowAlert("Please Enter a valid First and Last Name\n", "error");
    return false;
  }
}

function validEmail(em) {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(em)) {
    return true;
  } else {
    ShowAlert("Please Enter a valid Email\n", "error");
    return false;
  }
}

function validCreditNumber(cn) {
  numberRegex = /^([0-9]{4}-){3}[0-9]{4}$/;

  if (numberRegex.test(cn)) {
    return true;
  } else {
    ShowAlert("Please Enter a valid Card Number\n", "error");
    return false;
  }
}

function validMonth(m) {
  monthRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;

  if (monthRegex.test(m)) {
    return true;
  } else {
    ShowAlert("Please Enter a valid Expiry Month in capital letter\n", "error");
    return false;
  }
}

function validYear(y) {
  yearRegex = /^202[3-9]$/;

  if (yearRegex.test(y)) {
    return true;
  } else {
    ShowAlert("Please Enter a valid Expiry Year\n", "error");
    return false;
  }
}

function verifyProducts(one, two, three, four) {
  productRegex = /^[0-9]{1,}$/;
  let option1 = false;
  let option2 = false;
  let option3 = false;
  let option4 = false;
  let option = false;

  if (productRegex.test(one) || one === "") {
    option1 = productRegex.test(one);
    if (productRegex.test(two) || two === "") {
      option2 = productRegex.test(two);
      if (productRegex.test(three) || three === "") {
        option3 = productRegex.test(three);
        if (productRegex.test(four) || four === "") {
          option4 = productRegex.test(four);
        } else {
          ShowAlert("Please the number of items in numeric format", "error");
        }
      } else {
        ShowAlert("Please the number of items in numeric format", "error");
      }
    } else {
      ShowAlert("Please the number of items in numeric format", "error");
    }
  } else {
    ShowAlert("Please the number of items in numeric format", "error");
  }

  if (!option1 && !option2 && !option3 && !option4) {
    ShowAlert("Please Enter at least one item to buy", "error");
  } else {
    option = true;
  }

  return option;
}

function ShowAlert(m, c) {
  let popup = document.createElement("p");
  popup.innerText = m;
  popup.className = c;
  popup.id = "box";

  document.querySelector("#popup").appendChild(popup);

  setTimeout(function () {
    document.querySelector("#box").remove();
  }, 4000);
}
