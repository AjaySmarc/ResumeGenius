const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  gmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /.+\@gmail\.com$/
  },
  password: {
    type: String,
    required: function() {
      return !this.oauthProvider;
    },
    minlength: 6,
    select: false
  },
  oauthProvider: {
    type: String, // Example: "google", "facebook"
    enum: ['google', 'facebook', 'github', null],
    default: null
  },
  oauthId: {
    type: String, // Provider-specific ID
    default: null
  },
  agreedToTerms: {
    type: Boolean,
    required: true
  },
  receiveUpdates: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// hashing password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
