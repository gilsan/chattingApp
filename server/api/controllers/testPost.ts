
export default {
  AddPost(req, res) {
    console.log(req);
    res.status(200).json({msg: req.body, type: '내용물'});
  },
};
