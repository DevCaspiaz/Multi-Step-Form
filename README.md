# Multi-Step Form
“Multi-step form” Frontend challenge, developed using vanilla HTML, CSS, and JavaScript.

## Demo
[Live Demo](https://multi-step-form-mu-sage.vercel.app/)

![Project ScreenShoots-Desktop view](./assets/image/screen/screen-desktop-1.png)
![Project ScreenShoots-Mobile view](./assets/image/screen/screen-mobile.png)
![Project ScreenShoots-Desktop view 2](./assets/image/screen/screen-desktop-2.png)
![Project ScreenShoots-Mobile view 2](./assets/image/screen/screen-mobile-2.png)
![Project ScreenShoots-Mobile view 3](./assets/image/screen/screen-mobile-3.png)


## 🛠️ Technologies Used
- HTML5 (semantic markup)
- CSS3 (custom properties, `clamp()`, Grid & Flexbox)
- Vanilla JavaScript


## ✨ Features

- 4-step form flow (personal information → plan selection → additional services → summary)
- Dynamic price calculation with a monthly/annual billing toggle
- Fully accessible via keyboard (Tab, arrow keys, Space/Enter)
- Responsive design for mobile, tablet, and desktop
- Native form validation (with custom error messages)


## 🚀 How to Run It

This project does not require any build tools or dependencies.

1. Clone the repo: `git clone https://github.com/DevCaspiaz/Multi-Step-Form.git`
2. Open the `index.html` file in a browser.

That's it.

## 📝 Notes

- State management is handled via the DOM (e.g., the selected plan is identified by the `.active-plan-card` class). This was a deliberate choice for a small-scale project; if the project were to grow, it would be necessary to switch to a separate data model.
- Plan and add-on selections are built using actual `<input type="radio/checkbox">` elements (visually hidden and styled via labels) — this ensures that keyboard accessibility is natively supported by the browser.
