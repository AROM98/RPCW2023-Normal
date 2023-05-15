var Contract = require('../models/contract')

// List all contracts
module.exports.list = () => {
    return Contract
        .find()  //filtra por parametros
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// List all contracts v2
module.exports.list = (fields) => {
    return Contract
        .find(fields)  //filtra por parametros
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// List all contract with organization
module.exports.listOrgs = (inst) => {
    return Contract
        .find({}, {NomeInstituicao: inst})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// lista dos cursos dos contratados (sem repetições)
module.exports.listCourses = () => {
    return Contract
        .distinct("Curso")
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// Lista das instituições contratantes (sem repetições)
module.exports.listInstitutions = () => {
    return Contract
        .distinct("NomeInstituicao")
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}


// Get contract by id
module.exports.getContract = id => {
    return Contract.findOne({_id:id})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// Add new contract
module.exports.addContract = contractData => {
    const newContract = new Contract(contractData);
    return newContract.save()
      .then(resposta => {
        return resposta
      })
      .catch(erro => {
        throw erro
      })
}

// Generic update 
module.exports.updateContract = (id, info) => {
    return Contract.updateOne({_id:id}, {$set: info})
        .then(() =>{
            return Contract.findOne({_id:id})
        })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}

// delete
module.exports.deleteContract = id => {
    return Contract.deleteOne({_id:id})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            throw erro
        })
}


