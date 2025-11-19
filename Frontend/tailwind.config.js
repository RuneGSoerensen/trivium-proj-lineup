/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            /* -------------------------------
               FONT
            -------------------------------- */
            fontFamily: {
                ui: ["Helvetica Now Display", "system-ui", "sans-serif"],
            },

            fontSize: {
                h1: "1.5rem",     // 24px
                h2: "1.25rem",    // 20px
                h3: "1.125rem",   // 18px
                subtitle: "1rem", // 16px
                body: "1rem",     // 16px
            },

            fontWeight: {
                regular: 400,
                semibold: 600,
            },

            /* -------------------------------
               SPACING (design system scale)
            -------------------------------- */
            spacing: {
                2: "0.125rem",   // 2px
                4: "0.25rem",    // 4px
                6: "0.375rem",   // 6px
                8: "0.5rem",     // 8px
                10: "0.625rem",  // 10px
                14: "0.875rem",  // 14px
                16: "1rem",      // 16px
                18: "1.125rem",  // 18px
                20: "1.25rem",   // 20px
                24: "1.5rem",    // 24px
                26: "1.625rem",  // 26px
            },

            /* -------------------------------
               COLORS
            -------------------------------- */
            colors: {
                primary: {
                    crocus: "#FFCF70",
                    blackberry: "#4D3F54",
                },
                neutral: {
                    black: "#1E1E1E",
                    white: "#FFFFFF",
                    light: "#F7F6F6",
                    grey: "#555555",
                    glacier: "#EDEDED",
                },
                secondary: {
                    darkgreyred: "#575252",
                    darkcyanblue: "#3F4D54",
                    darkblue: "#3F4254",
                    darkpinkred: "#543F40",
                    darkorange: "#5D4C43",
                },
                accent: {
                    maroon: "#800000",
                    aquamarine: "#40826D",
                },
            },

            /* -------------------------------
               BORDER RADIUS
            -------------------------------- */
            borderRadius: {
                chip: "9999px",
                pill: "9999px",
                card: "24px",
                button: "16px",
            },

            /* -------------------------------
               ICON SIZES
            -------------------------------- */
            width: {
                icon: "1.25rem", // 20px
            },
            height: {
                icon: "1.25rem",
            },
        },
    },
    plugins: [],
};