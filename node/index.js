const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

 const sql = `INSERT INTO people(name) values('Jardel')`
// connection.query(sql)


app.get('/', (req, res)=>{
    connection.query(sql)
    const sql2 = `SELECT * FROM people`
    connection.query(sql2, (error, results) => {
        if (error) {
            console.error('Erro ao consultar o banco de dados: ' + error.message)
            return res.status(500).send('Erro ao consultar o banco de dados')
        }
    
        let html = '<h1>Full Cycle Rocks!</h1><ul>'
        for (const row of results) {
            html += `<ol>${row.id} - ${row.name}</ol>`
        }
        html += '</ul>'
        
        res.send(html)
    })
    
})

app.get('/end', (req, res)=>{
    connection.end()
})

app.listen(port, ()=>{
    console.log("Rodando na porta " + port)
})
