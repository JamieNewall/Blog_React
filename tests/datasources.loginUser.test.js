const chai = require('chai')
const mocha = require('mocha')
const expect = chai.expect
const sinon = require('sinon')
const Mongo = require('../graphql/dataSources')
const resolvers = require('../graphql/resolvers')
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);



const mockStore = {
    user: {
        findOne: sinon.stub()
    },
        token: {
        create: sinon.stub()
        }
}

const ds = new Mongo(mockStore)


describe('login user', function () {
    it('user found', async function () {
        mockStore.user.findOne.returns({
            email: 'jnewall93@outlook.com',
            hashPass:'$2b$10$dDvsmCCxQiHNu7cbcoTaC.k21Ma0zmpWJEaHL9Mb7MZ8.CzQUGZ7a'
        })

        const res = await ds.loginUser('jnewall93@outlook.com', 'mypassword')

        expect(res).to.be.a.jwt
    })

    it('user cannot be found', async function () {
        mockStore.user.findOne.returns([])

        const res = await ds.loginUser('jnewall93@outlook.com', 'mypassword')

        expect(res).to.equal(null)
    })

})


