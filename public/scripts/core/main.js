import { userController } from 'user-controller';
import { marketController } from 'market-controller';

userController.checkUser();

const router = $.sammy(function() {
    this.before(() => $('#btn-share-facebook').addClass('hidden'));

    this.get('#/home', (router) => userController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/user', (router) => userController.getUserProfileInfo(router));
    this.get('#/games', (router) => marketController.getMarketInfo(router));

    this.get('#/', () => this.redirect('#/home'));
});

router.run('#/home');