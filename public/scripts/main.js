import { templateService } from 'template-service';

const router = $.sammy(function() {
    this.get('#/login', () => templateService.loadTemplate('login'));
    this.get('#/home', () => templateService.loadTemplate('home'));
    this.get('#/', () => this.redirect('#/home'));
});

router.run('#/home');