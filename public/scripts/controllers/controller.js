class Controller {
    constructor(dataService, templateLoader, notificator, validator) {
        if (typeof validator !== 'object' || validator === null) {
            throw new Error("Validator must be a valid object!");
        }
        this.validator = validator;

        this.dataService = dataService;
        this.templateLoader = templateLoader;
        this.notificator = notificator;
    }

    get dataService() {
        return this._dataService;
    }
    set dataService(x) {
        this.validator.validateNullObject(x, "Data service must not be null");

        this._dataService = x;
    }

    get templateLoader() {
        return this._templateLoader;
    }
    set templateLoader(x) {
        this.validator.validateNullObject(x, "Template loader must not be null");

        this._templateLoader = x;
    }

    get notificator() {
        return this._notificator;
    }
    set notificator(x) {
        this.validator.validateNullObject(x, "Notificator must not be null");

        this._notificator = x;
    }
}

export { Controller };