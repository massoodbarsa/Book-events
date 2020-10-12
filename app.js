const express = require('express')
const bodyParser = require('body-parser')
const isAuth = require('./middleware/auth')
const {
    graphqlHTTP
} = require('express-graphql');
const graphqlSchema =require('./graphql/schema/index')
const graphqlResolvers =require('./graphql/resolver/index')

const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(isAuth)


app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true

}))
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.rkikv.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000, () => {
            console.log('agh hamid vasl shod');
        })
    }).catch(err => {
        console.log(err);
    })