import express from "express"
import {create,getAllData,getUserById,update,deleteUser} from "../controller/userController.js"

const route=express.Router()
route.post("/user",create);
route.get("/users",getAllData);
route.get("/user/:id",getUserById);

route.put("/user/:id",update);
route.delete("/user/:id", deleteUser);


route.get("/test", (req, res) => {
  res.send("Router is working!");
});


export default route;