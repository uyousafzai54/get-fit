db.posts.find({
     $text: {
         $search: "\"Post One\""
     }
}).pretty()
