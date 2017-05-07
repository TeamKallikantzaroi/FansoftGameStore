class Validator {
    validateUserInput(input, minLen, maxLen, pattern, message) {
        return new Promise((resolve, reject) => {
            const validInput = (minLen <= input.length) && (input.length <= maxLen) && (pattern.test(input));

            if (validInput) {
                resolve();
            } else {
                reject(message);
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