var express = require('express');
var router = express.Router();
const fs = require('fs')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/upload')
  },
  filename: (req, file, cb) => {
    let extension = file.originalname.split('.').pop()
    cb(null, '' + Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// upload file input name = image
router.post('/upload', upload.single('image'), (req, res ,next) => {
  console.log(req.file)
  res.send('upload')
})

router.get('/delete', (req, res) => {
  let filePath = 'public/images/upload/1501417703940.jpg'
  // check file exist
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return console.error(err)
    }
    console.log(stats)
    // delete file
    fs.unlink(filePath, () => console.log('deleted file'))
  })
})

module.exports = router;
