
const { db, admin } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');



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
};

exports.insertItem = (req, res) => {
    console.log(req)
    const newItem = {
        userHandle: req.body.handle,
        createdAt: new Date().toISOString(),
        BPM: req.body.BPM,
        genre: req.body.genres,
        imgPath: req.files.imgPath,
        path: req.files.path,
        price: req.body.price,
        tags: req.body.tags,
        title: req.body.title,
        freeDownload: req.body.freeDownload,
        views: 0
    };

    db.collection('item').add(newItem)
        .then(doc => {
            const retItem = newItem;
            retItem.ItemId = doc.id;
            res.json(retItem);
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
            return document.delete();
        }
    }).then(() => {
        res.status(200).json({ status: "200 OK", description: 'item deleted successfully' });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })

}