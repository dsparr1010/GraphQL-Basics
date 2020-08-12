const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        } else {
            return db.users.filter((user)=> {
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
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        } else {
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        }
    },
    comments(parent, args, { db }, info){
        if (!args.query) {
            return db.comments
        } else {
            return comments.filter((comment) => {
                const isIdMatch = comment.id.includes(args.query.toString())
                const isTextMatch = comment.text.toLowerCase().includes(args.query.toLowerCase())
                const isAuthorMatch = comment.author.toLowerCase().includes(args.query.toLowerCase())
                return isIdMatch || isTextMatch || isAuthorMatch
            })
        }
    }
}

export {Query as default}