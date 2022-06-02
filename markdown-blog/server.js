const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
// const serverSelectionError = new ServerSelectionError()


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    // Access the 'views' folder
    res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)

app.listen(5000)