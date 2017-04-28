import { userController } from 'user-controller';

const router = $.sammy(function() {
    this.get('#/home', (router) => userController.home(router));
    this.get('#/login', (router) => userController.login(router));
    this.get('#/', () => this.redirect('#/home'));
});

userController.checkUser();
router.run('#/home');