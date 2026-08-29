//STEP ACTIONS
const stepOrder = document.querySelectorAll(".step-order");

const content = document.querySelectorAll(".content");



stepOrder.forEach((step, index) => {

    step.addEventListener("click", () => {

        stepOrder.forEach((item) => {
            item.classList.remove("active");
        });

        step.classList.add("active");

        content.forEach((item) => {
            item.style.zIndex = "0";
        })

        content[index].style.zIndex= "5"

    });

});





// BUTTON ACTIONS
const btn = document.querySelector(".btn");

btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "var(--btn-hover)";
});

btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "";
})

btn.addEventListener("click", () => {
    btn.style.transform = "translateX(1rem)";

    setTimeout(() => {
        btn.style.transform = "translateX(0)";
    }, 130);
})

