module.exports = {
  starsandstripesdriving: {
    email: "starsandstripesdriving@gmail.com",
    password: "starsandstripes123",
    template: {
      sudject: "Customer Request",
      body: (params) => {
        const {name, message, contact} = params;
        return `
          Hi,

          My name is ${name}

          ${message}

          You can reach me at ${contact}
        `
      }
    }
  },
  blakio: {
    email: "blakiollc@gmail.com",
    password: "blakio2019",
    template: {
      sudject: "Customer Request",
      body: (params) => {
        const {name, message, contact} = params;
        return `
          Hi,

          My name is ${name}

          ${message}

          You can reach me at ${contact}
        `
      }
    }
  }
}
