const homeRoute = require("./home");
const accountRoute = require("./account");
const categoryRoute = require("./categories");
const experienceRoute = require("./experience");

const constructorMethod = (app) => {
    app.use("/", homeRoute);
    app.use("/account", accountRoute);
    app.use("/categories", categoryRoute);
    app.use("/experience", experienceRoute);
    app.use("*", (req, res) => {
        res.status(404).json({
            error: "Not found"
        });
    });
};

module.exports = constructorMethod;