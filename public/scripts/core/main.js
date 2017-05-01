import { userController } from 'user-controller';
import { marketController } from 'market-controller';

userController.checkUser();

const router = $.sammy(function() {
    //this.before(() => utils.showProgressbar());

    this.get('#/home', (router) => userController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/user', (router) => userController.userProfile(router));

    this.get('#/android/:page', (context) => marketController.androidGames(context));
    this.get('#/iOS/:page', (context) => marketController.iOSGames(context));

    this.get('#/', () => this.redirect('#/home'));
});

router.run('#/home');