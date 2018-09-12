import * as mongoose from 'mongoose';


  const Schema = mongoose.Schema;
  const postSchema = new Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     username: { type: String,  default: ''},
     post:     { type: String,  default: ''},
     comments: [
       {
         userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
         username: { type: String, default: ''},
         comment:  { type: String, default: ''},
         createdAt: { type: Date, default: Date.now()}
       }
     ],
     totalLikes: { type: Number, default: 0},
     likes: [
       {
         username: { type: String, default: ''}
       }
     ],
     created: { type: Date, default: Date.now()}


  });

  export default mongoose.model('Post', postSchema);
