class DataService {
    constructor(requester, validator) {
        if (typeof validator !== 'object' || validator === null) {
            throw new Error("Validator must be a valid object!");
        }

        this.validator = validator;
        this.requester = requester;
    }

    get requester() {
        return this._requester;
    }
    set requester(x) {
        this.validator.validateNullObject(x, "Requester must not be null");

        this._requester = x;
    }
}

export { DataService };