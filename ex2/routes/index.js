var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:15015/contracts/')
    .then(dados => {
      date = new Date().toISOString().substring(0,16)
      res.render('homepage', { contracts: dados.data, d: date });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:15015/contracts/' + req.params.id)
    .then(dados => {
      date = new Date().toISOString().substring(0,16)
      res.render('contract_page', { c: dados.data, d: date });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});


/* GET home page. */
router.get('/inst/:id', function(req, res, next) {
  idd = req.params.id
  axios.get('http://localhost:15015/contracts?inst="' + req.params.id+'"')
    .then(dados => {
      date = new Date().toISOString().substring(0,16)
      res.render('inst_page', {c: idd,  contracts: dados.data, d: date });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});


module.exports = router;
