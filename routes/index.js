const homeRoute = require("./home");
const accountRoute = require("./account");
const categoryRoute = require("./categories");

const constructorMethod = (app) => {
    app.use("/", homeRoute);
    app.use("/account", accountRoute);
    app.use("/categories", categoryRoute);
    app.use("*", (req, res) => {
        res.status(404).json({
            error: "Not found"
        });
    });
};

module.exports = constructorMethod;