import { templateLoader } from 'template-loader';

class HomeController {
    constructor(templateLoader) {
        this.templateLoader = templateLoader;
    }

    home(router) {
        templateLoader.loadTemplate('home')
            .then(template => $('#content').html(template));
    }
}

const homeController = new HomeController(templateLoader);
export { homeController };