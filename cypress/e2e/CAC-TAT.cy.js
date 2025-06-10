describe('Central de Atendimento ao Cliente TAT', () => {


    beforeEach( ()=> {
        cy.visit("./src/index.html")
    })


    it('Check the aplication title', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    });

    //----------------------------Exercício 01----------------------------//
    it('Fill in mandatory fields and send the form', () => {

        const longText = Cypress._.repeat(' Thanks 1000x ', 5)

        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com')
        cy.get('#phone').type('71999799831')
        cy.get('#open-text-area').type(longText, {delay: 5})
        cy.get('button[type="submit"]').click()


        cy.get('.success').should('be.visible',)

    })
    //----------------------------Exercício 02----------------------------//
    it('Show error message when the form is submitted with an invalid email format', () => {
        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail,com')
        cy.get('#phone').type('71999799831')
        cy.get('#open-text-area').type('Testing Cypress', {delay: 20})
        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible',)

    });

    //----------------------------Exercício 03----------------------------//
    it('If the phone field contains non-numeric characters, it remains empty', () => {
        cy.get('#phone').type("Test")


        cy.get('#phone').should('have.value', '')
    });

    //----------------------------Exercício 04----------------------------//
    it('Display an error message when the phone number becomes mandatory but is not filled before submitting the form', () => {
        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible',)

    });

    //----------------------------Exercício 05----------------------------//
    it('Fill in and clear the fields: first name, last name, email, and phone', () => {
        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com')
        cy.get('#phone').type('71999799831')

        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()


        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible')

    });

    //----------------------------Exercício 06----------------------------//
    it('Show error message if required fields are left empty upon form submission', () => {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    });

    it('Form sent successfully with custom command', () => {
        cy.fillMandatoryFieldsAndSubmit()



    });


})