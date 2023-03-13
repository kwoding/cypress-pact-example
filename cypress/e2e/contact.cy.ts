import { COMMON_LOCATORS } from '../constants/locators';
import { generateContact, deleteContact, editContact, openContactCreationPage, saveContact } from '../utils/contact.util';

describe('Contact Manager', () => {
  beforeEach(() => {
    cy.setupPact('contact-frontend', 'contact-service');
    cy.setUpDefaultMocks();
    cy.visit('/');
  });

  it('should be able to create a contact', () => {
    openContactCreationPage();
    saveContact({ ...generateContact() });

    cy.usePactWait(['getContacts', 'postContact']);
    cy.get(COMMON_LOCATORS.snackbarMessage).should('have.text', 'Contact added successfully');
  });

  it('should be able to edit a contact', () => {
    editContact();
    saveContact(generateContact());

    cy.usePactWait(['getContactById', 'putContact']);
    cy.get(COMMON_LOCATORS.snackbarMessage).should('have.text', 'Contact updated successfully');
  });

  it('should be able to delete a contact', () => {
    deleteContact();

    cy.usePactWait(['deleteContact']);
    cy.get(COMMON_LOCATORS.snackbarMessage).should('have.text', 'Contact deleted successfully');
  });

});