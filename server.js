import { ApolloServer, gql } from "apollo-server";


const typeDefs = gql`
//느낌표가 없으면 nullable field
type User{
    id:ID!
    username:String!
    firstName:String!
    //lastname 은 옵션 선택사항임 
    lastName:String
}
//  모든 graphql 서버에서 required 인 타입
//  타입 쿼리안에 넣으면 user 가 request 할수있는것들이 됨
//db에 아무런 영향도 끼치지 않음.get request 같은거
type Query {
    allTweets:[Tweet!]!
    tweet(id:ID!):Tweet
    // user 가 data를 보내고 그게 backend 를 mutate 한다면 여기타입에 넣고 
}
//db 에도 영향을 끼치고 server state 를 mutate 함 
//post 나 delete 같은것  
type Mutation{
    // 느낌표는 null 은 return 하지 않는다고 확신
        postTweet(text:String!, userId: ID!): Tweet!
    deleteTweet(id :ID!): Boolean!
    }
}`



const server = new ApolloServer({typeDefs})
 server.listen().then(({url})=>{
    console.log(`running on ${url}`)
 })