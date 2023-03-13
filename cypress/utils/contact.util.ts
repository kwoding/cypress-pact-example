import { CONTACT_LIST_LOCATORS } from "../constants/locators";
import { SAVE_CONTACT_LOCATORS } from "../constants/locators";
import { faker } from '@faker-js/faker';
import { Contact } from "../models/contact";

export const generateContact = () => {
    return {
        id: faker.datatype.number(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
    }
}

export const generateContactList = (numberOfContacts: number) => {
    const contacts = [];

    [...Array(numberOfContacts)].map(() => contacts.push(generateContact()));

    return contacts;
}

export const openContactCreationPage = () => {
    cy.get(CONTACT_LIST_LOCATORS.createContactButton).click();
}

export const editContact = () => {
    cy.get(`[data-id] ${CONTACT_LIST_LOCATORS.editContactButton}`).first().click();
}

export const deleteContact = () => {
    cy.get(`[data-id] ${CONTACT_LIST_LOCATORS.deleteContactButton}`).first().click();
    cy.get(CONTACT_LIST_LOCATORS.confirmDialogButton).click();
}

export const saveContact = (contact: Contact) => {
    cy.get(SAVE_CONTACT_LOCATORS.lastName).clear().type(contact.lastName)
        .get(SAVE_CONTACT_LOCATORS.firstName).clear().type(contact.firstName)
        .get(SAVE_CONTACT_LOCATORS.phone).clear().type(contact.phone);
    // .get(SAVE_CONTACT_LOCATORS.email).clear().type(contact.email);

    if (contact.addressLine1) {
        cy.get(SAVE_CONTACT_LOCATORS.addressLine1).clear().type(contact.addressLine1);
    }

    if (contact.addressLine2) {
        cy.get(SAVE_CONTACT_LOCATORS.addressLine1).clear().type(contact.addressLine2);
    }

    if (contact.zipCode) {
        cy.get(SAVE_CONTACT_LOCATORS.zipCode).clear().type(contact.zipCode);
    }

    if (contact.countrySubDivision) {
        cy.get(SAVE_CONTACT_LOCATORS.stateProvince).clear().type(contact.countrySubDivision);
    }

    if (contact.country) {
        cy.get(SAVE_CONTACT_LOCATORS.country).clear().type(contact.country);
    }

    cy.get(SAVE_CONTACT_LOCATORS.saveContactButton).click();
}
