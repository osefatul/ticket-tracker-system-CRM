const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We are adding virtual, because mongodb "id" along with "_id".
const opts = { toJSON: { virtuals: true } };


const UserSchema = new Schema({

  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  fullName: {
    type: String,
    maxlength: 50,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  department: {
    type: String,
    maxlength: 50,
    required: true,
  },
  dob: {
    type: Date,
    maxlength: 50,
  },
  phone:{
    type:Number,
    maxlength:10,
    
  },
  address: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, opts);

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
