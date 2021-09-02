const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const data = require('./files/data');

function saveBirthday(nome, nascimento){
    data.aniversarios.push({nome, nascimento});
    fs.writeFile(path.join(__dirname, 'files/data.json'), JSON.stringify(data, null, 4), (err) => {
        if(err) throw err;
    });
};

function getBirthday(nome){
    return data.aniversarios.filter(item => String(item.nome) === String(nome) );
}

http.createServer((req, res) => {
    const {nome, nascimento} = url.parse(req.url, true).query;

    if(nome && nascimento){
        saveBirthday(nome, nascimento);
        return res.end(JSON.stringify({message: "aniversario salvo"}));
    }

    if(nome && !nascimento){
        return res.end(JSON.stringify(getBirthday(nome)));

    }


}).listen(5000);

console.log('API is running');