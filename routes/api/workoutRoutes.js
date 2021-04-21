const router = require("express").Router();
const { Workout } = require("../../models");

router.get("/", (req, res) => {
    Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/", (req, res) => {
    Workout.create({ type: "workout" })
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
})

router.post("/:id", (req, res) => {
    Workout.create({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance,
    },
    )
        .then(newExercise => {
            res.json(newExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/:id", ({ body, params }, res) => {
    const workoutId = params.id;
    let savedExercises = [];

    Workout.find({ _id: workoutId })
        .then(dbWorkout => {
            savedExercises = dbWorkout[0].exercises;
            res.json(dbWorkout[0].exercises);
            let allExercises = [...savedExercises, body]
            console.log(allExercises)
            updateWorkout(allExercises)
        })
        .catch(err => {
            res.json(err);
        });

    function updateWorkout(exercises) {
        Workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
            if (err) {
                console.log(err)
            }

        })
    }

})

router.get("/range", (req, res) => {
    Workout.find({})
        .sort({ day: -1 })
        .limit(7)
        .sort({ day: 1 })
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;