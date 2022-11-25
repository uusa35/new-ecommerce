const colors = require('tailwindcss/colors')
module.exports = {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    // safelist: [
    //     {
    //         pattern: /(bg|text|fill|border|shadow)-(pink|blue|amber|cyan|corn|hippie-blue|gray|midnight|white|black)-(50|100|200|300|400|500|600|700|800|900)/,
    //         variants: ['lg', 'hover', 'focus', 'lg:hover','dark'],
    //     },
    // ],
    theme: {
        extend: {
            screens: {
                print: { raw: 'print' },
            },
        },
        fontFamily: {
            'Tajawal-Medium': ['Tajawal-Medium', 'sans-serif'],
            'GESSTwoBold': ['GESSTwoBold', 'sans-serif'],
            'GESSTwoMedium': ['GESSTwoMedium', 'sans-serif'],
            'DroidArabicKufi': ['DroidArabicKufi', 'sans-serif'],
            'droid-bold': ['DroidArabicKufi-bold', 'sans-serif'],
            'Tajawal-Light': ['Tajawal-Light', 'sans-serif'],
            'AR-Almarai-Font': ['AR-Almarai-Font', 'sans-serif'],
            'AR-BBC-Regular' : ['AR-BBC-Regular', 'sans-serif'],
            'AR-Almarai-Font' : ['AR-Almarai-Font', 'sans-serif'],
            // 'AlMohanad': ['AlMohanad', 'sans-serif'],
            'Ar-Ith': ['Ar-Ith', 'sans-serif'],
            'bein-ar-black_zzbzbbedb0': ['bein-ar-black_0', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            black: colors.black,
            gray: colors.stone,
            indigo: colors.indigo,
            red: colors.red,
            white: colors.white,
            slate : colors.slate
        },
        animations: {
            spin: 'spin 6s liner once',
        },
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],
            animation: ['hover', 'group-hover'],
        }
    },
    plugins: [
        // require('tailwindcss-rtl'),
        require('tailwindcss-dir')(),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
    ],
}
