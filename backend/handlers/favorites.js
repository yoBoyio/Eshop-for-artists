const { db } = require('../util/admin');

exports.addFavorites = (req, res) => {
    console.log(req.body.handle)

    document = db.collection('item').doc(req.params.itemId).get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Items not found' });


            db.collection('favorites').where("userHandle", "==", req.body.handle).get()
                .then(data => {
                    if (data.size == 0) {
                        const favorites = {
                            userHandle: req.body.handle,
                            items: [req.params.itemId]
                        };

                        db.collection('favorites').add(favorites)
                            .then(doc => {

                                const retfavorites = favorites;
                                retfavorites.favorite_id = doc.id;
                                return res.json(retfavorites);

                            }).catch((err) => {

                                res.status(500).json({ error: 'Something went wrong' });
                                console.error(err);
                            })


                    }
                    else {
                        let FavoritesData;
                        data.forEach((doc) => {
                            FavoritesData = doc.data();
                            FavoritesData.favorite_id = doc.id;
                            FavoritesData.items.push(req.params.itemId);

                        })

                        db.collection('favorites').doc(FavoritesData.favorite_id).update({ items: FavoritesData.items }).then(doc => {
                            return res.json(FavoritesData);
                        }).catch(err => {
                            console.error(err);
                            res.status(500).json({ error: err.code });
                        });
                    }
                })
        });
}
exports.getFavorites = (req, res) => {
    let retFavorites = [];

    db.collection('favorites').where("userHandle", "==", req.body.handle).get()
        .then(data => {
            if (data.docs == null) {
                return res.status(400).json({ Message: 'User Has no favorites' })
            }

            data.forEach((doc) => {
                FavoritesData = doc.data();
                FavoritesData.favorite_id = doc.id;

                if (FavoritesData.items.length == 0) {
                    return res.json(FavoritesData);
                }

                itemsProcessed = 0;

                FavoritesData.items.map((item) => {
                    db.collection('item').doc(item).get()
                        .then(doc => {
                            if (!doc.exists)
                                retFavorites.push("Not Found");
                            else
                                retFavorites.push(doc.data());
                            itemsProcessed++;

                            if (itemsProcessed === FavoritesData.items.length) {
                                FavoritesData.items = retFavorites;
                                res.json(FavoritesData);
                            }
                        });


                })



            })
        })
}