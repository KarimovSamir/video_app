import express, { Express } from 'express';
import { testingRouter } from './testing/routers/testing.router';
import { videoRouter } from './videos/routers/videos.router';

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Video app");
    });

    app.use("/testing", testingRouter);

    app.use("/videos", videoRouter);

    return app;
};