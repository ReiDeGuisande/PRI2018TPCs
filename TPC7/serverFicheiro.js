var express = require('express')
var http = require('http')
var logger = require('morgan')
var fs = require('fs')
var formidable = require('formidable')
var pug = require('pug')
var jsonfile = require('jsonfile')

var myDB = "log.json"

var app = express ()

app.use(logger('combined'))
app.use(express.static('Uploaded'))

app.all('*',(req,res,next)=> {
    if(req.url != '/w3.css')
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    next()
})

app.get('/',(req,res)=> {
    res.write(pug.renderFile('formFicheiro.pug'))
    res.end()
})

app.get('/w3.css',(req,res)=> {
    res.writeHead(200,{'Content-Type':'text/css'})
    fs.readFile('estilo/w3.css',(erro,dados)=> {
        if(!erro) 
            res.write(dados)
        else
            res.write(pug.renderFile('erro.pug', {e: erro}))
        res.end()
    })
})

app.get('/listar',(req,res)=> {
    jsonfile.readFile(myDB,(erro,resultado)=> {
        if(!erro) {
            res.write(pug.renderFile('listarFicheiros.pug', {ficheiros: resultado}))
            res.end()
        }
        else
            res.end(pug.renderFile('erro.pug',{e: erro}))
    })
})

app.post('/processaForm', (req,res)=> {
    var form = new formidable.IncomingForm()
    form.parse(req,(erro,fields,files)=> {

        var fenviado = files.ficheiro.path
        var fnovo = './uploaded/'+files.ficheiro.name
            fs.rename(fenviado,fnovo,erro => {
                if(!erro) {
                    jsonfile.readFile(myDB,(erro,resultado)=>{
                        if(!erro) {
                            const data = '{"desc":'  +'"'+ fields.desc +'"'+ ',' + '"nome":'  +'"'+ files.ficheiro.name + '"' + '}'
                            var jsondata = JSON.parse(data)
                            resultado.push(jsondata)
                            jsonfile.writeFile(myDB,resultado,erro1=> {
                                if(!erro1) {
                                    res.write(pug.renderFile('ficheiroRecebido.pug', {ficheiro:files.ficheiro.name,
                                                                                        desc: fields.desc}))
                                    res.end()
                                }
                                else console.log('Erro: '+erro1)
                            })
                        }
                        else {
                            console.log('Erro: '+erro)
                        }      
                    })
                }
                else {
                    res.write(pug.renderFile('erro.pug', {e: 'Ocorreram erros na gravação do ficheiro enviado: '+erro}))
                }
            })
    })
})

http.createServer(app).listen(5001, () => {
    fs.writeFile('log.json','[]',erro => {
        if(erro)
            console.log('Ocorreu o erro: '+erro)
    })
    console.log('Servidor à escuta na port 5001...')
})
