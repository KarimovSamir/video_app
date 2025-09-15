import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";
import { Video } from "../types/video";
import { videoValidation } from "../validation/video.validation";
import { CreateErrorMessages } from "../../core/utils/error.utils";

export const videoRouter = Router();

videoRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send(db.videos);
})

videoRouter.get("/:id",
    (
        req: Request<{ id: number }, Video, {}, {}>,
        res: Response <Video | null>,
    ) => {
        const video = db.videos.find((v) => v.id === +req.params.id);
        if (!video) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(video);
})

videoRouter.post("/", (req: Request, res: Response) => {
    const errors = videoValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(CreateErrorMessages(errors));
        return;
    }

    const nowISO = new Date().toISOString();
    const tomorrowISO = new Date(Date.now() + 24*60*60*1000).toISOString();

    const newVideo: Video = {
        id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: nowISO,
        publicationDate: tomorrowISO,
        availableResolutions: req.body.availableResolutions ?? [],
    };
    db.videos.push(newVideo);
    res.status(HttpStatus.Created).send(newVideo);
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                CreateErrorMessages([{field: 'id', message: 'Video not found'}]),
            );
        return;
    }

    const errors = videoValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(CreateErrorMessages(errors));
        return;
    }

    const video = db.videos[index];
    video.title = req.body.title;
    video.author = req.body.author;
    if (typeof req.body.canBeDownloaded === 'boolean') {
        video.canBeDownloaded = req.body.canBeDownloaded;
    }
    if (req.body.minAgeRestriction !== undefined) {
        video.minAgeRestriction = req.body.minAgeRestriction;
    }
    if (req.body.publicationDate !== undefined) {
        video.publicationDate = req.body.publicationDate; // ISO-строка
    }
    if (req.body.availableResolutions !== undefined) {
        video.availableResolutions = req.body.availableResolutions;
    }

    res.sendStatus(HttpStatus.NoContent);

});

videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве,
    //если id ни у кого не совпал, то findIndex вернёт -1.
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                CreateErrorMessages([{ field: 'id', message: 'Video not found' }]),
            );
        return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
});