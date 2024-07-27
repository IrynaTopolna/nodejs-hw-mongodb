import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

async function getContactsController(req, res, next) {
  const contacts = await getAllContacts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

async function getContactByIdController(req, res, next) {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

async function createContactController(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const newContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

async function updateContactController(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const updatedContact = await updateContact(id, contact);

  if (!updatedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
}

async function deleteContactController(req, res, next) {
  const { id } = req.params;

  const deletedContact = await deleteContact(id);

  if (!deletedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

export {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
};
