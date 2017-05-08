import { userProfileService } from 'userProfile-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("userProfileService tests", () => {

    describe("Correct userProfileService object tests", () => {
        it("Expect userProfileService to exist", () => {
            expect(userProfileService).to.exist;
        });
        it("Expect userProfileService to be an object", () => {
            expect(userProfileService).to.be.an('object');
        });
        it("Expect userProfileService to inherit data service", () => {
            expect(userProfileService).to.be.an.instanceof(DataService);
        });

    });
});