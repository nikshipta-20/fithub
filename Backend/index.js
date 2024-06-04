import express from "express"
// import {PORT, mongoDBURL} from './config.js';
import jwt from "jsonwebtoken"
import cors from "cors";
import mongoose from "mongoose";
import {User} from "./models/UserModel.js"
import { Group } from "./models/GroupModel.js";
import { Program } from "./models/ProgramModel.js";
import { Set } from "./models/SetModel.js";
import { v4 as uuidv4 } from 'uuid';
import checkUserAuth from './middleware/auth-middleware.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5555;
const mongoDBURL = 'mongodb+srv://root:root@fithub.16uttnb.mongodb.net/FitHubDB?retryWrites=true&w=majority&appName=FitHub';

// Age calculation

function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
}

function calculateProgress(setsCompleted, totalDays) {
    // Calculate the total number of sets
    const totalExe = totalDays * 10; // Each day 1 set and each set has 9 exercises
    const completedExe = setsCompleted * 10;
  
    // Calculate the progress percentage
    const progress = (completedExe / totalExe) * 100;
  
    // Round the progress to two decimal places
    const roundedProgress = Math.round(progress * 100) / 100;
  
    return roundedProgress;
}

// signup route


app.post('/signup', async (req,res) => {
    try{
        if(!req.body.sfname || !req.body.slname || !req.body.semail || !req.body.spassword || !req.body.sdateofbirth || !req.body.sgender ){
            return res.status(400).send({
                message: 'All fields not filled'
            });
        }

        const name = req.body.sfname + " " + req.body.slname ;
        const age = calculateAge(req.body.sdateofbirth);
        const userID = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.spassword, 10); // 10 is the saltRounds

        const newUser = {
            Name: name,
            Age: age,
            Gender: req.body.sgender,
            Email: req.body.semail,
            Password: hashedPassword,
            Height: req.body.sheight,
            Weight: req.body.sweight
        }

        const user = await User.create(newUser);
        const saved_user = await User.findOne({Email: req.body.semail });
        // Generate JWT Token
        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
        return res.status(201).send({"status": "success", "message": "Signed up Successfully", "token": token});
    }
    catch(error){
        console.log(error);
    }
});

// signin route

