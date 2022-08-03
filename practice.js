const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
};
const isValidPhone = (phone) => {
    const re = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return re.test(String(phone).toLowerCase())
};

const isValidPass = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    return re.test(String(password).toLowerCase());
}
const container = document.querySelector('.container')
const form = document.querySelector('form');
const thankYou = document.querySelector(".thank-you");
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');
const passWord1 = document.querySelector('input[name="password1"]')
const passWord2 = document.querySelector('input[name="password2"]')
const inputs = [nameInput, emailInput, phoneInput, passWord1, passWord2]

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
    elm.classList.remove("invalid");
    elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm) => {
    elm.classList.add("invalid");
    elm.nextElementSibling.classList.remove("hidden");
};

const validateInputs = () => {
    let usernameValue = nameInput.value.trim();
    let emailValue = emailInput.value.trim();

    let passWord1Value = passWord1.value.trim();
    let password2Value = passWord2.value.trim();

    if (!isValidationOn) return;
    isFormValid = true;

    inputs.forEach(resetElm);


    if (!usernameValue) {
        isFormValid = false;
        invalidateElm(nameInput);
    }
    if (emailValue === '') {
        isFormValid = false;
        invalidateElm(emailInput);
    }

    else if (!isValidEmail(emailInput.value)) {
        isFormValid = false;
        invalidateElm(emailInput);
    }
    if (!isValidPhone(phoneInput.value)) {
        isFormValid = false;
        invalidateElm(phoneInput);
    }
    if (passWord1Value === '') {
        isFormValid = false;
        invalidateElm(passWord1)
    } else if (!isValidPass(passWord1Value)) {
        isFormValid = false;
        invalidateElm(passWord1);
        
    }
    
    if (password2Value === '') {
        isFormValid = false;
        invalidateElm(passWord2)
        setErrorFor(passWord2, 'password check should not be empty');
    } else if (password2Value !== passWord1Value) {
        isFormValid = false;
        invalidateElm(passWord2);
        setErrorFor(passWord2, 'password does not match');
    }
    
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    isValidationOn = true;
    validateInputs();
    if (isFormValid) {
        container.remove();
        thankYou.classList.remove("hidden")
    }
});
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        validateInputs();

    });
});



