import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
  const conversationSchema = new Schema({
      participants: [
        {
           senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
           receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
      ]

  });

  export default mongoose.model('Conversation', conversationSchema);
