const Subscription = {
    comment: {
        subscribe( parent, { postId }, { db, pubsub }, info) {
            // const post = db.posts.find((post) => post.id === postId && post.published)

            // if (!post) {
            //     throw new Error('No post found')
            // }

            // return pubsub.asyncIterator(`comment ${postId}`)
            return pubsub.asyncIterator('comment')
        }
    },
    post: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator('post')
        }
    }

}

export { Subscription as default }