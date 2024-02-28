module.exports = {
  // Inputs
  fromField: "#from",
  toField: "#to",
  phoneNumberField: "#phone",
  codeField: "#code",
  cvcNumField: ".card-second-row #code",
  cardNumField: "#number",
  messageField: "#comment",
  // Buttons
  callATaxiButton: "button=Call a taxi",
  phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
  nextButton: "button=Next",
  confirmButton: "button=Confirm",
  supportiveButton: "//div/div[3]/div[3]/div[2]/div[1]/div[5]",
  paymentButton: ".pp-text",
  addCardButton: "div=Add card",
  linkButton: "button=Link",
  blanketSlider: ".switch",
  blanketSliderStatus: ".switch-input",
  iceCreamPlusButton: "div=+",
  orderButton: ".smart-button",
  // Modals
  phoneNumberModal: ".modal",
  carSearchModal: ".order-body",
  //Other
  driverWindow: ".order-subbody",

  // Functions
  fillAddresses: async function (from, to) {
    const fromField = await $(this.fromField);
    await fromField.setValue(from);
    const toField = await $(this.toField);
    await toField.setValue(to);
    const callATaxiButton = await $(this.callATaxiButton);
    await callATaxiButton.waitForDisplayed();
    await callATaxiButton.click();
  },
  fillPhoneNumber: async function (phoneNumber) {
    const phoneNumberButton = await $(this.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const phoneNumberModal = await $(this.phoneNumberModal);
    await phoneNumberModal.waitForDisplayed();
    const phoneNumberField = await $(this.phoneNumberField);
    await phoneNumberField.waitForDisplayed();
    await phoneNumberField.setValue(phoneNumber);
  },
  submitPhoneNumber: async function (phoneNumber) {
    await this.fillPhoneNumber(phoneNumber);
    // we are starting interception of request from the moment of method call
    await browser.setupInterceptor();
    await $(this.nextButton).click();
    // we should wait for response
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    const codeField = await $(this.codeField);
    // collect all responses
    const requests = await browser.getRequests();
    // use first response
    await expect(requests.length).toBe(1);
    const code = await requests[0].response.body.code;
    await codeField.setValue(code);
    await $(this.confirmButton).click();
  },
  clickSupportive: async function () {
    const supportiveButton = await $(this.supportiveButton);
    await supportiveButton.waitForDisplayed();
    await supportiveButton.click();
  },
  addCard: async function (cardNumber, cvcNumber) {
    const paymentButton = await $(this.paymentButton);
    await paymentButton.scrollIntoView();
    await paymentButton.waitForClickable();
    await paymentButton.click();
    await expect(paymentButton).toBeExisting();
    const addCardButton = await $(this.addCardButton);
    await addCardButton.waitForClickable();
    await addCardButton.click();
    //add cardnum
    const cardNumField = await $(this.cardNumField);
    await cardNumField.waitForDisplayed();
    await cardNumField.setValue(cardNumber);
    //add codenum
    const cvcNumField = await $(this.cvcNumField);
    await cvcNumField.waitForDisplayed();
    await cvcNumField.setValue(cvcNumber);
    await browser.keys(["\uE004"]);
    const linkButton = await $(this.linkButton);
    await linkButton.waitForClickable();
    await linkButton.click();
  },
  sendMessage: async function (message) {
    const messageField = await $(this.messageField);
    await messageField.scrollIntoView();
    await messageField.waitForDisplayed();
    await messageField.setValue(message);
  },
  orderBlanket: async function () {
    const blanketSlider = await $(this.blanketSlider);
    await blanketSlider.scrollIntoView();
    await blanketSlider.waitForClickable();
    await blanketSlider.click();
  },
  orderIceCreams: async function () {
    const iceCreamPlusButton = await $(this.iceCreamPlusButton);
    await iceCreamPlusButton.scrollIntoView();
    await iceCreamPlusButton.waitForClickable();
    await iceCreamPlusButton.click();
    await iceCreamPlusButton.click();
  },
};
