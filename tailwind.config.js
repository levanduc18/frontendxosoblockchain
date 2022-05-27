module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "rgb(14 14 44 / 40%) 0px -1px 0px 0px inset",
      },
      colors: {
        "custom-purple-bold": "rgb(69, 42, 122)",
        "custom-cyan-light": "rgb(31, 199, 212)",
        "custom-white-text": "rgb(244, 238, 255)",
        "custom-nav": "#f8f8f8",
        "custom-purple-text-bold": "rgb(40, 13, 95)",
        "custom-purple-text-light": "rgb(122, 110, 170)",
        "button-background-primary": "rgb(31, 199, 212)",
        "custom-purple-title": "rgb(154, 106, 255)",
        "custom-purple-description": "rgb(40, 13, 95)",
        "custom-background-card-light": "rgb(231, 227, 235)",
        "custom-background-dark": "rgb(39, 38, 44)",
        "custom-pink-text": "rgb(237, 75, 158)",
        "custom-icon-nav": "rgb(184, 173, 210)",
        "custom-switch": "rgb(49, 61, 92)",
        "custom-number-background": "rgb(72, 62, 92)",
        "custom-background-htp": ": rgb(250, 249, 250",
        "custom-background-modal": "rgba(40, 13, 95, 0.6)",
        "success-color": "#4BB543",
        "custom-prize-pot": "rgb(118, 69, 217)",
      },
      backgroundImage: {
        "custom-background-home-light":
          "linear-gradient(#e0eafc 22%, #cfdef3 100%)",
        "custom-background-start-home":
          "-webkit-linear-gradient(top, rgb(118, 69, 217) 0%, rgb(69, 42, 122) 100%)",
        "custom-background-start-home-dark":
          "radial-gradient(103.12% 50% at 50% 50%, #21193a 0,#191326 100%)",
        "custom-number-text":
          "linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)",
        "custom-get-ticket-background":
          "linear-gradient(rgb(118, 69, 217) 0%, rgb(81, 33, 177) 100%)",
        "custom-title-draw-light": "linear-gradient(111.68deg,#f2ecf2,#e8f2f6)",
        "custom-winner-background":
          "linear-gradient(139.73deg,rgb(49, 61, 92) 0%, rgb(61, 42, 84) 100%)",
        "custom-round-background-dark":
          "linear-gradient(rgb(67, 69, 117) 0%, rgb(102, 87, 141) 100%)",
        "custom-round-background":
          "linear-gradient(rgb(203, 215, 239) 0%, rgb(154, 159, 208) 100%)",
        "custom-title-background-dark":
          "linear-gradient(166.77deg,#3b4155,#3a3045)",
        "custom-title-modal-background":
          "linear-gradient(139.73deg, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%)",
      },
      width: {
        "p-99": "99%",
      },
      height: {
        "p-98": "98%",
        "p-97": "97%",
        "px-540": "540px",
      },

      "z-index": {
        "p-1": 1,
      },
      keyframes: {
        glowing: {
          "0%, 100%": { "box-shadow": "0 0 2px #169099" },
          "50%": { "box-shadow": "0 0 8px #169099" },
        },
        shake: {
          "0%": {
            transform: "translate(1px, 1px) rotate(0deg)",
          },
          "10%": {
            transform: " translate(-1px, -2px) rotate(-1deg)",
          },
          "20%": {
            transform: "translate(-3px, 0px) rotate(1deg)",
          },
          "30%": {
            transform: "translate(3px, 2px) rotate(0deg)",
          },
          "40%": {
            transform: "translate(1px, -1px) rotate(1deg)",
          },
          "50%": {
            transform: "translate(-1px, 2px) rotate(-1deg)",
          },
          "60%": {
            transform: "translate(-3px, 1px) rotate(0deg)",
          },
          "70%": {
            transform: "translate(3px, 1px) rotate(-1deg)",
          },
          "80%": {
            transform: "translate(-1px, -1px) rotate(1deg)",
          },
          "90%": {
            transform: "translate(1px, 2px) rotate(0deg)",
          },
          "100%": {
            transform: "translate(1px, -2px) rotate(-1deg)",
          },
        },
        rotation: {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "1",
            "border-radius": "0",
          },
          "100%": {
            transform: "translateY(-1000px) rotate(720deg)",
            opacity: "0",
            "border-radius": "50%",
          },
        },
        rotationButton: {
          "0%": {
            transform: "rotate(4deg)",
          },
          "13% ": {
            transform: "rotate(2deg)",
          },
          "26%": {
            transform: "rotate(0deg)",
          },
          "39%": {
            transform: "rotate(-2deg)",
          },
          "52%": {
            transform: "rotate(-4deg)",
          },
          "65%": {
            transform: "rotate(-2deg)",
          },
          "78%": {
            transform: "rotate(0deg)",
          },
          "91%": {
            transform: "rotate(2deg)",
          },
          "100%": {
            transform: "rotate(4deg)",
          },
        },
        slideRightToLeft: {
          "0%": {
            right: "-120px",
          },
          "100%": {
            right: "48px",
          },
        },
      },
      animation: {
        glowing: "glowing 1500ms ease-in-out infinite",
        shake: "shake 6000ms ease-in-out infinite",
        rotation: "rotation 25s linear infinite",
        rotationButton: "rotationButton 4s linear infinite",
        rotationFast: "rotation 6s linear infinite",
        slideRightToLeft: "slideRightToLeft 0.2s linear",
      },
    },
  },
  plugins: [],
};
