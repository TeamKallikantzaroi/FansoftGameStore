import { templateService } from 'template-service';
import { userController } from 'user-controller';

const router = $.sammy(function() {
    this.get('#/login', () => templateService.loadTemplate('login'));
    this.get('#/home', () => templateService.loadTemplate('home'));
    this.get('#/', () => this.redirect('#/home'));
});

$('#content').on('click', '#sign-up', () => userController.register());
$('#content').on('click', '#sign-in', () => userController.login());

router.run('#/home');