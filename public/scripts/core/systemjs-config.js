SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': './scripts/core/main.js',

        'controller': './scripts/controllers/controller.js',
        'user-controller': './scripts/controllers/user-controller.js',
        'games-controller': './scripts/controllers/games-controller.js',

        'data-service': './scripts/dataServices/data-service.js',
        'userData-service': './scripts/dataServices/userData-service.js',
        'gamesData-service': './scripts/dataServices/gamesData-service.js',

        'requester': './scripts/utils/requester.js',
        'template-loader': './scripts/utils/template-loader.js',
        'notificator': './scripts/utils/notificator.js',
        'validator': './scripts/utils/validator.js',
    }
});

window.addEventListener('load', () => SystemJS.import('main'));