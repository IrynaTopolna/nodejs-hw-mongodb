import { Contact } from '../models/contactSchema.js';

async function getAllContacts() {
  const allContacts = await Contact.find();
  return allContacts;
}

async function getContactById(id) {
  const contact = await Contact.findById(id);
  return contact;
}

async function createContact(contact) {
  const newContact = await Contact.create(contact);
  return newContact;
}

async function updateContact(id, contact) {
  const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  return updatedContact;
}

async function deleteContact(id) {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact;
}

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
