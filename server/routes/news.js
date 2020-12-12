const router = require('express').Router();
const fetch = require("node-fetch");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEYS);
let News = require('../models/news.model');

router.route('/').post((req, res) => {
  const newNews = new News(req.body);

  newNews.save()
  .then(() => res.json('News added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    if(req.query.url)
    {
        News.findOne({url: req.query.url})
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

router.route('/addtag/').post((req, res) => {
    newsapi.v2.everything({
        q: req.query.q,
        pageSize: 100
    })
    .then(result => {
        result.articles.map(async a => {
            await News.findOne({url: a.url}).exec().then(
                r => {
                    if(!r)
                    {
                        const newNews = new News({
                            url: a.url,
                            tags: [req.query.q]
                        });

                        newNews.save()
                        .then(() => console.log('News added!'))
                        .catch(err => console.log('Error: ' + err));
                    }
                    else{
                        News.update(
                            { _id: r._id }, 
                            { $push: { tags: req.query.q } },
                            () => console.log('News updated!')
                        );
                    }
                }
            )
            .catch((err) => console.log(err))
        })
    })
    .then(() => res.json('News added!'))
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;