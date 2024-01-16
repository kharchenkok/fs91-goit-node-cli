import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid/non-secure";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.find((contact) => contact.id === contactId);

  if (!removedContact) {
    return null;
  }

  const updatedContactsList = contacts.filter(
    (contact) => contact.id !== contactId,
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2),
  );

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
