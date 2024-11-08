let UserModel = require("../models/users");

module.exports.create = async function (req, res, next) {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);
    res.json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.list = async function (req, res, next) {
  try {
    let list = await UserModel.find({}, "-password");

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.userGet = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    req.user = await UserModel.findOne({ _id: uID }, "-password");
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.userByID = async function (req, res, next) {
  res.json(req.user);
};

module.exports.update = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    let updateUser = new UserModel(req.body);
    updateUser._id = uID;

    let result = await UserModel.updateOne({ _id: uID }, updateUser);

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "User updated successfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not updated. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.remove = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    let result = await UserModel.deleteOne({ _id: uID });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
