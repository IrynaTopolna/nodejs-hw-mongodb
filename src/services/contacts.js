import { Contact } from '../models/contactSchema.js';

async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.find({ userId: userId });

  const [totalContacts, contactsPerPage] = await Promise.all([
    // Contact.find().merge(contactQuery).countDocuments(),
    Contact.countDocuments(contactQuery),

    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const totalPages = Math.ceil(totalContacts / perPage);

  return {
    data: contactsPerPage,
    page,
    perPage,
    totalItems: totalContacts,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

async function getContactById(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId });
}

async function createContact(contact) {
  return Contact.create(contact);
}

async function updateContact(contactId, userId, contact) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
}

async function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId });
}

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
