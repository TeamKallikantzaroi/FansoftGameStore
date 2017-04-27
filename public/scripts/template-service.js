import { requester } from 'requester';

class TemplateService {
    constructor(requester) {
        this.requester = requester;
        this.cache = {};
    }

    loadTemplate(name) {
        // if (this.cache[name]) {
        //     $('#content').html(this.cache[name]);
        //     return;
        // }

        this.requester.getTemplate(name)
            .then((template) => this.cache[name] = template)
            .then(() => $('#content').html(this.cache[name]));
    }
}

const templateService = new TemplateService(requester);
export { templateService };