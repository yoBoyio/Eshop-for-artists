const { db } = require('../util/admin');

exports.getAllTests = (req, res) => {
  db.collection('test')
    .get()
    .then((data) => {
      let tests = [];
      data.forEach((doc) => {
        tests.push({
            field: doc.data(),
          anotherfield: doc.data(),
        });
      });
      return res.json(tests);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code + "lathos" });
    });
};

