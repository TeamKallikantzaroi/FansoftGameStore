import { userController } from 'user-controller';

import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';
import { utils } from 'utils';

const { expect } = chai;

describe("userController tests", () => {

    describe("Correct userController object tests", () => {

        describe("properties", () => {
            it("Expect userController to exist", () => {
                expect(userController).to.exist;
            });
            it("Expect userController to be an object", () => {
                expect(userController).to.be.an('object');
            });
            it("Expect userController to inherit data service", () => {
                expect(userController).to.be.an.instanceof(Controller);
            });

        });
    });
});