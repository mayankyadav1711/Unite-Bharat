const mongoose = require('mongoose');

const duplicateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
   
  },
  university: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },


 
  isVerified: {
    type: Boolean,
    default: false, // Flag to determine if the OTP verification is completed
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  profilePic: {
    type: String,
  },
  nameofstate: {
    type: String,
  },
  accreditation: {
    type: String,
  },
  resetToken:String,
  expireToken:Date,
 
 
});

mongoose.model('Duplicate', duplicateSchema);
