SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': './scripts/core/main.js',

        'controller': './scripts/controllers/controller.js',
        'user-controller': './scripts/controllers/user-controller.js',
        'market-controller': './scripts/controllers/market-controller.js',

        'data-service': './scripts/dataServices/data-service.js',
        'userData-service': './scripts/dataServices/userData-service.js',
        'marketData-service': './scripts/dataServices/marketData-service.js',

        'requester': './scripts/utils/requester.js',
        'template-loader': './scripts/utils/template-loader.js',
        'notificator': './scripts/utils/notificator.js',
        'validator': './scripts/utils/validator.js',
        'utils': './scripts/utils/utils.js'
    }
});

window.addEventListener('load', () => SystemJS.import('main'));