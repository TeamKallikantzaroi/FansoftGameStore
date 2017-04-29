SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': './scripts/core/main.js',

        'user-controller': './scripts/controllers/user-controller.js',
        'games-controller': './scripts/controllers/games-controller.js',

        'template-service': './scripts/services/template-service.js',
        'userData-service': './scripts/services/userData-service.js',
        'gameData-service': './scripts/services/gameData-service.js',

        'requester': './scripts/utils/requester.js',
        'validator': './scripts/utils/validator.js',
        'notificator': './scripts/utils/notificator.js',
    }
});

window.addEventListener('load', () => SystemJS.import('main'));