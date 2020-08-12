
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
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }