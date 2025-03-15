const { delay } = require("bluebird");
const { option } = require("commander");

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário.", () => {
    const longText = Cypress._.repeat("teste", 50);
    cy.get("#firstName").type("Lucas");
    cy.get("#lastName").type("Garcia");
    cy.get("#email").type("lucasgarcia@email.com.br");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains('button',"Enviar").click();

    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Lucas");
    cy.get("#lastName").type("Garcia");
    cy.get("#email").type("lucasgarcia");
    cy.contains('button',"Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("campo telefone não preenche com caracteres que não sejam números", () => {
    cy.get("#phone").type("abc").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Lucas");
    cy.get("#lastName").type("Garcia");
    cy.get("#email").type("lucasgarcia@email.com.br");
    cy.get("#open-text-area").type("teste");
    cy.get("#phone-checkbox").click();
    cy.contains('button',"Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Lucas")
      .should("have.value", "Lucas")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Garcia")
      .should("have.value", "Garcia")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("lucasgarcia@email.com.br")
      .should("have.value", "lucasgarcia@email.com.br")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("123456")
      .should("have.value", "123456")
      .clear()
      .should("have.value", "");

    cy.get("#open-text-area")
      .type("teste")
      .should("have.value", "teste")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains('button',"Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
   
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should("be.visible");
  });
});
