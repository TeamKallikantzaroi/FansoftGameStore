mocha.setup('bdd');

Promise.all([
        System.import('userData-service.tests'),
    ])
    .then(() => mocha.run());