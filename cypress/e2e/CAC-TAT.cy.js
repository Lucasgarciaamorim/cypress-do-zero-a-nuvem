describe('Central de Atendimento ao Cliente TAT', () => {


    beforeEach(function () {
        cy.visit("./src/index.html")
    })


    it('Verificar o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    });

    it('Preencher os campos obrigatórios e envia o formulário ', () => {

        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com')
        cy.get('#phone').type('71999799831')
        cy.get('#open-text-area').type('Testando o Cypress', {delay: 20})

        cy.get('.button').click()
        cy.get('.success').should('be.visible',)

    })
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com2')
        cy.get('#phone').type('71999799831')
        cy.get('#open-text-area').type('Testando o Cypress', {delay: 20})

        cy.get('.button').click()
        cy.get('.error').should('be.visible',)

    });
    it('Se um valor numérico não for digitado no campo de telephone, ele continuará vazio', () => {
        cy.get('#phone').type("ascvagf")
        cy.get('#phone').should('have.value', '')
    });
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type("Lucas ")
        cy.get('#lastName').type("Garcia Amorim")
        cy.get('#email').type('Lucasgarciamorim@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()
        cy.get('.error').should('be.visible',)

    });
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    });
})