import { ApolloServer, gql } from "apollo-server";
// 1. 데이터
let tweets =[{
    id:"1",
    text:"hello1",
    userId:"2"

},{
    id:"2",
    text:"hello2",
    userId:"1"

},]
let users = [
    {
        id:"1",
        firstName:"d",
        lastName:"d"
    },
    {
        id:"2",
        firstName:"d",
        lastName:"d"
    }
]

// 2. 타입정의 user, query, mutation 
// query 는 서버에서 required 인타입 이고 mutation db를 mutatae 한느타입
const typeDefs = gql`
//느낌표가 없으면 nullable field require인지 말해주고있음
type User {
    id:ID!
    username:String!
    firstName:String!
    //lastname 은 옵션 선택사항임 
    lastName:String
}
//  모든 graphql 서버에서 required 인 타입
//  타입 쿼리안에 넣으면 user 가 request 할수있는것들이 됨
//db에 아무런 영향도 끼치지 않음.get request 같은거
//  type query 안에 적으면 rest api 에서 get request url 을 노출 시키는것과 같다  GET /allTweets 와 같음
type Query {
    // alltweets 라는 필드가 있다 
    allTweets:[Tweet!]!
    tweet(id:ID!):Tweet
    // user 가 data를 보내고 그게 backend 를 mutate 한다면 여기타입에 넣고 
}
//db 에도 영향을 끼치고 server state 를 mutate 함 
//post 나 delete 같은것  
type Mutation {
    // 느낌표는 null 은 return 하지 않는다고 확신
    postTweet(text:String!, userId: ID!): Tweet!
    deleteTweet(id :ID!): Boolean!
    }
`;

// apollo server 가 resolver 안에 function 을 부를 때 
// function 에 arguments를 주는데 root argument 랑 걍 argument 가있음

const resolvers = {
    Query:{
        allTweets(){
            console.log("im called")
            return tweets
        },
        // root 는 모르겟고 arguments 들은 쿼리나 mutation 에서 user가 보낸 arguments들이 될거
        tweet(root, {id}){
            console.log(arguments)
            return tweets.find((tweet)=> id === tweet.id)
        },
      
    },
    Mutation:{
        postTweet(_,{text, userId}){
            const newTweet = {
                id:tweets.length+1,
                text
            }
            tweets.push(newTweet)
        },
    },
    User:{
        fullName({firstName, lastName}){
            return `${firstName}${lastName}`
        }
        ,  firstName({firstName}){
            return firstName
        }
        
    },
    Tweet:{
        author({userId}){
            return users.find(user => user.id === userId)
        }

    }
}


const server = new ApolloServer({typeDefs, resolvers,
    introspection: true, // 개발 환경에서는 true로 설정
    playground: true, //

})
 server.listen().then(({url})=>{
    console.log(`running on ${url}`)
 })