import { requester } from 'requester';

class TemplateService {
    constructor(requester) {
        this.requester = requester;
        this._loadHeader();
        this.cache = {};
    }

    _loadHeader() {
        this.requester.getTemplate('header')
            .then(template => $('.container').html(template));
    }

    loadTemplate(name) {
        if (this.cache[name]) {
            $('#content').html(this.cache[name]);
            return;
        }

        this.requester.getTemplate(name)
            .then((template) => this.cache[name] = template)
            .then(() => $('#content').html(this.cache[name]));
    }
}

const templateService = new TemplateService(requester);
export { templateService };