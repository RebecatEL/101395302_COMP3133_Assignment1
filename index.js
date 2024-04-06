const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');
const cool = require('cool-ascii-faces')

const Resolvers = require('./resolvers')
const TypeDefs = require('./schema')

const { ApolloServer } = require('apollo-server-express');

//Store sensitive information to env variables
//const dotenv = require('dotenv');
//dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = 'mongodb+srv://rootadmin:N6Ejfd8aEbiryQjk@cluster0.etztr7w.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

// Define the Apollo Server


// Start the Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

  await server.start();

  const app = express().get('/cool', (req, res) => res.send(cool()))
    // app.use('/graphql', graphqlHTTP({
  //   schema: buildSchema(TypeDefs.typeDefs),
  //   rootValue: Resolvers.resolvers,
  //   graphiql: true,
  // }));

  //Define Express Server
app.use(bodyParser.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
server.applyMiddleware({app})

const PORT = process.env.PORT || 4000;

//Start listen 
app.listen(4000, () =>
  console.log(`🚀 GraphQL Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));

}

startApolloServer().catch((error) => console.error(error));