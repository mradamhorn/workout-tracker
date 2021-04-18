const router = require("express").Router();
const { Workout } = require("../../models");

router.get("/", (req, res) => {
    try {
        const workoutData = Workout.findAll();
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/:id", (req, res) => {
    try {
        const newExercise = Workout.create({
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance,
        });
        res.status(200).json(newExercise);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/", (req, res) => {
    Workout.update(
        {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => res.json(err));
});

module.exports = router;