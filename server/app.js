const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { importSchema } = require('graphql-import');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const resolvers = require('./graphql/resolvers/index');

const User = require('./models/User');

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: ({ req }) => ({
        User,
        activeUser: req.activeUser
    })
});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    });
const app = express();
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if(token){
        try{
            const currentUser = jwt.verify(token, process.env.SECRET_KEY);
            req.activeUser = currentUser;
            console.log(currentUser);
        }
        catch(err){
            console.log(err);
        }
    }
    next();  
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);