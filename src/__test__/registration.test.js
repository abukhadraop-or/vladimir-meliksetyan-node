const { stub, assert } = require("sinon");
const SequelizeMock = require("sequelize-mock");
const { registerUser } = require("../controllers/userControllers");
const DBConnectionMock = new SequelizeMock();
const { User } = require("../models");

const UserMock = DBConnectionMock.define(
  "User",
  {
    userName: "test",
    email: "test@test.test",
    password: "testPassword",
  },
  {
    instanceMethods: {
      myTestFunc: function () {
        return "Test User";
      },
    },
  }
);

describe("unit testing /user/register route", () => {
  it("register controller", async () => {
    const save = stub(User);
    let results;
    const mockRequest = {
      body: {
        userName: "test",
        email: "test@test.test",
        password: "testPassword",
      },
    };
    await registerUser(mockRequest, (res) => (results = res));
    assert.calledWith(save, UserMock);
    save.restore();
    expect(results).toHaveProperty("id");
  });
});
