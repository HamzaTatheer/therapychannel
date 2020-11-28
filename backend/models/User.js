let mongoose = require("mongoose");
const { ObjectID } = require("mongoose/lib/schema/index");

/**
 * -------------- Model Info ----------------
 */

/**
 *
 * name - The plain text password
 * email - The email stored in the database
 * hash - The salt stored in the database
 * salt - The salt stored in the database
 *
 */

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, require: true },
  dob: {
    day: { type: String, required: false },
    month: { type: String, required: false },
    year: { type: String, required: false },
  },
  gender: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  role: { type: String, required: false },
  userData: {},
  chattings: [
    {
      _id: { type: ObjectID },
      name: { type: String },
    },
  ],
});

userSchema.statics.DoesUserExist = async function (condition) {
  let user_exists;
  await User.findOne(condition, function (err, result) {
    if (err) {
      user_exists = false;
    } else if (result) {
      user_exists = result;
    } else {
      user_exists = false;
    }
  });

  return user_exists;
};

userSchema.statics.getChatting = function (userid) {
  return new Promise(async (res, rej) => {
    await User.findOne({ _id: of }, function (err, doc) {
      if (err) {
        rej(err.toString());
      } else {
        res(doc.chattings ? doc.chattings : []);
      }
    });
  });
};

userSchema.statics.addChatingOfUser = async function (of, user_id) {
  let user = await User.findOne({ _id: of }).exec();
  if (!user.chattings) {
    user.chattings = [];
  }
  let found = user.chattings.find((data) => {
    return data._id.equals(user_id);
  });

  if (found == undefined) {
    let otheruser = await User.findOne({ _id: user_id }).exec();
    let name = otheruser.name;

    user.chattings.push({ _id: user_id, name: name });

    user
      .save()
      .then(() => {
        console.log("s");
      })
      .catch((err) => console.log("err"));
  }
};

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
