const express = require("express");
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin:"https://role-base-access-control.netlify.app",
    credentials: true,
  })
);

const mongoUrl = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  role: String,
  status: String,
  permission: { type: [String] },
});

const User = mongoose.model("users", userSchema);

app.post("/form", async (req, res) => {
  const { name, email, role, status, permission } = req.body;
  try {
    const newUser = new User({ name, email, role, status, permission });
    await newUser.save();
    res.status(201).send({ message: "User added successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error adding user. Please try again." });
  }
});

app.get("/allusers",async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).send({users});
  }
  catch(e){
    console.error(e);
    res.status(500).send({ message: "Error in fetching details." });
  }
})

app.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user." });
  }
});

app.put("/updateuser/:id", async (req, res) => {
  const { role, status, permission } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { role, status, permission });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
