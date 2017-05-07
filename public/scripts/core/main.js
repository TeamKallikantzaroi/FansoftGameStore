import { homeController } from 'home-controller';
import { userController } from 'user-controller';
import { marketController } from 'market-controller';

userController.checkUser();

const router = $.sammy(function() {
    //this.before(() => utils.showProgressbar());

    this.get('#/home', (router) => homeController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/user', (router) => userController.getUserInfo(router));
    this.get('#/games', (context) => marketController.getGames(context));

    this.get('#/', () => this.redirect('#/home'));
});

router.run('#/home');