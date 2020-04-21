var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology:true}, (err,res) => {
  if(!err){
      console.log('链接mongo成功')
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('打开数据库成功')
  // we're connected!
});

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  name:  String,
  author: String,
  price:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

bookSchema.methods.findSimilarName = function(cb) {
  return this.model('Book').find({ name: this.name }, cb);
};

var Book = mongoose.model('Book', bookSchema);

var one = new Book({name: '一本书', author: 'wsq', price: '12.3'});
var two = new Book({name: '一本书', author: 'wsq', price: '12.3'});

one.save()