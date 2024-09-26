document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

document.addEventListener("DOMContentLoaded", function () {
  const spinnerWrapper = document.querySelector(".spinner-wrapper");

  window.addEventListener("load", () => {
    setTimeout(() => {
      spinnerWrapper.classList.add("hidden");
    }, 300);
  });

  var navbarToggler = document.querySelector(".navbar-toggler");
  var mainContent = document.querySelector("main");

  navbarToggler.addEventListener("click", function () {
    // When the navbar is expanded, adjust the main content padding
    setTimeout(function () {
      var navbarHeight = document.querySelector(".navbar").offsetHeight;
      mainContent.style.marginTop = navbarHeight + "px";
    }, 300); // Adjust timeout to match navbar collapse animation
  });

  const carousel = document.querySelector(
    "#carouselExampleControls .carousel-inner"
  );
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.querySelector(".prev-btn");
  const indicators = document.querySelectorAll(".carousel-indicators button");

  let activeIndex = 0; // Counter to track the active index

  function updateIndicators() {
    console.log("Active Index:", activeIndex);
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active-indicator");

        // indicator.style.background = "red";
        console.log(indicator);
      } else {
        indicator.classList.remove("active-indicator");
        // indicator.style.background = "blue";
      }
    });
  }

  // Move to the next item
  nextBtn.addEventListener("click", function () {
    const activeItem = carousel.querySelector(".carousel-item.active");
    const firstItem = carousel.querySelector(".carousel-item:first-child");

    let nextItem = activeItem.nextElementSibling;

    if (!nextItem) {
      nextItem = firstItem; // Loop back to the first item
    }

    activeItem.classList.remove("active");
    nextItem.classList.add("active");

    carousel.appendChild(firstItem);

    // Update the active index counter
    activeIndex = (activeIndex + 1) % indicators.length;

    updateIndicators();
  });

  // Move to the previous item
  prevBtn.addEventListener("click", function () {
    const activeItem = carousel.querySelector(".carousel-item.active");
    const lastItem = carousel.querySelector(".carousel-item:last-child");

    let prevItem = activeItem.previousElementSibling;

    if (!prevItem) {
      prevItem = lastItem;
    }

    activeItem.classList.remove("active");
    prevItem.classList.add("active");

    carousel.insertBefore(lastItem, carousel.firstChild);

    // Update the active index counter
    activeIndex = (activeIndex - 1 + indicators.length) % indicators.length;

    updateIndicators();
  });

  updateIndicators();
});

// ************************************************************************

document.querySelectorAll(".accordion-header .icon-toggle").forEach((icon) => {
  icon.addEventListener("click", function () {
    const button = this.nextElementSibling;

    button.click();

    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Update the icon class based on the expanded state
    if (isExpanded) {
      this.classList.remove("fa-plus");
      this.classList.add("fa-minus");
    } else {
      this.classList.remove("fa-minus");
      this.classList.add("fa-plus");
    }
  });
});

// ******************************************************
const signinform = document.getElementById("signin-form");
const signupform = document.getElementById("signup-form");
const reserpasswordForm = document.getElementById("reserpassword-form");
const emailInput = document.querySelector("[name='email']");
const passwordInput = document.querySelector("[name='password']");
const checkbox = document.querySelector("[name='checkbox']");
const confirmPasswordInput = document.getElementById("confirm-password");

// validation accepted email
const isVaildEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

// function validate that email found in the local storage
const isEmailRegistered = (email) => {
  const storedEmail = JSON.parse(localStorage.getItem("emails")) || [];
  return storedEmail.includes(email);
};
// function that store the email in local storage
const storeEmail = (email) => {
  const storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
  storedEmails.push(email);
  localStorage.setItem("emails", JSON.stringify(storedEmails));
};
// ********************************************************************************

