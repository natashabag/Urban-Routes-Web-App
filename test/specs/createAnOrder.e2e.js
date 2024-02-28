const page = require("../../page");
const helper = require("../../helper");
/*
describe("Create an order", () => {
  it("should open phone number modal", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumberButton = await $(page.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const pnoneNumberModal = await $(page.phoneNumberModal);
    await expect(pnoneNumberModal).toBeExisting();
  });

  it("should save the phone", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
  });
});
*/

describe("Ordering Taxi-Supportive plan", () => {
  it("should set the address", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await expect(page.fromField).toHaveValue("East 2nd Street, 601");
    await expect(page.toField).toHaveValue("1300 1st St");
  });

  it("should select supportive plan", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await expect(page.supportiveButton).toHaveElementClass("active");
  });

  it("should fill phone number", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
  });

  it("should add a credit card", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const cardNumber = helper.getCardNumber();
    const cvcNumber = helper.getCVC();
    await page.addCard(cardNumber, cvcNumber);
    //const cardOneCheckBox = await $(page.cardOneCheckBox);
    await expect(await $(page.paymentButton)).toBeExisting();
  });

  it("should a message to the driver", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const message = helper.writeMessage();
    page.sendMessage(message);
    await expect(page.messageField).toHaveValue(
      "Hi! Thanks for picking me up!"
    );
  });

  it("should order blanket and handkerchiefs", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await page.orderBlanket();
    //what is the result?
  });
  it("should order two ice creams", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await page.orderIceCreams();
    await expect(page.iceCreamNum).toHaveValue(2);
  });
  it("should display car search modal", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await browser.pause(3000);
    await page.clickSupportive();
    await browser.pause(3000);
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await browser.pause(3000);
    const cardNumber = helper.getCardNumber();
    const cvcNumber = helper.getCVC();
    await page.addCard(cardNumber, cvcNumber);
    const closeButton = await $(page.closeButton);
    await closeButton.waitForClickable();
    await closeButton.click();
    await browser.pause(3000);
    await page.orderBlanket();
    await browser.pause(3000);
    await page.orderIceCreams();
    await browser.pause(3000);
    const orderButton = await $(page.orderButton);
    await orderButton.waitForClickable();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await expect(carSearchModal).toBeExisting();
  });
});
