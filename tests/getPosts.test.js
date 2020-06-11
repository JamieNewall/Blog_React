const chai = require('chai')
const react = require('react')
const mocha = require('mocha')
const gql = require('graphql-tag')
const {apolloClient} = require('apollo-client')
const { useQuery } = require('@apollo/react-hooks');
const assert = chai.assert

const getPosts = () => {



    const query = gql`
        query {
            getAllPosts {
                postTitle
                postContent
                views
            }
        }
    `

    const {loading, error, data} = useQuery(query)
    if (!loading || !error) {
        return data

    }

    return ''
}



describe('getPosts', function() {

    it('getPosts function', function() {

        assert(Array.isArray(getPosts()))

    })

})