app.post('/signin', async (req,res) => {
    try{

        console.log(req.body);

        // if(!req.body.email || !req.body.password ){
        //     return res.status(400).send({
        //         message: 'Enter Email and Password'
        //     });
        // }

        const email = req.body.email;
        const pass = req.body.password;

        console.log(email);
        console.log(pass);

        // Find the user by email
        const user = await User.findOne({ Email : email });
        console.log("user:" + user);

        if (!user) {
            return res.status(404).send({
                message: 'User not found.'
            });
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(pass, user.Password);

        if (!passwordMatch) {
            return res.status(401).send({
                message: 'Incorrect password.'
            });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
        res.send({ "status": "success", "message": "Signin Success", "token": token })

        //res.status(200).json({ message: 'exist' });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// creating a new group

app.post('/createGroup', async (req,res) => {
    try{
        console.log(req.body);

        const newGroup = {
            GroupID : Math.floor(Math.random() * 1000000),
            GroupName: req.body.GroupName,
            Users : req.body.Users
        }
        const group = await Group.create(newGroup);
        return res.status(201).send(group);
    }
    catch(error){
        console.log(error);
    }
});

app.use('/userGroups', checkUserAuth);
app.get('/userGroups', async (req, res) => {
    try {
        const user = req.user;
          if(!user) {
              return res.status(404).json({error: "User not found"});
          }
        const userID = user.UserID;
        console.log(userID)
        const userGroups = await Group.find({ 'Users.UserID': userID });
        console.log(userGroups);
        res.json(userGroups);
    } catch (error) {
        console.error('Error retrieving user groups:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getPrograms', async (req, res) => {
    Program.find()
    .then(programs => {
        console.log(programs);
        res.json(programs);
    })
    .catch(err => res.json(err))
});

// adding a program into user -- http://localhost:5555/addProgram/105

app.post('/addProgram/:pid/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const pid = req.params.pid;

        // Find the user by userId
        const user = await User.findOne({ UserID: userID });

        console.log("hii", user);

        if (!user) {
            return res.status(404).send({
                message: 'User not found.'
            });
        }

        user.Programs.push({
            Pid: pid,
            Progress: 1
        });


        await user.save();

        console.log("Successfully added the program");

        res.status(200).send({
            message: "Program successfully added to the user"
        });

        
    }
    catch(error){
        console.error("Error retrieving program preview:", error);
        res.status(500).send("Internal server error");
    }
})

// adding programs into a group

app.post('/addProgGroup/:groupId', async (req, res) => {
    try{
        const groupID = req.params.groupId;
        const {pid, progress} = req.body;

        if (!pid || !progress) {
            return res.status(400).send({
                message: 'Pid and Progress are required fields.'
            });
        }

        // Find the group
        const group = await Group.findOne({GroupID: groupID});

        if(!group){
            return res.status(404).send({
                message: 'Group not found.'
            });
        }

        group.Programs.push({
            Pid: pid,
            Progress: progress
        });

        await group.save();

        for(let i=0; i<group.Users; i++){
            const user = await User.findOne({ UserID: group.Users[i].UserID });
            user.Programs.push({
                Pid: pid,
                Progress: progress
            });
            await user.save();
        }
        
        return res.status(200).send(group);

    }
    catch(error){
        console.log(error);
    }
})

app.use('/loggeduser', checkUserAuth);
app.get('/loggeduser', async(req, res) => {
    res.send({"user": req.user});
})

app.get('/program/:pid', async (req, res) => {
    const { pid } = req.params;
    const program = await Program.findOne({ Pid: parseInt(pid) });
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ error: 'Program not found' });
    }
});

app.use('/myprograms', checkUserAuth);
app.get('/myprograms', async (req, res) => {
      try {
          const user = req.user
          // console.log(user.UserID);
          // const user = await User.findById(userId);
          if(!user) {
              return res.status(404).json({error: "User not found"});
          }
          res.send({"user": req.user, "myprograms" : req.user.Programs});
      }
      catch(err) {
          res.status(500).json({error: "Internal server error"});
    }
});

app.post('/myProgram/:user/:pid', async(req, res) => {
    try{

        const {user, pid} = req.params;
        console.log(user,pid);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        
        //const program = await Program.findOne({ Pid: parseInt(pid) });

        const program = await Program.aggregate([
            { $match: { Pid: parseInt(pid) } }, // Match the program by ProgramID
            {
              $lookup: {
                from: 'sets', // Assuming the name of your Set collection is 'sets'
                localField: 'Sets.SetID',
                foreignField: 'SetID',
                as: 'SetsData'
              }
            }
          ]);

        console.log("program", JSON.stringify(program));

        const setNos = program[0].Sets || [];

        console.log("setNos", setNos);

        async function getAllExercises(setNos){
            try{
                if (!Array.isArray(setNos) || setNos.length === 0) {
                    throw new Error("Invalid set IDs provided");
                }

                const allExercises = [];

                for (const setID of setNos) {
                    // Find the set object from sets collection in db
                    const set = await Set.findOne({ SetID: setID });

                    //console.log("set", set);

                    //console.log(set.Exercises.map(exercise => Object.values(exercise).join('')).join('\n'));

                    
                    
              
                    if (set && set.Exercises) { 
                        const exercises = set.Exercises.map(exercise => Object.values(exercise).join('')).join('\n')
                        //console.log(exercises);
                        allExercises.push(...exercises); 
                    } else {
                        console.warn(`Set not found or has no exercises: ${setID}`);
                    }
                    
                }
                return allExercises;
            }
            catch(error) {
                console.error("Error fetching exercises");
          }
        }

        const allExe = getAllExercises(setNos);

        //console.log(allExe);
        res.status(200).json(allExe);

    }
    catch(err){
        res.status(500).json({error: "Internal server error"});
    }
});

app.get('/openProgram/:user/:pid', async(req, res) => {

    try{

        const {user, pid} = req.params;
        console.log(user,pid);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        
        //const program = await Program.findOne({ Pid: parseInt(pid) });

        const program = await Program.aggregate([
            { $match: { Pid: parseInt(pid) } }, // Match the program by ProgramID
            {
              $lookup: {
                from: 'sets', // Assuming the name of your Set collection is 'sets'
                localField: 'Sets.SetID',
                foreignField: 'SetID',
                as: 'SetsData'
              }
            }
          ]);

        console.log("program", JSON.stringify(program));

        const setNos = program[0].Sets || [];

        console.log("setNos", setNos);

        if(!Array.isArray(setNos) || setNos.length === 0){
            throw new Error("ivalid set ids provided");
        }

        const allExercises = [];

        for(let j = 0; j < setNos.length; j++){
            if(setNos[j] != 0){
                const set = await Set.findOne({SetID: setNos[j]});
                console.log(set.SetName)
                console.log("hi",set.Exercises[0].name)

                const setExercises = set.Exercises;

                const exerciseNames = [];
                for(let i = 0; i < setExercises.length; i++){
                    exerciseNames.push(setExercises[i].name);
                }

                // console.log("printing exercise names: \n");
                // console.log(exerciseNames);

                allExercises.push(exerciseNames);
            }
            else{
                const rest = ["Rest day"];
                allExercises.push(rest);
            }
            
        }

        console.log("printing all exercises");
        console.log(allExercises);

        
        
        res.status(200).json(allExercises);

    }
    catch(err){
        res.status(500).json({error: "Internal server error"});
    }

});


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose
    .connect(mongoDBURL,clientOptions)
    .then(() => {
        console.log('App connected to db');
        app.listen(PORT, () => {
            console.log("App is listening");
        })
    })
    .catch((error) => {
        console.log(error);
    })

// async function run() {
//     try {
//       // Connect to MongoDB
//       await mongoose.connect(mongoDBURL, clientOptions);
  
//       // Ping the database to check the connection
//       await mongoose.connection.db.admin().command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
//       // Start your application logic or server
//       app.listen(PORT, () => {
//         console.log("App listening");
//       });
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//     }
//   }
  
//   // Run the application
//   run();
  