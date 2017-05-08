mocha.setup('bdd');

Promise.all([
        System.import('userData-service.tests'),
        System.import('marketData-service.tests')
    ])
    .then(() => mocha.run());