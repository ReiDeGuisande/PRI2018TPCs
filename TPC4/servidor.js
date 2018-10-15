var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'})
    var purl = url.parse(req.url,true)
    
    if(purl.pathname == '/obras') {
        fs.readFile('website/index.html',(erro,dados)=>{
            res.writeHead(200, {'Content-Type': 'text/html'})
            if(!erro)
                res.write(dados)
            else 
                res.write(erro)
             res.end()
        })
    }
    else {
        if(purl.pathname == '/obra') {
            fs.readFile('website/html/obra'+purl.query.id+'.html',(erro,dados)=>{
                res.writeHead(200, {'Content-Type': 'text/html'})
                if(!erro)
                    res.write(dados)
                else 
                    res.write(erro)
                 res.end()
            })
        }
    }
}).listen(7777, ()=> {
    console.log('Servidor à escuta na porta 7777...')
})