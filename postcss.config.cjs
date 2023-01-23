module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {
            content: ["./src/**/*.tsx"],
        },
        'autoprefixer': {},
        'cssnano': {}
    },
    extract: false,
    modules: false,
    autoModules: false,
    minimize: true,
    inject: false,
}