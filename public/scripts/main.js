import { templateService } from 'template-service';
import { userController } from 'user-controller';

const router = $.sammy(function() {
    //this.before(() => userController.checkUser());
    this.get('#/home', () => templateService.loadTemplate('home'));
    this.get('#/login', () => templateService.loadTemplate('login'));
    this.get('#/', () => this.redirect('#/home'));
});

$('#content').on('click', '#sign-up', () => userController.register());
$('#content').on('click', '#sign-in', () => userController.login());

userController.checkUser();
router.run('#/home');