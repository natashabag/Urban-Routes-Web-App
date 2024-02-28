module.exports = {
  getPhoneNumber: function (countryCode) {
    const number = Math.floor(1000000000 + Math.random() * 9000000000);
    return `${countryCode}${number}`;
  },
  getElementByText: async function (obj) {
    return await $(`div=${obj.toString()}`);
  },
  getCardNumber: function () {
    const cardNumber = Math.floor(100000000000 + Math.random() * 9000000000000);
    return `${cardNumber}`;
  },
  getCVC: function () {
    const cvcNumber = Math.floor(10 + Math.random() * 90);
    return `${cvcNumber}`;
  },
  writeMessage: function () {
    const message = "Hi! Thanks for picking me up!";
    return `${message}`;
  },
};
