const { db } = require('../util/admin');

exports.addFavorites = (req, res) => {

    document = db.collection('item').doc(req.params.itemId).get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Items not found' });


            db.collection('favorites').where("userHandle", "==", req.body.handle).get()
                .then(data => {
                    if (data.size == 0) {
                        const favorites = {
                            userHandle: req.user.handle,
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
    console.log(req.user)
    let retFavorites = [];
    db.collection('favorites').where("userHandle", "==", req.user.handle).get()
        .then(data => {
            if (data.docs == null) {
                return res.status(400).json({ Message: 'User Has no favorites' })
            }

            data.forEach((doc) => {
                FavoritesData = doc.data();
                FavoritesData.favorite_id = doc.id;
                // FavoritesData.items.push(rffe)

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

                                retFavorites.push({
                                    itemId: doc.id,
                                    createdAt: doc.data().createdAt,
                                    BPM: doc.data().BPM,
                                    genre: doc.data().genre,
                                    imgPath: doc.data().imgPath,
                                    path: doc.data().path,
                                    price: doc.data().price,
                                    tags: doc.data().tags,
                                    title: doc.data().tags,
                                    views: doc.data().views,
                                    userHandle: doc.data().userHandle

                                });
                            // retFavorites.items.push(doc.id);

                            // retFavorites.push(doc.id);
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

exports.deleteFavorites = (req, res) => {
    // console.log(req.user)
    const document = db.collection('favorites').where("userHandle", "==", req.user.handle).get().
        then(data => {

            //if(!doc.exists)
            //        return res.status(404).json({error: 'User have never added something to cart'});

            let CartData;
            data.forEach((doc) => {
                CartData = doc.data();
                CartData.CartId = doc.id;
                const index = CartData.items.indexOf(req.params.itemId);
                if (index > -1) {
                    CartData.items.splice(index, 1);
                }

            })

            db.collection('favorites').doc(CartData.CartId).update({ items: CartData.items }).then(doc => {
                return res.json(CartData);
            });

        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

