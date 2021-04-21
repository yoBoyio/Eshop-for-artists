
const {db, admin} = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');



exports.discoverItems = (req,res) => {
    let page = 0;
    let sortby="views";
    let BPMstart =0;
    let BPMend =300;
    let type="desc";
    
    if (req.body.page!=null || req.body.page>0){
        page=req.body.page;
    }

    if (req.body.sortby!=null){
        sortby=req.body.sortby;
    }
    if (req.body.BPMstart!=null){
        sortby=req.body.BPMstart;
    }
    
    if (req.body.BPMend!=null){
        sortby=req.body.BPMend;
    }
    
    if (req.body.sortby!=null){
        sortby=req.body.sortby;
    }

    if(sortby==="high" || sortby==="low")
    {
        sortby="price";
        if (sortby==="low")
            type="asc";
    }

    //return res.json(type);


    if (req.body.genre!=null)
    db.collection('item').orderBy("BPM","asc").where("BPM",">=",BPMstart).where("BPM","<=",BPMend).where("gerne","array-contains",req.body.genre).orderBy(sortby,type).limit(40).offset(page*40).get()
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
        db.collection('item').orderBy("BPM").where("BPM",">=",BPMstart).where("BPM","<=",BPMend).orderBy(sortby,type).limit(40).offset(page*40).get()
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

exports.insertItem = (req,res) => {

    const newItem = {
        userHandle: req.body.user.handle,
        createdAt: new Date().toISOString(),
        BPM: req.body.item.BPM,
        genre: req.body.item.genre,
        imgPath: req.body.item.imgPath,
        path: req.body.item.path,
        price: req.body.item.price,
        tags: req.body.item.tags,
        title: req.body.item.title,
        freeDownload: req.body.item.freeDownload,
        views: 0
    };

    db.collection('item').add(newItem)
    .then(doc => {
        const retItem = newItem;
        retItem.ItemId = doc.id;
        res.json(retItem);
    }).catch((err) => {
        res.status(500).json({ error: 'Something went wrong'});
        console.error(err);
    });
}

exports.getItem = (req,res) => {

    let itemData = {};
    db.collection('item').doc(req.params.itemId).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({error: 'Item not found'})
        }
        itemData = doc.data();
        itemData.itemId = doc.id;
        res.json(itemData);        
    }).catch(err => {
        console.error(err);
        res.status(500).json({error: err.code});
    });
}

exports.updateItem = (req,res) => {
    
    let itemData;
    
    db.collection('item').doc(req.params.itemId).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({error: 'Item not found'})
        }
        itemData = doc.data();
        itemData.itemId = doc.id;
        if(req.body.item.BPM!=null)
        itemData.BPM = req.body.item.BPM;
        if(req.body.item.genre!=null)
        itemData.genre = req.body.item.genre;
        if(req.body.item.price!=null)
        itemData.price = req.body.item.price;
        if(req.body.item.tags!=null)
        itemData.tags = req.body.item.tags;
        if(req.body.item.title!=null)
        itemData.title = req.body.item.title;
        if(req.body.item.freeDownload!=null)
        itemData.freeDownload = req.body.item.freeDownload; 
        db.collection('item').doc(req.params.itemId).update({BPM: itemData.BPM, genre:itemData.genre, price:itemData.price, tags: itemData.tags, title: itemData.title, freeDownload: itemData.freeDownload}).then(doc =>
        {
            return res.json(itemData);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });      
    }).catch(err => {
        console.error(err);
        res.status(500).json({error: err.code});
    });

}

exports.addViews = (req,res) => {
    db.collection('item').doc(req.params.itemId).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({error: 'Item not found'})
        }

        itemData = doc.data();
        itemData.itemId = doc.id;
        itemData.views+=1;
        db.collection('item').doc(req.params.itemId).update({views: itemData.views}).then(doc =>
        {
            return res.json(itemData);
        }).catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });      
    }).catch(err => {
        console.error(err);
        res.status(500).json({error: err.code});
    });

}