const router = require('express').Router();
let News = require('../models/news.model');

router.route('/').post((req, res) => {
  const newNews = new News(req.body);

  newNews.save()
  .then(() => res.json('News added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    if(req.query.id)
    {
        News.findById(req.query.id)
        .then(news => res.json(news))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        News.find()
        .then(news => res.json(news))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route('/').delete((req, res) => {
    News.findByIdAndDelete(req.query.id)
    .then(() => res.json('News deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').put((req, res) => {
    News.findById(req.query.id)
    .then(news => {
        News.findByIdAndUpdate(news.id, req.body)
        .then(() => res.json('News updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;