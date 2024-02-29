const page = require("../../page");
const helper = require("../../helper");

describe("Ordering Taxi-Supportive plan", () => {
  it("should set the address", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await expect($(page.fromField)).toHaveValue("East 2nd Street, 601");
    await expect($(page.toField)).toHaveValue("1300 1st St");
  });
  it("should select supportive plan", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await expect(await $(page.supportiveButton)).toHaveElementClass("active");
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
    await expect(await $(page.paymentButton)).toBeExisting();
  });
  it("should a message to the driver", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const message = helper.writeMessage();
    page.sendMessage(message);
    await expect(await $(page.messageField)).toHaveValue(message);
  });

  it("should order blanket and handkerchiefs", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await page.orderBlanket();
    await expect($(page.blanketSliderStatus)).toBeChecked();
  });
  it("should order two ice creams", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.clickSupportive();
    await page.orderIceCreams();
    const iceCreamQty = 2;
    await expect($(`div=${iceCreamQty}`)).toBeExisting();
  });
  it("should display car search modal", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const orderButton = await $(page.orderButton);
    await orderButton.waitForClickable();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await expect(await $(carSearchModal)).toBeDisplayed();
  });
  it("should  wait for driver info to appear in the modal", async () => {
    await browser.url(`/`);
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const orderButton = await $(page.orderButton);
    await orderButton.waitForClickable();
    await orderButton.click();
    const driverWindow = await $(page.driverWindow);
    await browser.pause(40000);
    await expect(await $(driverWindow)).toBeExisting();
  });
});
