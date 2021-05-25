const express = require('express')
const app = express();
const cors = require('cors')


const FBAuth = require('./util/fbAuth');
const fileUpload = require('express-fileupload');

const port = parseInt(process.env.PORT, 10) || 4000;


const { signup, login, getAuthenticatedUser, uploadImage, addUserDetails } = require('./handlers/users');
const { getAllTests } = require('./handlers/test');
const { getAllPosts, getPost, postOnePost, likePost, unlikePost, deletePost, commentOnPost } = require('./handlers/posts');
const { insertItem, discoverItems, getItem, updateItem, addViews, deleteItem, getItems, ItemsQuery } = require('./handlers/items');
const { db } = require('./util/admin');
const { insertItemToCart, getCart, deleteItemFromCart } = require('./handlers/cart');
const { addFavorites, getFavorites, deleteFavorites } = require('./handlers/favorites')

//middlwares 
app.use(express.json());
app.use(cors())
app.use(fileUpload());

//test routes
app.get('/test', getAllTests);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

// posts routes
app.get('/posts', FBAuth, getAllPosts);
app.post('/posts', FBAuth, postOnePost);
app.get('/post/:postId', getPost);
app.delete('/post/:postId', FBAuth, deletePost);
app.get('post/:postId/like', FBAuth, likePost);
app.get('post/:postId/unlike', FBAuth, unlikePost);
app.post('post/:postId/comment', FBAuth, commentOnPost);

// Item routes
app.post('/items', FBAuth, insertItem);
app.get('/items/discover', discoverItems);
app.get('/items/search/:query', ItemsQuery);
app.get('/items', getItems);
app.get('/items/:itemId', getItem);
app.post('/items/:itemId', FBAuth, updateItem);
app.delete('/items/:itemId', deleteItem);

//cart routes
app.post('/cart/:itemId', insertItemToCart);
app.get('/cart', getCart);
app.delete('/cart/:itemId', deleteItemFromCart);

//favorites routes
app.post('/favorites/:itemId', FBAuth, addFavorites);
app.get('/favorites', FBAuth, getFavorites);
app.delete('/favorites/:itemId', FBAuth, deleteFavorites);

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
    console.log(`Server listening http://localhost:${port}`));
