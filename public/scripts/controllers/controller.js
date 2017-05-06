class Controller {
    constructor(userDataService, marketDataService, templateLoader, notificator, validator) {
        if (typeof validator !== 'object' || validator === null) {
            throw new Error("Validator must be a valid object!");
        }
        this.validator = validator;

        this.userDataService = userDataService;
        this.marketDataService = marketDataService;
        this.templateLoader = templateLoader;
        this.notificator = notificator;
    }

    get userDataService() {
        return this._userDataService;
    }
    set userDataService(x) {
        this.validator.validateNullObject(x, "User data service must not be null");

        this._userDataService = x;
    }

    get marketDataService() {
        return this._marketDataService;
    }
    set marketDataService(x) {
        this.validator.validateNullObject(x, "Market data service must not be null");

        this._marketDataService = x;
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