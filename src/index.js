import { GraphQLServer } from 'graphql-yoga'

//Demo user data
const users = [{
    id: '1',
    name: 'Deb',
    email: 'test@test',
    age: 28
},
{
    id: '2',
    name: 'Ollie',
    email: 'test@test',
    age: 47
},
{
    id: '3',
    name: 'Peach',
    email: 'test@test',
    age: 7
}]

const posts = [{
    id: '1',
    title: 'Post 1',
    body: 'Testing shit',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'Post 2',
    body: 'You are a buffoon',
    published: true,
    author: '1'
}, {
    id: '3',
    title: 'Post 3',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: "1",
    text: "First comment"
},{
    id: "2",
    text: "I don't like puddin"
},{
    id: "3",
    text: "Something"
},{
    id: "4",
    text: "Blah"
},
]


//Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments (query: String): [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            } else {
                return users.filter((user)=> {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            } else {
                return posts.filter((post) => {
                    const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                    return isTitleMatch || isBodyMatch
                })
            }
        },
        comments(parent, args, ctz, info){
            if (!args.query) {
                return comments
            } else {
                return comments.filter((comment) => {
                    const isIdMatch = comment.id.includes(args.query.toString())
                    const isTextMatch = comment.text.toLowerCase().includes(args.query.toLowerCase())
                    return isIdMatch || isTextMatch
                })
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, arg, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is up')
})