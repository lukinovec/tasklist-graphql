module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            maxHeight: {
                '1/2': '50%',
                '2/3': '66.6%',
                '5/6': '83.3%'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
