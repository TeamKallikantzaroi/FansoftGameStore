import { requester } from 'requester';

class TemplateService {
    constructor(requester) {
        this.requester = requester;
        this.cache = {};
    }

    loadTemplate(name) {
        // if (this.cache[name]) {
        //     return Promise.resolve(this.cache[name]);
        // }

        return this.requester.getTemplate(name)
            .then((template) => {
                this.cache[name] = template;
                return template;
            });
    }
}

const templateService = new TemplateService(requester);
export { templateService };