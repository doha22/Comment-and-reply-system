const router = require("express").Router();
const userController = require("../Controller/userController");
const { catchErrors } = require("../Handller/errors");

router.post("/login", catchErrors(userController.login));


router.post("/register", catchErrors(userController.register));

// error handler
router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


module.exports = router;