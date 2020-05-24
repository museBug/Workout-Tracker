const Workout = require("./models/workout.js")

module.exports = function (app) {

    app.get("../api/workouts", function (req, res) {
        Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.post("../api/workouts", function (req, res) {
        Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    //Put request

    app.put("../api/workouts/:id", (req,res) => {

        let urlData = req.params;
        let data = req.body;
           Workout.updateOne( {_id: urlData.id }, {$push: {exercises:  [
            {
            "type" : data.type,
            "name" : data.name,
            "duration" : data.duration,
            "distance" : data.distance,
            "weight" : data.weight,
            "reps" : data.reps,
            "sets" : data.sets
            }
          ] 
        }}).then(dbUpdate => {
          res.json(dbUpdate);
        })
        .catch(err => {
          res.json(err);
        });
        
        });

  
        //Get Range Request

        app.get("/api/workouts/range", (req,res) => {
        Workout.find({})
        .then(data => {
        res.json(data);
        })
        .catch(err => {
        res.json(err);
        });
        });

}