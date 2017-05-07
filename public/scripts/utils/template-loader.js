class TemplateLoader {
    constructor(requester) {
        this.cache = {};
    }

    loadTemplate(name) {
        if (this.cache[name]) {
            return Promise.resolve(this.cache[name]);
        }

        return new Promise((resolve, reject) => {
                $.ajax({
                        url: `../templates/${name}.handlebars`,
                        type: 'GET',
                    })
                    .done(resolve)
                    .fail(reject);
            })
            .then((template) => {
                this.cache[name] = template;
                return template;
            });
    }
}

const templateLoader = new TemplateLoader();
export { templateLoader };