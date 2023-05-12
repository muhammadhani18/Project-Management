const {project, clients} = require('../sampleData');

const {GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql')


//Client type
const ClientType = GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType", 
    fields: {
        client: {
            type: ClientType,
        }
    }
})