module.exports = {
    content: [
        "./pages/*.{js,jsx}",
        "./pages/**/*.{js,jsx}",
        "./base/*.{js,jsx}",
        "./base/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: "#0099cc",
                },
            },
        },
    },
    plugins: [],
};
