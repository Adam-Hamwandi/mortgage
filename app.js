// Correct implementation of getElementById
function getElementById(id) {
    return document.getElementById(id);
}
var amountInput = getElementById("amount-input");
var interestRateInput = getElementById("interest-rate-input");
var lengthOfLoanInput = getElementById("length-of-loan-input");
var mortgageFinalResult = getElementById("mortgage-final-result");
var calculateBtn = getElementById("calculate-btn");
var resetBtn = getElementById("reset-btn");
// Messages
var errorMessage = "There is an error in the form, please check it! 😥";
var successMessage = "🧮 Your monthly mortgage payment will be: ";
function calculateMortgagePayment() {
    var borrowedMoney = parseFloat(amountInput.value);
    var lengthOfLoanMonths = parseInt(lengthOfLoanInput.value) * 12;
    var monthlyInterestRate = parseFloat(interestRateInput.value) / 1200;
    var monthlyPayment = (borrowedMoney *
        (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, lengthOfLoanMonths))) /
        (Math.pow(1 + monthlyInterestRate, lengthOfLoanMonths) - 1);
    if (isFinite(monthlyPayment)) {
        mortgageFinalResult.textContent =
            successMessage + monthlyPayment.toFixed(2);
        mortgageFinalResult.classList.add("success-message");
        calculateBtn.classList.add("form-success");
        calculateBtn.setAttribute("disabled", "disabled");
        resetBtn.style.display = "block";
    }
    else {
        mortgageFinalResult.textContent =
            "Calculation error, please check your inputs.";
        mortgageFinalResult.classList.add("error-message");
    }
}
function addInputValidation(inputElement) {
    inputElement.addEventListener("focusout", function (e) {
        if (!inputElement.validity.valid) {
            inputElement.classList.add("error");
        }
        else {
            inputElement.classList.remove("error");
        }
    });
}
amountInput.setAttribute("aria-label", "Loan Amount");
interestRateInput.setAttribute("aria-label", "Interest Rate");
lengthOfLoanInput.setAttribute("aria-label", "Length of Loan in Years");
addInputValidation(amountInput);
addInputValidation(interestRateInput);
addInputValidation(lengthOfLoanInput);
calculateBtn.addEventListener("click", function (e) {
    if (amountInput.validity.valid &&
        interestRateInput.validity.valid &&
        lengthOfLoanInput.validity.valid) {
        calculateMortgagePayment();
    }
    else {
        mortgageFinalResult.textContent = errorMessage;
        mortgageFinalResult.classList.add("error-message");
        calculateBtn.classList.add("form-error");
    }
});
resetBtn.addEventListener("click", function () {
    amountInput.value = "";
    interestRateInput.value = "";
    lengthOfLoanInput.value = "";
    mortgageFinalResult.textContent = "";
    mortgageFinalResult.classList.remove("success-message", "error-message");
    calculateBtn.classList.remove("form-success", "form-error");
    calculateBtn.removeAttribute("disabled");
    resetBtn.style.display = "none";
    [amountInput, interestRateInput, lengthOfLoanInput].forEach(function (input) {
        return input.classList.remove("error");
    });
});
