module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {
            colors: {
                'color-dark': '#1F1F1F',
                '@dark-5': '#F5F5F5',
                '@dark-10': ' #F0F0F0',
                '@dark-15': '#E1E1E1',
                '@dark-20': '#D7D7D7',
                '@dark-30': '#C2C2C2',
                '@dark-35': '#ADADAD',
                '@dark-40': '#999999',
                '@dark-45': '#858585',
                '@dark-50': '#707070',
                '@dark-60': '#5C5C5C',
                '@dark-70': '#474747',
                '@dark-80': '#333333',
                '@dark-85': '#292929',
                '@dark-90': '#1F1F1F',
                '@dark-100': '#141414',

                // Primary
                '@primary-1': '#0010f7',
                '@primary-2': '#0063f7',
                '@primary-3': '#55b1f3',
                '@primary-4': '#ebfafa',

                // Secondary
                '@secondary-1': '#c903ff',
                '@secondary-2': '#e26bf5',
                '@secondary-3': '#f7c2ff',
                '@secondary-4': '#fdeffc',

                // Danger
                '@danger-1': '#ff0022',
                '@danger-2': '#ff455e',
                '@danger-3': '#ff8b9a',
                '@danger-4': '#ffe7ea',
                // Box shadow
                '@shadow-input': '0px 0px 10px rgba(10, 175, 255, 0.35);',

                // Border
                '@border-dark': '#dfe6e9'
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
