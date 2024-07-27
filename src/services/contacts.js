import { Contact } from '../models/contactSchema.js';

async function getAllContacts({ page, perPage, sortBy, sortOrder, filter }) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsPerPage, totalItems] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    Contact.countDocuments(contactQuery),
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
