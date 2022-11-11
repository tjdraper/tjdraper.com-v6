module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'tjd-red': {
                    100: '#f5c4c0',
                    200: '#eb8a81',
                    300: '#e15042',
                    400: '#bd2b1d',
                    500: '#7f1d14',
                    600: '#65170f',
                    700: '#4c110b',
                    800: '#320b07',
                    900: '#190503',
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.700'),
                        a: {
                            color: theme('colors.tjd-red.500'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.tjd-red.300'),
                            }
                        },
                        'ul>li>:first-child': {
                            marginTop: 0,
                            marginBottom: 0,
                        },
                        'ul>li>:last-child': {
                            marginTop: 0,
                            marginBottom: 0,
                        },
                        blockquote: {
                            color: theme('colors.gray.500'),
                        },
                        'h1, h2, h3, h4, h5, h6': {
                            color: theme('colors.tjd-red.700'),
                        },
                        '.footnotes': {
                            'border-top': 'dashed',
                            'border-top-color': theme('colors.gray.200'),
                            'font-size': '0.7rem',
                            'line-height': '1.2rem',
                            'margin-top': '4rem',
                            'padding-top': '2rem',
                        },
                        '.data-footnote-backref': {
                            'text-decoration': 'none',
                        }
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
