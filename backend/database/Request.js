import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    requestSentIds:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],
    requestInIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],
      requestAcceptIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        }],
        requestRejectedIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        }],
})


const Request = mongoose.model('Request', RequestSchema);
export default Request;