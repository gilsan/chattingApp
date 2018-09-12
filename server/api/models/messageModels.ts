import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const messageSchema = new Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'} ,
    sender: { type: String},
    receiver: { type: String},
    message: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} ,
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        sendername: { type: String },
        receivername: { type: String },
        body: { type: String, default: ''},
        isRead: { type: Boolean, default: false },
        createAt: { type: Date, default: Date.now() }
      }
    ]
});

export default mongoose.model('Message', messageSchema);
