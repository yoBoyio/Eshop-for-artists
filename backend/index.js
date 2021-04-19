const express = require('express')
const app = express();
const cors = require('cors')

const FBAuth = require('./util/fbAuth');
const port =  parseInt(process.env.PORT, 10) || 4000;


const {signup, login, getAuthenticatedUser, uploadImage, addUserDetails} = require('./handlers/users');
const {getAllTests} = require('./handlers/test');
const {getAllPosts, getPost, postOnePost, likePost, unlikePost, deletePost, commentOnPost} = require('./handlers/posts');
const { db } = require('./util/admin');

//middlwares 
app.use(express.json());
app.use(cors())
  
//test routes
app.get('/test', getAllTests);

//users routes
app.post('/signup',signup);
app.post('/login',login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user/image',FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

// posts routes
app.get('/posts', getAllPosts);
app.post('/posts', FBAuth, postOnePost);
app.get('/post/:postId', getPost);
app.delete('/post/:postId', FBAuth, deletePost);
app.get('post/:postId/like', FBAuth, likePost);
app.get('post/:postId/unlike', FBAuth, unlikePost);
app.post('post/:postId/comment', FBAuth, commentOnPost);

// DB Triggers
// exports.createNotificationOnLike = functions.region('europe-west1').firestore.document('likes/{id}')
// .onCreate((snapshot) => {
//   return db.doc(`/posts/${snapshot.data().postId}`).get()
//   .then(doc =>{
//     if(doc.exist && doc.data().userHandle !== snapshot.data().userHandle ){
//       return db.doc(`/notifications/${snapshot.id}`).set({
//         createdAt: new Date().toISOString,
//         recipient: doc.data().userHandle ,
//         sender: snapshot.data().userHandle,
//         read: false,
//         postId: doc.id,
//         type: 'like'
//       });
//     }
//   }).catch(err => {
//     console.error(err);
//   });
// });

// exports.deleteNotificationOnUnlike = functions.region('europe-west1').firestore.document('likes/{id}')
// .onDelete((snapshot) => {
//   return db.doc(`/notifications/${snapshot.id}`).delete()
//   .catch((err) => {
//     console.error(err);
//     return;
//   })
// })

// exports.createNotificationOnComment = functions.region('europe-west1').firestore.document('comments/{id}')
// .onCreate((snapshot) => {
//  return db.doc(`/posts/${snapshot.data().postId}`).get()
//   .then(doc =>{
//     if(doc.exist  && doc.data().userHandle !== snapshot.data().userHandle){
//       return db.doc(`/notifications/${snapshot.id}`).set({
//         createdAt: new Date().toISOString,
//         recipient: doc.data().userHandle ,
//         sender: snapshot.data().userHandle,
//         read: false,
//         postId: doc.id,
//         type: 'comment'
//       });
//     }
//   }).catch(err => {
//     console.error(err);
//     return;
//   })
// })

// exports.onUserImageChange = functions.region('europe-west1').firestore.document('/users/{userId}')
// .onUpdate((change) => {
//   if (change.before.data().imageUrl !== change.after.data().imageUrl){
//     console.log('image has changed');
//     const batch = db.batch();
//     return db.collection('posts').where('userHandle', '==', change.before.data().handle).get()
//     .then((data) => {
//       data.forEach(doc => {
//         const post = db.docs(`/posts/${doc.id}`);
//         batch.update(post, {userImage: change.after.data().imageUrl});
//       })
//       return batch.commit();
//     })
//   }
// })

// exports.onPostDelet = functions.region('europe-west1').firestore.document('/posts/{postId}')
// .onDelete((snapshot, context) => {
//   const postId = context.params.postId;
//   const batch = db.batch();
//   return db.collection('comments').where('postId', '==', postId).get()
//   .then( data => {
//     data.forEach( doc =>{
//       batch.delete(db.docs(`/comments/${doc.id}`));
//     })
//     return db.collection('likes').where('postId','==', postId);
//   }).then( data =>{
//     data.forEach( doc =>{
//       batch.delete(db.doc(`/likes/${doc.id}`));
//     })
//     return db.collection('notifications').where('postId','==', postId);
//     }).then( data =>{
//       data.forEach( doc =>{
//         batch.delete(db.doc(`/notifications/${doc.id}`));
//       })
//       return batch.commit();
//     }).catch( err => console.error(err) );
//   })


// app.set('port', port);

// gameServer.listen(port);

app.listen(port, () => 
console.log(`Server listening http://localhost:${port}`) );
