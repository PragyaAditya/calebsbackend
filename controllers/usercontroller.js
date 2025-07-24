const User = require('../models/usermodel');

// Create
exports.createUser = async (req, res) => {
  try {
    const { name, number, email } = req.body;
    const newUser = new User({ name, number, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Read All
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};


exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  // ✅ Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};