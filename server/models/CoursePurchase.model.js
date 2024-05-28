const mongoose = require('mongoose');

const CoursePurchaseSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  purchaseDate: { type: Date, default: Date.now },
  fee: { type: Number },
  grossAmount: { type: Number },
  netAmount: { type: Number },
  transactionId: { type: String },
});

const CoursePurchase = mongoose.model('CoursePurchase', CoursePurchaseSchema);

module.exports = CoursePurchase;
