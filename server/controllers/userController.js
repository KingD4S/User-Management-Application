const UserInner = require("../models/UserInner");

const getAllUser = async (req, res) => {
    try {
       const users = await UserInner.find();
       res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, phone, address } = req.body;
        const newUser = new UserInner({ name, email, phone, address });
        // console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: "User createdsuccessfully", user: newUser });
            
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

const updateUser = async (req, res) => {

  try {

    const { id } = req.params;
    // console.log(req.body, id);
    const updatedUser = await UserInner.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        // runValidators: true
      }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      }); 
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.error("UPDATE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating user"
    });

  }
};


const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedUser = await UserInner.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting user"
    });

  }
};




module.exports = {
    getAllUser, 
    createUser,
    updateUser,
    deleteUser
};