//STEP ACTIONS
const stepOrder = document.querySelectorAll(".step-order");

const content = document.querySelectorAll(".content");

const nextButtons = document.querySelectorAll(".btn");
const backButtons = document.querySelectorAll(".back-btn");



let currentStep = 0;

//Move next step
// function showStep(stepIndex) {

//     content.forEach((item) => {
//         item.style.display = "none";
//     });

//     content[stepIndex].style.display = "flex";

//     stepOrder.forEach((item) => {
//         item.classList.remove("active");
//     });

//     stepOrder[stepIndex].classList.add("active");

//     currentStep = stepIndex;

// }/// each step-order change

function showStep(stepIndex) {
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
const pageFinish = document.querySelector(".page-finish");

confirmButtons.addEventListener("click", () => {
    pageFinish.style.display = "flex";
})



const form = document.querySelector(".content-form");

//Next step buttons

nextButtons.forEach((button) => {
    
    button.addEventListener("click", () =>{

        if(currentStep === 0 && !form.checkValidity()){
            form.reportValidity();
            return;
        }

        if(currentStep < content.length - 1) {
            showStep(currentStep + 1);
        }
    });
});


backButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentStep > 0) {
            showStep(currentStep - 1);
        }
    });
});

showStep(0);



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


