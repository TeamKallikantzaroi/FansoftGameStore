import { userProfileController } from 'userProfile-controller';

import { Controller } from 'controller';
import { userProfileService } from 'userProfile-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

import { userDataService } from 'userData-service';

const { expect } = chai;

describe("userProfileController tests", () => {

    describe("Correct userProfileController object tests", () => {

        it("Expect userProfileController to exist", () => {
            expect(userProfileController).to.exist;
        });
        it("Expect userProfileController to be an object", () => {
            expect(userProfileController).to.be.an('object');
        });
        it("Expect userProfileController to inherit Controller", () => {
            expect(userProfileController).to.be.an.instanceof(Controller);
        });

    });
});