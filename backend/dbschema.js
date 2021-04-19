const { user } = require("firebase-functions/lib/providers/auth");

let db = {

    users: [{
        userId : '4EoDBYG7D6yik1RlvtIl',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '10 Match 2021 at 11:41:04 UTC',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/score4-aa163.appspot.com/o/no-img.png?alt=media',
        bio: 'Hello, Im user and this is my bio',
        location: 'Thessaloniki, Greece'
    }],
    posts: [{
        userHandle: 'user',
        body: 'this is the post body',
        createdAt: 'date isos string',
        likeCount: 5,
        commentCount: 3
    }],
    comments: [{
        userHandle: 'user',
        postId: 'c9NnaRec9z6t4CrDtOHw',
        body: 'test post body',
        createdAt: '16 April 2021 at 17:02:04 UTC'
    }],
    notifications: [{
        recipient: 'user',
        sender: 'user2',
        read: 'true | false',
        postId: 'c9NnaRec9z6t4CrDtOHw',
        type: 'like | comment',
        createdAt: '16 April 2021 at 18:32:04 UTC'
    }]
};

const userDetails = {
    // Redux Data
    credentials: {
        userId : '4EoDBYG7D6yjs1RlvtIl',
        email: 'usertest@email.com',
        handle: 'usertest',
        createdAt: '11 Match 2021 at 22:41:04 UTC',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mytemprep-9eb97.appspot.com/o/no-img.png?alt=media',
        bio: 'Hello, Im test-user and this is my bio',
        location: 'Thessaloniki, Greece'
    },
    likes:
    [{
        userHandle: 'usertest',
        postId: 'z7DGPgKcID8SRpvgpkuf',
    },{
        userHandle: 'usertest',
        postId: 'yHioPgKcIb9SRpv4pkuf',
    }],
    notifications: [{
        recipient: 'user',
        sender: 'user2',
        read: 'true|false',
        postId: 'z7DGPgKcID8SRpvgpkuf',
        type: 'like',
        createdAt: '12 Match 2021 at 22:41:04 UTC'
    }]
}