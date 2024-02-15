const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type Query {
        login(email: String!, password: String!): User
        getAllEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
    }

    type Mutation {
        signup(username: String!
            email: String!
            password: String!): User
            
        addNewEmployee(firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        updateEmployee(id: String!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee
    }
`