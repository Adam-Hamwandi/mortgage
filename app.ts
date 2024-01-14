// Correct implementation of getElementById
function getElementById(id: string): HTMLElement | null {
  return document.getElementById(id);
}

const amountInput = getElementById("amount-input") as HTMLInputElement;
const interestRateInput = getElementById(
  "interest-rate-input"
) as HTMLInputElement;
const lengthOfLoanInput = getElementById(
  "length-of-loan-input"
) as HTMLInputElement;
const mortgageFinalResult = getElementById(
  "mortgage-final-result"
) as HTMLElement;
const calculateBtn = getElementById("calculate-btn") as HTMLButtonElement;
const resetBtn = getElementById("reset-btn") as HTMLButtonElement;

// Messages
const errorMessage: string =
  "There is an error in the form, please check it! 😥";
const successMessage: string = "🧮 Your monthly mortgage payment will be: ";

function calculateMortgagePayment(): void {
  const borrowedMoney: number = parseFloat(amountInput.value);
  const lengthOfLoanMonths: number = parseInt(lengthOfLoanInput.value) * 12;
  const monthlyInterestRate: number =
    parseFloat(interestRateInput.value) / 1200;
  const monthlyPayment: number =
    (borrowedMoney *
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
  } else {
    mortgageFinalResult.textContent =
      "Calculation error, please check your inputs.";
    mortgageFinalResult.classList.add("error-message");
  }
}

function addInputValidation(inputElement: HTMLInputElement): void {
  inputElement.addEventListener("focusout", function (e) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add("error");
    } else {
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
  if (
    amountInput.validity.valid &&
    interestRateInput.validity.valid &&
    lengthOfLoanInput.validity.valid
  ) {
    calculateMortgagePayment();
  } else {
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
  [amountInput, interestRateInput, lengthOfLoanInput].forEach((input) =>
    input.classList.remove("error")
  );
});
