
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.productsBoard = (req, res) => {
    res.json({message: "products"});
  };
  exports.addProduct = (req, res) => {
    // Save Products to Database
    Product.create({
      image: req.body.image,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      img: req.body.img,
      price: req.body.price
    })
      .then(product => {
        if (req.body.title == null || req.body.title == ""){
          res.send({ message: "Please add all item details" });
        } else {
          // user role = 1
            res.send({ message: "Product added successfully!" });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };