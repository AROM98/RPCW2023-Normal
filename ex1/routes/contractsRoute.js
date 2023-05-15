var express = require('express');
var router = express.Router();
var contractController = require('../controllers/contract');








// GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições);
router.get('/courses', function (req, res) {
  console.log("entrei nos courses")
  contractController.listCourses()
      .then(c => {
          res.status(200).jsonp(c)
      })
      .catch(error => {
          res.status(502).jsonp({ error: error, message: "Error getting Courses list..." })
      })
});



// GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);
router.get('/institutions', function (req, res) {
  contractController.listInstitutions()
      .then(c => {
          console.log(c)
          res.status(200).jsonp(c)
      })
      .catch(error => {
          res.status(502).jsonp({ error: error, message: "Error getting institutions..." })
      })
});



// POST /contracts: acrescenta um contrato novo à BD;
router.post('/', function (req, res) {
  console.log(req.body)
  contractController.addContract(req.body)
      .then(c => {
          res.status(200).jsonp(c)
      })
      .catch(error => {
          res.status(502).jsonp({ error: error, message: "Error adding new contract..." })
      })
});


// GET /contracts/:id: devolve o contrato com identificador id;
router.get('/:id', function (req, res) {
  contractController.getContract(req.params.id)
      .then(c => {
          res.status(200).jsonp(c)
      })
      .catch(error => {
          res.status(502).jsonp({ error: error, message: "Error getting Contract..." })
      })
});

// DELETE /contracts/:id: elimina da BD o contrato com o identificador id.
router.delete('/:id', function (req, res) {
  console.log(req.params.id)
  contractController.deleteContract(req.params.id)
      .then(c => {
          res.status(200).jsonp(c)
      })
      .catch(error => {
          res.status(502).jsonp({ error: error, message: "Error deleting contract..." })
      })
});


// GET /contracts: devolve uma lista com todos os contratos;
// GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY;
// GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;
router.get('/', function (req, res) {

  if (req.query.year) {
      year = req.query.year
      contractController.list()
          .then(c => {
              res.status(200).jsonp(c)
          })    
          .catch(error => {
              res.status(502).jsonp({ error: error, message: "Error getting contracts of year..." })
          })
  } else if (req.query.inst) {
      inst = req.query.inst
      console.log(inst)
      contractController.listOrgs(inst)
          .then(c => {
              res.status(200).jsonp(c)
          })  
          .catch(error => { 
              res.status(502).jsonp({ error: error, message: "Error getting contracts of Institution..." })
          })
  } 
  else {
    console.log("entrei em /contracts")
    contractController.list()
        .then(c => {
            res.status(200).jsonp(c)
        })
        .catch(error => {
            res.status(500).jsonp({ error: error, message: "Error getting contratcs..."  })
        })
    }
});

module.exports = router;

