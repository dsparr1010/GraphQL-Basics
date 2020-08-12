import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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
    id: '10',
    title: 'Post 1',
    body: 'Testing shit',
    published: true,
    author: '1'
}, {
    id: '20',
    title: 'Post 2',
    body: 'You are a buffoon',
    published: true,
    author: '1'
}, {
    id: '30',
    title: 'Post 3',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: "1",
    text: "First comment",
    author: "1",
    post: '10'
},{
    id: "2",
    text: "I don't like puddin",
    author: "1",
    post: '20'
},{
    id: "3",
    text: "Something",
    author: "2",
    post: '30'
},{
    id: "4",
    text: "Blah",
    author: "3",
    post: '10'
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

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments : [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
                    const isAuthorMatch = comment.author.toLowerCase().includes(args.query.toLowerCase())
                    return isIdMatch || isTextMatch || isAuthorMatch
                })
            }
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.data.email
            })

            if (emailTaken) {
                throw new Error('Email already taken')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User does not exist')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postExists = posts.some((post) => post.id === args.data.post && post.published)

            if (!userExists || !postExists) {
                throw new Error('User or Post does not exist')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment

        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment)=> {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id ===parent.post
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