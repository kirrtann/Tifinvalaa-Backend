const { getprofileData, updateUserData, deleteusers } = require("../models/userModel")

const profiledataget = async (req, res) => {
  try {
    const { email } = req.query

    const getdata = await getprofileData(email)
    res.status(200).json(getdata)

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const upadateuserdata = async (req, res) => {

  try {
    const { email, name, mobile_number, address } = req.body;
    console.log("profilecontrol", email);

    const updateuser = await updateUserData(email, name, mobile_number, address)
    console.log("update sussful", updateuser);

    res.status(200).json(updateuser)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);

  }
}

const deleteusersadteil = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email delect ", email);
    const delectusersdeta = await deleteusers(email)
    res.status(200).json(delectusersdeta)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = { profiledataget, upadateuserdata, deleteusersadteil }