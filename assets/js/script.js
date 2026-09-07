//STEP ACTIONS
const stepOrder = document.querySelectorAll(".step-order");

const content = document.querySelectorAll(".content");

const nextButtons = document.querySelectorAll(".btn");
const backButtons = document.querySelectorAll(".back-btn");

const mobileBars = document.querySelectorAll(".mobile-btn");


let currentStep = 0;
const SUMMARY_STEP_INDEX = 3;
let LAST_STEP_INDEX = content.length-1;


function showStep(stepIndex) {
    if (stepIndex === SUMMARY_STEP_INDEX) {
        updateSummary();
    }

    content.forEach((item) => {
        item.classList.remove("is-active");
    });

    content[stepIndex].classList.add("is-active");

    stepOrder.forEach((item, index) => {
        item.classList.remove("active");

        if (index <= stepIndex) {
            item.classList.add("active");
        }
    });

    currentStep = stepIndex;

    updateMobileButtons(stepIndex)
}

document.querySelectorAll(".confirm-btn").forEach((button) => {
    button.addEventListener("click", () => {
        showStep(LAST_STEP_INDEX);
    });
});



const form = document.querySelector(".content-form");

//Next step buttons

document.addEventListener("click", (event) => {
    const button = event.target.closest(".btn");
    if (!button) return;
    if (button.classList.contains("confirm-btn")) return;
    if (currentStep === 0) return;
    if (currentStep < LAST_STEP_INDEX) {
        showStep(currentStep + 1);
    }
});

backButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentStep > 0) {
            showStep(currentStep - 1);
        }
    });
});

showStep(0);


//*Mobil buttons

function updateMobileButtons(stepIndex) {
    mobileBars.forEach((bar) => {
        bar.classList.remove("is-visible");
    });

    if(stepIndex === 0) {
        mobileBars[0].classList.add("is-visible");
        return;
    }

    if(stepIndex === 1 || stepIndex === 2) {
        mobileBars[1].classList.add("is-visible");
        return;
    }

    if(stepIndex === SUMMARY_STEP_INDEX) {
        mobileBars[2].classList.add("is-visible")
    }
}



//!Error Message
const personalInfoForm = document.getElementById("personal-info-form");

personalInfoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const inputs = personalInfoForm.querySelectorAll(".label-input");

    let isValid = true;
    let firstInvalidInput = null;

    inputs.forEach(function (input) {

        const errorMessage = input.parentElement.querySelector(".error-message");

        input.classList.remove("error");
        errorMessage.classList.remove("show");

        if (input.value.trim() === "") {

            input.classList.add("error");

            errorMessage.textContent = "This field is required";
            errorMessage.classList.add("show");

            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = input;

        }

        else if (!input.checkValidity()) {

            input.classList.add("error");

            errorMessage.textContent = "Please enter a valid value";
            errorMessage.classList.add("show");

            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = input;
        }

    });

    if (!isValid) {
        firstInvalidInput.focus();
        return;
    }

    showStep(1);

});

const phoneInput = document.getElementById("mobile");

phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+() -]/g, "");
});

//*Secondary Content

// BUTTON ACTIONS


const optionBtn = document.querySelector(".option-btn");
const circle = document.querySelector(".circle");
const yearlyBtn = document.querySelector(".yearly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");


const planCards = document.querySelectorAll(".plan-card");

document.querySelectorAll(`input[name="plan"]`).forEach((radio) => {
    
    radio.addEventListener("change", () => {
        
        document.querySelectorAll(".plan-card").forEach((card) => {
            card.classList.remove("active-plan-card");
        });

        radio.closest(".plan-card").classList.add("active-plan-card");

    });

});



function setBilling(isYearly) {
    circle.classList.toggle("active", isYearly);
    yearlyBtn.classList.toggle("selected", isYearly);
    monthlyBtn.classList.toggle("selected", !isYearly)
    isYearlyOn();
}

optionBtn.addEventListener("click", () => {

    setBilling(!circle.classList.contains("active"));

});

monthlyBtn.addEventListener("click", ()=> {
    setBilling(false);
});

yearlyBtn.addEventListener("click", () => {
    setBilling(true);
})


//*Third



const pickBox = document.querySelectorAll(".pick-box");
const monthlyCost = document.querySelectorAll(".monthly-cost")
const yearlyCost = document.querySelectorAll(".yearly-cost")

function isYearlyOn() {
    const isYearly = circle.classList.contains("active");
    document.body.classList.toggle("is-yearly", isYearly);
}

document.querySelectorAll(`input[name="addons"]`).forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        checkbox.closest(".pick-box").classList.toggle("selected", checkbox.checked);
    });
});



//*Fourth — summary

const summaryPlanName = document.querySelector(".summary-plan-name");
const summaryBilling = document.querySelector(".monthly-yearly");
const summaryPlanCost = document.querySelector(".summary-plan-cost");
const summaryPeriods = document.querySelectorAll(".summary-period");
const summaryTotalLabel = document.querySelector(".total");
const summaryTotalAmount = document.querySelector(".summary-total-amount");
const summaryExtras = document.querySelector(".about-extra");
const summaryLine = document.querySelector(".line");
const changeBtn = document.querySelector(".change-btn");

function getSelectedPlan() {
    const selectedCard = document.querySelector(".active-plan-card");

    if(!selectedCard) {
        console.log("None of plan-card selected-Can not find .active-plan-card class element ");
        return null;
    }
    const isYearly = circle.classList.contains("active");
    const costSelector = isYearly ? ".yearly .cost" : ".monthly .cost";

    return {
        name: selectedCard.querySelector(".card-title").textContent.trim(),
        cost: Number(selectedCard.querySelector(costSelector).textContent),
        isYearly
    };
}

function getSelectedAddons(isYearly) {
    const costSelector = isYearly ? ".yearly-cost .cost" : ".monthly-cost .cost";

    return Array.from(document.querySelectorAll(".pick-box.selected")).map((box) => ({
        name: box.querySelector(".pick-box-title").textContent.trim(),
        cost: Number(box.querySelector(costSelector).textContent)
    }));
}

function updateSummary() {
    const plan = getSelectedPlan();

    if(!plan) { return;}

    const addons = getSelectedAddons(plan.isYearly);
    const period = plan.isYearly ? "/yr" : "/mo";
    const billingLabel = plan.isYearly ? "(Yearly)" : "(Monthly)";
    const total = plan.cost + addons.reduce((sum, addon) => sum + addon.cost, 0);

    summaryPlanName.textContent = plan.name;
    summaryBilling.textContent = billingLabel;
    summaryPlanCost.textContent = plan.cost;
    summaryTotalLabel.textContent = plan.isYearly ? "Total (per year)" : "Total (per month)";
    summaryTotalAmount.textContent = total;

    summaryPeriods.forEach((item) => {
        item.textContent = period;
    });

    summaryExtras.textContent = "";

    addons.forEach((addon) => {
        const row = document.createElement("div");
        row.className = "extras";

        const name = document.createElement("span");
        name.className = "extra-name";
        name.textContent = addon.name;

        const cost = document.createElement("span");
        cost.className = "extra-cost";
        cost.textContent = `+$${addon.cost}${period}`;

        row.append(name, cost);
        summaryExtras.appendChild(row);
    });

    summaryLine.classList.toggle("is-hidden", addons.length === 0);
}

changeBtn.addEventListener("click", () => {
    showStep(1);
});


