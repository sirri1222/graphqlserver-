import { ApolloServer, gql } from "apollo-server";


const typeDefs = gql`
type Query {
    allTweets:
}`



const server = new ApolloServer({typeDefs})
 server.listen().then(({url})=>{
    console.log(`running on ${url}`)
 })