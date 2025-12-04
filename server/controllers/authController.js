
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if(!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  if(User.findOne({ email })) {
    return res.status(400).send("User already exists");
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: passwordHash, role });
  newUser.save()
    const token = jwt.sign({ id: newUser._id }, "your_jwt_secret");
  res.send({ message: "User registered successfully" , user: newUser.select('-password'), token: token });
}

export const loginUser = (req, res) => {
  // Login logic here
  const { email, password } = req.body;
    if(!email || !password) {
    return res.status(400).send("All fields are required");
  }
    const user = User.findOne({ email });
    if(!user) {
    return res.status(400).send("User does not exist");
  }
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, "your_jwt_secret");
  res.send({ message: "User logged in successfully", user: user.select('-password'), token: token });
}