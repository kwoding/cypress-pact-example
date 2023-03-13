import '@pactflow/pact-cypress-adapter';
import { generateContact, generateContactList } from '../utils/contact.util';
import { faker } from '@faker-js/faker';

Cypress.Commands.add('setUpDefaultMocks', () => {
    cy.intercept({ method: 'GET', url: '/contacts' },
        {
            statusCode: 200,
            body: {
                "content": generateContactList(faker.datatype.number({ min: 5, max: 30 }))
            }
        }
    ).as('getContacts');

    cy.intercept({ method: 'GET', url: '/contacts/*' }, generateContact()).as('getContactById');
    cy.intercept({ method: 'POST', url: '/contacts' },
        {
            statusCode: 201,
            body: {
                id: faker.datatype.number(),
            },
        }
    ).as('postContact');

    cy.intercept({ method: 'PUT', url: '/contacts/*' }, { statusCode: 204 }).as('putContact');
    cy.intercept({ method: 'DELETE', url: '/contacts/*' }, { statusCode: 200 }).as('deleteContact');
});