// function that clear inputs from
const clearInputs = () => {
  emailInput.value = "";
  if (passwordInput) {
    passwordInput.value = "";
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.value = "";
  }
  const inputs = [emailInput, passwordInput, confirmPasswordInput].filter(
    (input) => input !== null
  );
  inputs.forEach((input) => {
    const inputControl = input.parentElement;
    inputControl.classList.remove("success", "error"); // Remove both success and error classes
    const errorDisplay = inputControl.querySelector(".error");
    if (errorDisplay) {
      errorDisplay.innerText = ""; 
    }
  });
};
// ***************************************************************************

// This function shows an error message applying error styles.
const setError = (el, message) => {
  const inputControl = el.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// function remove any error message and applying success styles.
const setSuccess = (el) => {
  const inputControl = el.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};
// *************************************************************************************

// function that validate Sign Up page  inputs
const vaildateSignUpInputs = () => {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  let isValid = true;

  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isVaildEmail(emailValue)) {
    setError(emailInput, "Provide a vaild email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(passwordInput, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(passwordInput, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPasswordInput, "Please confirm your password");
    isValid = false;
  } else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(confirmPasswordInput);
  }

  return isValid;
};
// ************************************************************************************************

// function that validate Reset Password page  inputs
const vaildateResetPasswordInputs = () => {
  const emailValue = emailInput.value.trim();
  let isValid = true;

  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isVaildEmail(emailValue)) {
    setError(emailInput, "Provide a vaild email address");
    isValid = false;
  } else {
    setSuccess(email);
  }
  return isValid;
};
// *********************************************************************************

// logic for resetpassword form submission
if (reserpasswordForm) {
  reserpasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (vaildateResetPasswordInputs()) {
      const emailValue = emailInput.value.trim();
      if (!isEmailRegistered(emailValue)) {
        Swal.fire({
          title: "Email not Found",
          text: "This email is not registered. Please sign up first.",
          icon: "error",
          confirmButtonText: "Register",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "account-regestration.html";
          }
        });
      } else {
        Swal.fire({
          title: "Successful RESET password",
          text: "successful reest password",
          icon: "success",
          confirmButtonText: "Register",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        }).then((result) => {
          if (result.isConfirmed) {
            clearInputs();
            window.location.href = "/signin-page.html";
          }
        });
      }
    }
  });
}
// ***************************************************************************

// logic for sign in  form submission
if (signupform) {
  signupform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (vaildateSignUpInputs()) {
      const emailValue = emailInput.value.trim();
      if (isEmailRegistered(emailValue)) {
        Swal.fire({
          title: "your email exist ",
          text: "You have successfully signed in.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        });
        clearInputs();
      } else {
        storeEmail(emailValue);
        Swal.fire({
          title: "Signed up successfully!",
          text: "You have successfully signed up.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        }).then((result) => {
          if (result.isConfirmed) {
            clearInputs();
            window.location.href = "signin-page.html";
          }
        });
      }
    }
  });
}
// ****************************************************************************

// function that validate sign in page  inputs
const vaildateSigninInputs = () => {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  let isValid = true;

  if (emailValue === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!isVaildEmail(emailValue)) {
    setError(emailInput, "Provide a vaild email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(passwordInput, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(passwordInput, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }
  if (!checkbox.checked) {
    setError(checkbox, "You must agree to the terms.");
    isValid = false;
  } else {
    setSuccess(checkbox);
  }

  return isValid;
};
// *************************************************************************



// logic for signin form submission  
if (signinform) {
  signinform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (vaildateSigninInputs()) {
      const emailValue = emailInput.value.trim();
      if (!isEmailRegistered(emailValue)) {
        Swal.fire({
          title: "Email not found",
          text: "This email is not registered. Please sign up first.",
          icon: "error",
          confirmButtonText: "Register",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "account-regestration.html";
          }
        });
      } else {
        Swal.fire({
          title: "Signed in successfully!",
          text: "You have successfully signed in.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          confirmButtonColor: "rgba(230, 0, 30, 1)",
        }).then((result) => {
          if (result.isConfirmed) {
            clearInputs();
            window.location.href = "index.html";
          }
        });
      }
    }
  });
}
//**********************************************************************************************
window.addEventListener("load", () => {
  clearInputs(); // Clear inputs on page load
});
// **********************************************************************************************