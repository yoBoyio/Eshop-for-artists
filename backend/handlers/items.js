
const { db, admin, storage } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
const json = require('koa-json');
const { Bucket } = require('@google-cloud/storage');
const { uuid } = require("uuidv4");

const algoliasearch = require('algoliasearch');
const client = algoliasearch('BN69NYV043', 'f7969b14dd444ac1e31ceb57754bc0a5');
const index = client.initIndex('items');

exports.ItemsQuery  = (req, res) => {

    index.search(req.params.query, {
        attributesToRetrieve: ['title', 'userHandle', 'tags', 'genre', 'BPM'],
        hitsPerPage: 100,
      }).then( ({ hits }) => {
        let items = [];
        hits.forEach( async (hit) => 
        {
            
            await db.collection('item').doc(hit.objectID).get()
            .then(doc => {

                items.push(
                {
                    itemId: doc.id,
                    createdAt: doc.data().createdAt,
                    BPM: doc.data().BPM,
                    genre: doc.data().genre,
                    imgPath: doc.data().imgPath,
                    path: doc.data().path,
                    price: doc.data().price,
                    tags: doc.data().tags,
                    title: doc.data().title,
                    views: doc.data().views
                });
                
                if (items.length === hits.length)
                    return res.json(items);
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
            
        });

      });
}
exports.discoverItems = (req, res) => {
    let page = 0;
    let sortby = "views";
    let BPMstart = 0;
    let BPMend = 300;
    let type = "desc";

    if (req.body.page != null || req.body.page > 0) {
        page = req.body.page;
    }

    if (req.body.sortby != null) {
        sortby = req.body.sortby;
    }
    if (req.body.BPMstart != null) {
        BPMstart = req.body.BPMstart;
    }

    if (req.body.BPMend != null) {
        BPMend = req.body.BPMend;
    }

    if (sortby === "high" || sortby === "low") {
        sortby = "price";
        if (req.body.sortby === "low")
            type = "asc";
    }

    if (req.body.genre != null)
        db.collection('item').orderBy("BPM", "asc").where("BPM", ">=", BPMstart).where("BPM", "<=", BPMend).where("genre", "array-contains", req.body.genre).orderBy(sortby, type).limit(40).offset(page * 40).get()
            .then((data) => {
                let items = [];
                data.forEach((doc) => {
                    items.push({
                        itemId: doc.id,
                        createdAt: doc.data().createdAt,
                        BPM: doc.data().BPM,
                        genre: doc.data().genre,
                        imgPath: doc.data().imgPath,
                        path: doc.data().path,
                        price: doc.data().price,
                        tags: doc.data().tags,
                        title: doc.data().tags,
                        views: doc.data().views
                    });
                });
                return res.json(items);
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
    else
        db.collection('item').orderBy("BPM").where("BPM", ">=", BPMstart).where("BPM", "<=", BPMend).orderBy(sortby, type).limit(40).offset(page * 40).get()
            .then((data) => {
                let items = [];
                data.forEach((doc) => {
                    items.push({
                        itemId: doc.id,
                        createdAt: doc.data().createdAt,
                        BPM: doc.data().BPM,
                        genre: doc.data().genre,
                        imgPath: doc.data().imgPath,
                        price: doc.data().price,
                        tags: doc.data().tags,
                        title: doc.data().title,
                        views: doc.data().views
                    });
                });
                return res.json(items);
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
};
exports.getItems = (req, res) => {

    db.collection('item').orderBy("views", "asc").get()
        .then((data) => {
            let items = [];
            data.forEach((doc) => {
                items.push({
                    itemId: doc.id,
                    createdAt: doc.data().createdAt,
                    BPM: doc.data().BPM,
                    genre: doc.data().genre,
                    imgPath: doc.data().imgPath,
                    path: doc.data().path,
                    price: doc.data().price,
                    tags: doc.data().tags,
                    title: doc.data().title,
                    views: doc.data().views
                });
            });
            return res.json(items);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });

};


exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Post not found' })
            }
            postData = doc.data();
            postData.postId = doc.id;
            return db.collection('comments').orderBy('createdAt', 'desc').where('postId', '==', req.params.postId).get();
        }).then(data => {
            postData.comments = [];
            data.forEach(doc => {
                postData.comments.push(doc.data());
            });
            return res.json(postData);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

exports.insertItem = async (req, res) => {
    if (req.files.music != null || req.files.img != null) {
        var fileMusic = req.files.music;
        const Musicext = "." + fileMusic.name.split('.')[fileMusic.name.split('.').length - 1];
        if (fileMusic.mimetype != "audio/mpeg")
            return res.status(500).json({ error: 'Only Mp3 files allowed' });
        var fileMusicname = Math.random().toString(36).substr(2, 9) + Musicext;

        var fileImg = req.files.img;
        const Imgext = "." + fileImg.name.split('.')[fileImg.name.split('.').length - 1];
        if (fileImg.mimetype != "image/jpeg" && fileImg.mimetype != "image/png")
            return res.status(500).json('"Error Message":"Only Png,jpeg files allowed"');
        var fileImgname = Math.random().toString(36).substr(2, 9) + Imgext;
    }
    else
        return res.status(500).json({ error: 'Sound file or/and Image is/are missing' });

    fileMusic.mv('./temp/' + fileMusicname, function (err) {
        if (err) {
            return res.json(err);
        }
        else {
            console.log("Music File uploaded");
        }
    });

    fileImg.mv('./temp/' + fileImgname, function (err) {
        if (err) {
            return res.json(err);
        }
        else {
            console.log("Img File uploaded");
        }
    });

    let flag1, flag2;
    const fs = require('fs');

    let url1 = null;



    let url2 = null;


    await admin.storage().bucket("score4-aa163.appspot.com").upload('./temp/' + fileMusicname, {
        public: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid(),
            }
        },
    }).then((res) => {
        fs.unlinkSync("./temp/" + fileMusicname);
        flag1 = true;
        console.log("Music File uploaded to firestorage");
        url1 = `https://firebasestorage.googleapis.com/v0/b/score4-aa163.appspot.com/o/${fileMusicname}?alt=media`;
    }).catch((err) => {
        console.log(err);
    });

    await admin.storage().bucket("score4-aa163.appspot.com").upload('./temp/' + fileImgname, {
        public: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid(),
            }
        },
    }).then((res) => {
        fs.unlinkSync("./temp/" + fileImgname);
        flag2 = true;
        console.log("Img File uploaded to firestorage");
        if (res)
            url2 = `https://firebasestorage.googleapis.com/v0/b/score4-aa163.appspot.com/o/${fileImgname}?alt=media`;
    }).catch((err) => {
        console.log(err);
    });

    const newItem = {
        userHandle: req.body.handle,
        createdAt: new Date().toISOString(),
        BPM: req.body.BPM,
        genre: req.body.genre,
        imgPath: url2,
        path: url1,
        price: req.body.price,
        tags: req.body.tags,
        title: req.body.title,
        freeDownload: req.body.freeDownload,
        views: 0
    };

    if (flag1 && flag2)
        db.collection('item').add(newItem)
            .then(doc => {

                index.saveObject({
                    objectID: doc.id,
                    title: newItem.title,
                    userHandle: newItem.userHandle,
                    tags: newItem.tags,
                    genre: newItem.genre,
                    BPM: newItem.BPM
                  }).then(({ objectID }) => {
                    console.log("inserted: " + objectID);
                  });
                res.status(200).json({ status: "200 OK", description: 'item deleted successfully' });
            }).catch((err) => {
                res.status(500).json({ error: 'Something went wrong' });
                console.error(err);
            });
}

exports.getItem = (req, res) => {

    let itemData = {};
    db.collection('item').doc(req.params.itemId).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Item not found' })
            }

            itemData = doc.data();

            db.collection('item').doc(req.params.itemId).update({ views: itemData.views + 1 }).then(doc => {
                itemData = doc.data();
                itemData.itemId = doc.id;
                return res.json(itemData);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });

            res.json(itemData);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.updateItem = (req, res) => {

    let itemData;

    db.collection('item').doc(req.params.itemId).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Item not found' })
            }

            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            itemData = doc.data();
            itemData.itemId = doc.id;
            if (req.body.item.BPM != null)
                itemData.BPM = req.body.item.BPM;
            if (req.body.item.genre != null)
                itemData.genre = req.body.item.genre;
            if (req.body.item.price != null)
                itemData.price = req.body.item.price;
            if (req.body.item.tags != null)
                itemData.tags = req.body.item.tags;
            if (req.body.item.title != null)
                itemData.title = req.body.item.title;
            if (req.body.item.freeDownload != null)
                itemData.freeDownload = req.body.item.freeDownload;
            db.collection('item').doc(req.params.itemId).update({ BPM: itemData.BPM, genre: itemData.genre, price: itemData.price, tags: itemData.tags, title: itemData.title, freeDownload: itemData.freeDownload }).then(doc => {
                index.partialUpdateObject({
                    objectID: doc.id,
                    title: itemData.title,
                    userHandle: itemData.userHandle,
                    tags: itemData.tags,
                    genre: itemData.genre,
                    BPM: itemData.BPM
                  }).then(({ objectID }) => {
                    console.log("updated: " + objectID);
                  });
                return res.json(itemData);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });

}

exports.deleteItem = (req, res) => {
    const document = db.collection('item').doc(req.params.itemId)
    document.get().then(doc => {
        if (!doc.exists) {
            return res.status(404).json({ error: 'Item not found' });
        }
        if (doc.data().userHandle !== req.user.handle) {
           return res.status(403).json({ error: 'Unauthorized' });
        } else {
            document.delete();
            index.deleteObject(doc.id);
        }
    }).then(() => {
        
        res.status(200).json({ status: "200 OK", description: 'item deleted successfully' });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })

}