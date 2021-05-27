
const { db, admin } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');


exports.getCart = (req, res) => {

    let retItems = [];

    db.collection('cart').where("userHandle", "==", req.user.handle).get()
        .then(data => {

            if (data.docs == null) {
                return res.status(404).json({ Message: 'User Has no cart' })
            }
            data.forEach((doc) => {
                CartData = doc.data();
                CartData.CartId = doc.id;

                if (CartData.items.length == 0) {
                    return res.json(CartData);
                }
                itemsProcessed = 0;

                CartData.items.map((item) => {
                    db.collection('item').doc(item).get()
                        .then(doc => {

                            if (doc.exists) {
                                retItems.push({
                                    itemId: doc.id,
                                    createdAt: doc.data().createdAt,
                                    BPM: doc.data().BPM,
                                    genre: doc.data().genre,
                                    imgPath: doc.data().imgPath,
                                    path: doc.data().path,
                                    price: doc.data().price,
                                    tags: doc.data().tags,
                                    title: doc.data().title,
                                    views: doc.data().views,
                                    userHandle: doc.data().userHandle,
                                    freeDownload: doc.data().freeDownload
                                });

                            }
                            itemsProcessed++;
                            if (itemsProcessed === CartData.items.length) {
                                CartData.items = retItems;
                                res.json(CartData);
                            }
                        });


                })



            })
        })
}


exports.insertItemToCart = (req, res) => {

    document = db.collection('item').doc(req.params.itemId).get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Item not found' });


            db.collection('cart').where("userHandle", "==", req.user.handle).get()
                .then(data => {
                    if (data.size == 0) {
                        const newCart = {
                            userHandle: req.user.handle,
                            items: [req.params.itemId]
                        };

                        db.collection('cart').add(newCart)
                            .then(doc => {

                                const retCart = newCart;
                                retCart.CartId = doc.id;
                                return res.json(retCart);

                            }).catch((err) => {

                                res.status(500).json({ error: 'Something went wrong' });
                                console.error(err);
                            })


                    }
                    else {
                        let CartData;
                        data.forEach((doc) => {
                            CartData = doc.data();
                            CartData.CartId = doc.id;
                            CartData.items.push(req.params.itemId);

                        })

                        db.collection('cart').doc(CartData.CartId).update({ items: CartData.items }).then(doc => {
                            return res.json(CartData);
                        }).catch(err => {
                            console.error(err);
                            res.status(500).json({ error: err.code });
                        });
                    }
                })
        });
}


exports.deleteItemFromCart = (req, res) => {

    const document = db.collection('cart').where("userHandle", "==", req.user.handle).get().
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

            db.collection('cart').doc(CartData.CartId).update({ items: CartData.items }).then(doc => {
                return res.json(CartData);
            });

        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

