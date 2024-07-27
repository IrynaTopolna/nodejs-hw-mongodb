import { Contact } from '../models/contactSchema.js';

async function getAllContacts({ page, perPage }) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [contactsPerPage, totalItems] = await Promise.all([
    Contact.find().skip(skip).limit(limit).exec(),
    Contact.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contactsPerPage,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

async function getContactById(id) {
  return Contact.findById(id);
}

async function createContact(contact) {
  return Contact.create(contact);
}

async function updateContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
}

async function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
