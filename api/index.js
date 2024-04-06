// import { ApolloServer, gql } from "apollo-server-express"; // Apollo Server
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"; // Apollo Server
// import http from "http"; // HTTP server
// import express from "express"; // Express server
// import cors from "cors"; // CORS
// import mongoose from "mongoose"; // MongoDB
// import bodyParser from "body-parser"; // Body Parser
// import { resolvers } from "./resolvers.js"; // Resolvers
// import { typeDefs } from "./schema.js"; // Type Definitions

// var { graphqlHTTP } = require('express-graphql');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var { buildSchema } = require('graphql');
const cors = require('cors');

const Resolvers = require('../resolvers')
const TypeDefs = require('../schema')

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');

//Store sensitive information to env variables
//const dotenv = require('dotenv');
//dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = 'mongodb+srv://rootadmin:N6Ejfd8aEbiryQjk@cluster0.etztr7w.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongodb_atlas_url, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection', err)
  });


  const app = express();
// Define the Apollo Server
const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
  cache: "bounded",
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

  //Define Express Server
  app.use(bodyParser.json());
  app.use('*', cors());

// Start the Apollo Server  (do not need for Vercel deployment)
async function startApolloServer() {
  await server.start();
  //Add Express app as middleware to Apollo Server
  server.applyMiddleware({app});
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
   console.log(`🚀 GraphQL Server ready at ${PORT}`));
  // app.use('/graphql', graphqlHTTP({
  //   schema: buildSchema(TypeDefs.typeDefs),
  //   rootValue: Resolvers.resolvers,
  //   graphiql: true,
  // }));

};

const PORT = process.env.PORT || 3000;

startApolloServer();
// startApolloServer().then(() => {
// //Start listen 
//   app.listen(PORT, () =>
//   console.log(`🚀 GraphQL Server ready at ${PORT}`));
// });

// app.listen(PORT, () =>
// console.log(`🚀 GraphQL Server ready at ${PORT}`));

//module.exports = server;



// startApolloServer().catch((error) => console.error(error));
//const httpServer = http.createServer(app); // HTTP server
//export default httpServer;
