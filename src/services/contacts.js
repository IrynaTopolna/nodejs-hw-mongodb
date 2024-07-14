import { Contact } from '../models/contactSchema.js';

async function getAllContacts() {
  const allContacts = await Contact.find();
  return allContacts;
}

async function getContactById(id) {
  const contact = await Contact.findById(id);
  return contact;
}

export { getAllContacts, getContactById };
