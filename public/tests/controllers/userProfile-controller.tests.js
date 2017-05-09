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
        it("Expect userProfileController to have home() function", () => {
            expect(userProfileController.getUserProfileInfo).to.be.a('function');
        });
        it("Expect userProfileController to have home() function", () => {
            expect(userProfileController.fillUserProfile).to.be.a('function');
        });
    });

    describe("Behavior tests", () => {

        describe("getUserProfileInfo() tests", () => {
            let mockedLoader,
                mockedShowProgressbar,
                mockedHideProgressbar,
                mockedGetCurrentUserInfo,
                mockedFillUserProfile;

            beforeEach(() => {
                mockedLoader = sinon.stub(templateLoader, 'loadTemplate');
                mockedLoader.returns(Promise.resolve('html'));

                mockedGetCurrentUserInfo = sinon.stub(userProfileService, 'getCurrentUserInfo');
                mockedGetCurrentUserInfo.returns(Promise.resolve('data'));

                mockedFillUserProfile = sinon.stub(userProfileController, 'fillUserProfile');

                mockedShowProgressbar = sinon.stub(utils, 'showProgressbar');
                mockedShowProgressbar.returns(Promise.resolve());

                mockedHideProgressbar = sinon.stub(utils, 'hideProgressbar');
            });

            afterEach(() => {
                mockedLoader.restore();
                mockedShowProgressbar.restore();
                mockedHideProgressbar.restore();
                mockedGetCurrentUserInfo.restore();
                mockedFillUserProfile.restore();
            });

            it("Expect getUserProfileInfo() to call templateLoader() twice", (done) => {
                userProfileController.getUserProfileInfo()
                    .then(() => {
                        expect(mockedLoader).to.been.calledTwice;
                    })
                    .then(done, done);
            });
            it("Expect getUserProfileInfo() to call getCurrentUserInfo() once", (done) => {
                userProfileController.getUserProfileInfo()
                    .then(() => {
                        expect(mockedGetCurrentUserInfo).to.been.calledOnce;
                    })
                    .then(done, done);
            });
            it("Expect getUserProfileInfo() to call show and hide progressbar functions once", (done) => {
                userProfileController.getUserProfileInfo()
                    .then(() => {
                        expect(mockedShowProgressbar).to.been.calledOnce;
                        expect(mockedHideProgressbar).to.been.calledOnce;
                    })
                    .then(done, done);
            });
        });

        describe("fillUserProfile() tests", () => {});
    });
});