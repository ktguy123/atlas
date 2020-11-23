const router = require('express').Router();
const moment = require('moment');
const auth = require('./../../auth')

const ArticleModel = require('../../../models/Article.js');

// 作成 Create
router.post('/', auth.required, (req, res) => {
  const Article = new ArticleModel();

  Article.title = req.body.title;
  Article.description = req.body.description;
  Article.body = req.body.body;
  Article.setDate();

  Article.save((err) => {
    if(err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!'});
    }
  });
});

// 更新 Update
router.put('/:id', auth.required, (req, res) => {
  const Articleid = req.params.id;
  ArticleModel
  .findById(Articleid, (err, article) => {
    if(err) {
      res.send(err);
    }else {
      article.title = req.body.title,
      article.description = req.body.description,
      article.body = req.body.body,
      article.date = moment().format("YYYY-MM-DD HH:mm:ss");
    
      article.save((err) => {
        if(err) {
          res.send(err);
        }else {
          res.json({message: 'Success!'});
        }
      })
    }
  })
});

// 全検索
router.get('/', auth.required, (req, res) => {
  ArticleModel.find()
    .then(articles => {
      res.json(articles);
    });
});

// ID検索
router.get('/:id', auth.required, (req, res) => {
  const Articleid = req.params.id;
  ArticleModel
    .findById(Articleid, (err, article) => {
      res.json(article);
    });
});

// 削除 (delete)
router.delete('/:id', auth.required, (req,res) => {
  const Articleid = req.params.id;
  ArticleModel
    .remove({_id:Articleid})
    .then(() => {
      res.json({message:'Success!!'});
    });
});

module.exports = router;