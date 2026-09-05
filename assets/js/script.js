//STEP ACTIONS
const stepOrder = document.querySelectorAll(".step-order");

const content = document.querySelectorAll(".content");

const nextButtons = document.querySelectorAll(".btn");
const backButtons = document.querySelectorAll(".back-btn");
const confirmButton = document.querySelectorAll(".confirm-btn")
const nextMobileButtons = document.querySelectorAll(".mobile-btn");


let currentStep = 0;


function showStep(stepIndex) {
    if (stepIndex === 3) {
        updateSummary();
    }

    content.forEach((item) => {
        item.style.display = "none";
    });

    content[stepIndex].style.display = "flex";

    stepOrder.forEach((item, index) => {
        item.classList.remove("active");

        if (index <= stepIndex) {
            item.classList.add("active");
        }
    });

    currentStep = stepIndex;
}

const confirmButtons = document.querySelector(".confirm-btn");

confirmButtons.addEventListener("click", () => {
    showStep(content.length - 1);
})



const form = document.querySelector(".content-form");

//Next step buttons

nextButtons.forEach((button) => {
    
    button.addEventListener("click", () =>{

        if (button.classList.contains("confirm-btn")) {
            return;
        }

        if(currentStep === 0 && !form.checkValidity()){
            form.reportValidity();
            return;
        }

        if(currentStep < content.length - 1) {
            showStep(currentStep + 1);
        }
    });
});

nextMobileButtons.forEach((button) => {

    button.addEventListener("click", () =>{
        if(button.classList.contains("confirm-btn")) {
            return;
        }

        if(currentStep === 0 && !form.checkValidity()){
            form.reportValidity();
            return;
        }

        if(currentStep < content.length - 1) {
            showStep(currentStep + 1);
        }
    })
})


backButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentStep > 0) {
            showStep(currentStep - 1);
        }
    });
});

showStep(0);



//!Error Message
const personalInfoForm = document.getElementById("personal-info-form");

personalInfoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const inputs = personalInfoForm.querySelectorAll(".label-input");

    let isValid = true;

    inputs.forEach(function (input) {

        const errorMessage = input.parentElement.querySelector(".error-message");

        input.classList.remove("error");
        errorMessage.classList.remove("show");

        if (input.value.trim() === "") {

            input.classList.add("error");

            errorMessage.textContent = "This field is required";
            errorMessage.classList.add("show");

            isValid = false;

        }

        else if (!input.checkValidity()) {

            input.classList.add("error");

            errorMessage.textContent = "Please enter a valid value";
            errorMessage.classList.add("show");

            isValid = false;
        }

    });

    if (isValid) {

        console.log("FORM VALID");

    }

});

const phoneInput = document.getElementById("mobile");

phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+() -]/g, "");
});

//*Secondary Content

// BUTTON ACTIONS
const btn = document.querySelectorAll(".btn");


btn.forEach((item) => {
    
    item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = "var(--btn-hover)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "";
    })

    item.addEventListener("click", () => {
        item.style.transform = "translateX(1rem)";

        setTimeout(() => {
            item.style.transform = "translateX(0)";
        }, 130);
    })
})





const optionBtn = document.querySelector(".option-btn");
const circle = document.querySelector(".circle");
const yearlyBtn = document.querySelector(".yearly-btn");
const monthlyBtn = document.querySelector(".monthly-btn");

const monthly = document.querySelectorAll(".monthly");
const yearly = document.querySelectorAll(".yearly");
const extraYearly = document.querySelectorAll(".yearly-extra");

const planCards = document.querySelectorAll(".plan-card");

planCards.forEach((planCard) => {
    planCard.addEventListener("click", () => {
        
        planCards.forEach((item) => {
            item.classList.remove("active-plan-card");
        })

        planCard.classList.add("active-plan-card");

    })
})

optionBtn.addEventListener("click", () => {

    circle.classList.toggle("active");

    yearlyBtn.classList.toggle("selected");
    monthlyBtn.classList.toggle("selected")

    isYearlyOn()

});


//*Third



const pickBox = document.querySelectorAll(".pick-box");
const monthlyCost = document.querySelectorAll(".monthly-cost")
const yearlyCost = document.querySelectorAll(".yearly-cost")

function isYearlyOn() {
    const isYearly = circle.classList.contains("active");

    if(isYearly){

        monthly.forEach((item) => {
            item.style.display = "none"
        });

        yearly.forEach((item) => {
            item.style.display = "block"
        });

        extraYearly.forEach((item) => {
            item.style.display = "block"
        });

        monthlyCost.forEach((item) => {
            item.style.display = "none"
        });

        yearlyCost.forEach((item) => {
            item.style.display = "block"
        });

    } else {

        monthly.forEach((item) => {
            item.style.display = "block"
        })

        yearly.forEach((item) => {
            item.style.display = "none"
        })

        extraYearly.forEach((item) => {
            item.style.display = "none"
        })

        monthlyCost.forEach((item) => {
            item.style.display = "block"
        });

        yearlyCost.forEach((item) => {
            item.style.display = "none"
        });


    }
}

pickBox.forEach((box) =>{

    box.addEventListener("click", ()=> {
        box.classList.toggle("selected");
    })

})


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

    summaryExtras.innerHTML = addons.map((addon) => `
        <div class="extras">
            <span class="extra-name">${addon.name}</span>
            <span class="extra-cost">+$<span>${addon.cost}</span>${period}</span>
        </div>
    `).join("");

    summaryLine.classList.toggle("is-hidden", addons.length === 0);
}

changeBtn.addEventListener("click", () => {
    showStep(1);
});


