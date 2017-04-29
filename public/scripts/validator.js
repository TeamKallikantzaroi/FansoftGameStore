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
}

const validator = new Validator();
export { validator };