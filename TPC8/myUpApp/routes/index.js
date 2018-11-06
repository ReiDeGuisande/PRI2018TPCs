var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var myDB = __dirname + "/ficheiros.json"

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/fich', (req,res)=> {
  jsonfile.readFile(myDB, (erro,fichs)=> {
    if(!erro) res.render('lista',{lista: fichs})
    else res.json(erro)
  })
})

router.post('/processa',(req,res)=> {
  var form = new formidable.IncomingForm()
  form.parse(req,(erro,fields,files)=> {

    var fenvidado = files.ficheiro.path
    var fnovo = './public/images/'+files.ficheiro.name
    fs.rename(fenvidado,fnovo,erro => {
      if(!erro) {
        console.dir(fields.descr)
      }
    })
      

  })
  res.json(form)

})

router.post('/fich/guardar', (req,res)=> {
  var f = req.body.ficheiro
  console.dir(f)

  jsonfile.readFile(myDB, (erro, fichs)=> {
    if(!erro) {
      fichs.push(f)
      console.dir(fichs)
      jsonfile.writeFile(myDB,fichs,erro2 => {
        if(!erro2)
          console.log('Registo gravado com sucesso!')
        else
          console.log('Erro: '+erro2)
      })
    }
    else
      console.log('Erro: '+erro)
    })
    res.json(f)
  })




module.exports = router;
