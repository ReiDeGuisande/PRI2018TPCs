var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var glob = require('glob')
var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'}); //comparator
const tipos  = []


var estilo = /w3\.css/
var index = /index/
var obra = /obra/

http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)

    console.log('Recebi um pedido: ' + purl.pathname)

    if(index.test(purl.pathname)) {
        res.writeHead(200, {'Context-type': 'text/html'})
        fs.readFile('data/index.json', (error,dados)=>{
            if(!error){
                var myObj = JSON.parse(dados)
                res.write(pug.renderFile('index.pug',{arq:myObj}))
            }
            else 
                res.write('<p><b>ERRO: </b> '+error+'</p>')
            res.end()
        })
    }
    else if(estilo.test(purl.pathname)){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('estilo/w3.css', (error, dados)=>{
            if(!error){
                res.write(dados)
            }
            else
                res.write('<p><b>ERRO: </b> ' + error + '</p>')
            res.end()
        })
    }
    else if(obra.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2] + '.json'
        console.log('Lendo o ficheiro: ' + ficheiro)

        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('data/json/'+ficheiro, (error, dados)=>{
            if(!error){
                try {
                    var myObj = JSON.parse(dados)
                    res.write(pug.renderFile('template.pug', {arqmus: myObj}))
                }
                catch (error) {
                    console.log(error)
                }

            }
            else
                res.write('<p><b>ERRO: </b> ' + error + '</p>')
            res.end()
        })
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p><b>ERRO: </b> ' + purl.pathname + '</p>')
        res.write('<p>Rota desconhecida...</p>')
        res.end()
    }

}).listen(5555, ()=>{    
    execute()
    console.log('Servidor à escuta na porta 5555...')
})

/**Funções relacionadas com a criação do index
 * 1 - Percorrem-se todos os ficheiros da pasta e sao guardados num array os path para os .json
 * 2 - Em cada ficheiro .json são extraidos o titulo e o id
 * 3 - É construido um novo ficheiro, o index.json com as informaçoes acima, de cada um dos ficheiros
 */
function execute() {
    fs.writeFile('data/index.json',"{\"obras\": [",(error)=>{ //Usar o opensync talvez?
        glob('data/json/*.json', (err,files)=>{ //esta função devolve o path de todos os jsons para um array 
            files.sort(collator.compare)                 //fazer o sort
            for(var i=0, len = files.length; i<len-1; i++){ 
                parseData(files[i])                 //percorrer todos os ficheiros json e criar um index
            }
            parseLast(files[files.length-1])
         }) 
    })
}

function parseData(f) { // f é um path para o ficheiro json
    var dados =  fs.readFileSync(f, 'utf8')
    if(dados) {
        try{
            var obj = JSON.parse(dados)
            var tit = JSON.stringify(obj.titulo)
            var id = JSON.stringify(obj._id)
            var tipo = JSON.stringify(obj.tipo)


                if(tipo) {
                    tipos.push(tipo)
                    }  
                if (id && tit)        
                    buildJson(id,tit,tipo)       
            }
            catch (error) {
                console.log(error)
            }
        }
    else {
        console.log(error)
    }
}

function parseLast(f) { // f é um path para o ficheiro json
    var dados = fs.readFileSync(f, 'utf8')
    if(dados) {
        try{
            var obj = JSON.parse(dados)
            var tit = JSON.stringify(obj.titulo)
            var id = JSON.stringify(obj._id)
            var tipo = JSON.stringify(obj.tipo)

                if(tipo) {
                    tipos.push(tipo)
                }          
            if (id && tit) {
                if (tipo)  fs.appendFileSync('data/index.json',"{"+"\"id\":"+id+","+"\"tipo\":"+tipo+","+"\"titulo\":"+tit+"}]") //usar o appendfilesync (usar as peliculas em alternaçao com as aspas)
                else  fs.appendFileSync('data/index.json',"{"+"\"id\":"+id+","+"\"tipo\":"+'""'+","+"\"titulo\":"+tit+"}]")
                fs.appendFileSync('data/index.json',',"tipos":[')
            }
            appendTipos()
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        console.log(error)
    }
}

function buildJson(id,tit,tipo) {
    try {
    
        if (tipo) fs.appendFileSync('data/index.json',"{"+"\"id\":"+id+","+"\"tipo\":"+tipo+","+"\"titulo\":"+tit+"},") //usar o appendfilesync
        else fs.appendFileSync('data/index.json',"{"+"\"id\":"+id+","+"\"tipo\":"+'""'+","+"\"titulo\":"+tit+"},")
    }
    catch (error) {
        console.log(error)
    }
}

function appendTipos() {
    tipos.push('""')
    let uniqueItems = [...new Set(tipos)] //remove os repetidos
    for(var i =0, len=uniqueItems.length;i<len-1;i++) {
        fs.appendFileSync('data/index.json','{"tipo":'+uniqueItems[i]+'},')
    }
    fs.appendFileSync('data/index.json','{"tipo":'+uniqueItems[uniqueItems.length-1]+'}]}')
    fs.closeSync('data/index.json')
}