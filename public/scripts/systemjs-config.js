SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        'main': './scripts/main.js',
        'requester': './scripts/requester.js',
        'template-service': './scripts/template-service.js',
        'validator': './scripts/validator.js',
        'notificator': './scripts/notificator.js',

        'user-controller': './scripts/user-controller.js',
        'user-service': './scripts/user-service.js'
    }
});

window.addEventListener('load', () => SystemJS.import('main'));