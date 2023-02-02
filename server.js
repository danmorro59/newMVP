const dotenv = require('dotenv')
const express = require('express')
const app = express()
dotenv.config()

const Pool = require('pg').Pool
const port = process.env.PORT || 4000
const client = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

app.use(express.static('public'))
app.use(express.json())

app.route('/list')
  .get(async (req, res)=>{
    try {
      const data = await client.query('SELECT * FROM todos')
      res.status(200).json(data.rows)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

  .post(async (req, res)=>{
    try {
      let {body} = req
      await client.query(`INSERT INTO todos (task) VALUES ('${body.task}')`)
      const data = await client.query('SELECT * FROM todos')
      res.status(200).json({validation: true, data: data.rows})     
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

app.route('/list/:id')
  .delete(async(req,res)=>{
    try {
      let {id} = req.params
      const oneTodo = await client.query(`DELETE FROM todos WHERE id = ${id}`)
      res.status(200).json({validation: true})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

  .patch(async(req,res)=>{
    try {
      let {id} = req.params
      let {body} = req
      const data = await client.query(`UPDATE todos SET task ='${body.name}' WHERE id = ${id}`)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

app.use('/', (req, res) => {
    res.status(400).send('Bad Request: Invalid Route')
})

app.listen(port, ()=>{
  console.log(`Server is listening on port: ${port}`)
})