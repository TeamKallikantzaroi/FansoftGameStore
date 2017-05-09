mocha.setup('bdd');

Promise.all([
        System.import('user-controller.tests'),
        System.import('userProfile-controller.tests'),
        System.import('market-controller.tests'),

        System.import('userData-service.tests'),
        System.import('userProfile-service.tests'),
        System.import('marketData-service.tests'),
    ])
    .then(() => mocha.run());