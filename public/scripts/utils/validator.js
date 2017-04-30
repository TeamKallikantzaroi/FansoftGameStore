class Validator {
    validateUserInput(input, minLen, maxLen, pattern, message) {
        return new Promise((resolve, reject) => {
            const invalidName = (input.length < minLen) || (input.length > maxLen) || (!pattern.test(input));

            if (false) {
                reject(message);
            } else {
                resolve();
            }
        });
    }

    validateNullObject(object, message) {
        if (typeof object !== 'object' || object === null) {
            throw new Error(message);
        }
    }
}

const validator = new Validator();
export { validator };