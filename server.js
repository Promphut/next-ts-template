const express = require("express");
const next = require("next");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.use(compression());
        server.use(
            cookieSession({
                maxAge: 30 * 24 * 60 * 60 * 1000,
                keys: ["domain"],
            })
        );

        server.use(cors());
        server.use(cookieParser());
        server.use(bodyParser.json());

        server.get("/healthcheck", (req, res) => {
            res.send(JSON.stringify({ ok: 1 }));
        });

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
