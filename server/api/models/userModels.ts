
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

  const Schema = mongoose.Schema;
  const userSchema = new Schema({
     username: { type: String,  required: true},
     email:    { type: String, required: true },
     password: { type: String, required: true},
     posts: [
       {
         postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
         post: { type: String},
         created: { type: Date, default: Date.now() }
       }
     ],
     following: [
       { userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
     ],
     followers: [
      { follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
    ],
    notifications: [
      {
        senderid:    { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        message:     { type: String },
        viewProfile: { type: Boolean, default: false},
        created: { type: Date, default: Date.now() },
        read: { type: Boolean, default: false },
        date: { type: String, default: ''}
      }
    ],
     chatList: [
       {
         receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
         msgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
       }
     ],
    picVersion: { type: String, default: '1537019928'},
    picId: { type: String, default: 'avatar-ts-buzz.png'},
    images: [
      {
        imgId:  { type: String, default: ''},
        imgVersion:  { type: String, default: ''}
      }
    ]
  });

  userSchema.statics.EncrytPassword = async (password) => {
         const hash = await bcrypt.hash(password, 10);
         return hash;
  };

  export default mongoose.model('User', userSchema);
