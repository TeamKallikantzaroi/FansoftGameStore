import { userController } from 'user-controller';
import { gamesController } from 'games-controller';
import { utils } from 'utils';

const router = $.sammy(function() {
    this.before(() => utils.showProgressbar());

    this.get('#/home', (router) => userController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/my-cart', (router) => userController.myCart(router));

    this.get('#/android', (router) => gamesController.androidGames(router));
    this.get('#/iOS', (router) => gamesController.iOSGames(router));

    this.get('#/', () => this.redirect('#/home'));
});

userController.checkUser();
router.run('#/home');