
describe('Blogilista', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.request('POST', 'http://localhost:3003/api/users/', {
            username: 'mluukkai',
            password: 'salainen'
        });
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('Blogs');
        cy.contains('Login to Blogs');
        cy.contains('Username:');
        cy.contains('Password:');
    });

    describe('Login', function () {

        it('succeeds with correct credentials', function () {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();
            cy.contains('logged in.');
        });
    
        it('fails with wrong credentials', function () {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('asdasd');
            cy.get('#login-button').click();
            cy.contains('Invalid username or password!');
        });

    });

    describe('When logged in', function() {

        beforeEach(function() {
            // Cypress Command for login (see ../support/commands.js)
            cy.login({ username: 'mluukkai', password: 'salainen' });
            // Cypress Command for creating new blogs
            cy.createBlog({ title: "first blog", url: "http://1", likes: 1 });
            cy.createBlog({ title: "second blog", url: "http://2", likes: 2 });
            cy.createBlog({ title: "third blog", url: "http://3", likes: 3 });
        });
    
        it('a blog can be created', function() {
            cy.get('#create-new-blog').click();
            cy.get('#title').type('testiblogiX');
            cy.get('#author').type('testikirjottelijaX');
            cy.get('#url').type('http://x');
            cy.get('#create-new-button').click();

            cy.contains('testiblogiX');
        });

        it('a blog can be liked', function() {
            cy.contains('second blog').contains('show').click();
            cy.contains('like').click();
            cy.contains('LIKES: 3');
        });

        it('a blog can be deleted', function() {
            cy.contains('second blog').contains('show').click();
            cy.contains('Remove').click();
        });

        it('blogs are in correct order', function() {
            // Let's test that 'third blog' should be first one regarding the likes.
            cy.get('.blogpost').should(($el) => {
                expect($el.first()).to.contain('third blog');
            });
        });

    });
});
