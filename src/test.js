db.posts.update({title: 'Post One'},
    {
        $set :{
            comments: [
                {
                    user: 'Mary Williams',
                    body: 'Comment One',
                    date: Date()
                },
                {
                    user: 'Harry White',
                    body: 'Comment One',
                    date: Date()
                }
            ]
        }
    }
)
