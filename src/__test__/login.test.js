/* eslint-disable no-undef */
const { stub, assert } = require("sinon");
const SequelizeMock = require("sequelize-mock");
const { userLogin } = require("../controllers/userControllers");
const DBConnectionMock = new SequelizeMock();
const { User } = require("../models");

const UserMock = DBConnectionMock.define(
  "User",
  {
    id: "3c9d7415-16de-4066-b910-594c87b29b5e",
    email: "josh.smith@optimumparners.co",
    password: "password",
  },
  {
    instanceMethods: {
      myTestFunc: function () {
        return "Test User";
      },
    },
  }
);

describe("unit testing /user/login route", function () {
  it("login controller", async function () {
    const save = stub(User);
    let results;
    const mockRequest = {
      body: {
        email: "josh.smith@optimumparners.co",
        password: "password",
      },
    };
    await userLogin(mockRequest, (res) => (results = res));
    assert.calledWith(save, UserMock);
    save.restore();
    expect(results).toHaveProperty("id");
  });
});
