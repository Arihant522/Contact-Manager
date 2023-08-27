// api to get all the contacts
const asyncHandler = require("express-async-handler");
const contacts = require("../models/contactModel");
const getContacts = asyncHandler(async (req, res) => {
  const contactList = await contacts.find({user_id:req.user.id});
  console.log(contactList);
  res.json({ name: "router is getting" });
});

// api to get all the contacts
const getContact = asyncHandler(async (req, res) => {
  const contactList = await contacts.findById(req.params.id);
  console.log(contactList);
  res.json({ name: "router is getting a paricular contact" });
});
// api to creating the contacts
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const newcontact = await contacts.create({
    name,
    email,
    phone,
    user_id : req.user.id
  });
  res.json(newcontact);
});

// api to updating the contacts
const updateContact = asyncHandler(async (req, res) => {
  const contactToUpdate=await contacts.findById(req.params.id);
  if(contactToUpdate.user_id.to_String()!==req.user.id)
    {
      return res.status(401).send('You can only update your own contacts');
    }
    const updatedcontact = await contacts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(updatedcontact);
  res.json({ name: "router is updating" });
});

// api to  deleting the contacts
const deleteContact = asyncHandler(async (req, res) => {
    const contactToDelete=await contacts.findById(req.params.id);
    if(contactToDelete.user_id.to_String()!==req.user.id)
    {
      return res.status(401).send('You can only delete your own contacts');
    }
    if(!contactToDelete)
    {
        res.status(400);
        throw new Error('No Contact Found');
    }
     await contacts.deleteOne({_id:req.params.id});
  console.log(contactToDelete);
  res.json({ name: "router is deleting" });
});
module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
