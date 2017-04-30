import { userController } from 'user-controller';
import { marketController } from 'market-controller';
import { utils } from 'utils';

const router = $.sammy(function() {
    this.before(() => utils.showProgressbar());

    this.get('#/home', (router) => userController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/my-cart', (router) => userController.myCart(router));

    this.get('#/android/:page', (context) => marketController.androidGames(context));
    this.get('#/iOS/:page', (context) => marketController.iOSGames(context));

    this.get('#/', () => this.redirect('#/home'));
});

userController.checkUser();
router.run('#/home');