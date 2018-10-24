var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var {parse} = require('querystring')
var jsonfile = require('jsonfile')

var myDB = "teses.json"

var myServer = http.createServer((req,res)=> {
    var purl = url.parse(req.url,true)
    var query = purl.query //será necessário neste caso?

    console.log('Recebi o pedido: '+req.url)
    console.log('Método: '+req.method)

    if(req.method == 'GET') {
        if(purl.pathname == '/')
            res.end(pug.renderFile('intro.pug'))
        else if(purl.pathname == '/registo')
            res.end(pug.renderFile('regista-tese.pug'))
        else if(purl.pathname == '/w3.css') {
            res.writeHead(200, {'Content-Type':'text/css'})
            fs.readFile('estilo/w3.css',(erro,dados)=> {
                if(!erro) res.write(dados)
                else res.write(pug.renderFile('erro.pug',{e:erro}))
                res.end()
            })
        }
        else if(purl.pathname == '/lista') {
            jsonfile.readFile(myDB, (erro,alunos)=> {
                if(!erro)
                    res.end(pug.renderFile('lista-teses.pug'))
                else
                    res.end(pug.renderFile('erro.pug',{e: erro}))
            })
        }
         else res.end('ERRO: '+purl.pathname+' não está implementado...')      
    }
    else if(req.method == 'POST') {
        if(purl.pathname == '/processaTese') {
            recuperaInfo(req,resultado => {
                jsonfile.readFile(myBD,(erro,teses)=> {
                    if(!erro) {
                        teses.push(resultado)
                        jsonfile.writeFile(myDB,teses,erro1=> {
                            if(!erro1) console.log('Registo gravado com sucesso') 
                            else console.log('Erro: '+erro2)
                        })
                    }
                    else {
                        console.log('Erro: '+erro)
                    }
                })
                res.end(pug.renderFile('processa-tese.pug',{tese: resultado}))
            })
        }
        else {
            res.writeHead(501,{'Content-Type':'text/html;charset=utf-8'}) //erros do servidor 500 / erros do cliente 400
            res.end('ERRO: '+purl.pathname+' não está implementado...')
        }
    }
    else {
        res.writeHead(503, {'Content-Type':'text/html;charset=utf-8'})
        res.end('ERRO: '+req.method+' não está implementado...')
    }
})

myServer.listen(4500,()=> {
    console.log('Servidor à escuta na porta 4500...')
    fs.writeFile(myDB,'[]',erro =>{
        if(erro) console.log('Erro: '+erro)
    });
})

function recuperaInfo (request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded'
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = ''
        request.on('data', chunk => {
            body += chunk-toString()
        })
        request.on('end',()=> {
            callbac(parse(body))
        })
    }
    else
        callback(null)
}