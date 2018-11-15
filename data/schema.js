import {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import {
    nodeDefinitions,
    fromGlobalId,
    connectionDefinitions
} from 'graphql-relay';
import { Hello } from './database'

const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        var { type, id } = fromGlobalId(globalId);
        return null;
    },
    obj => {
        return AddressType;
    }
)

const AddressType = new GraphQLObjectType({
    name: 'Address',
    description: '这是一个住址',
    fields: {
        street: {
            type: GraphQLString,
            resolve: () => '深圳市'
        },
        number: {
            type: GraphQLInt,
            resolve: () => 555000
        },
        formatted: {
            type: GraphQLString,
            resolve(obj) {
                return obj.number + ' ' + obj.street
            }
        }
    },
    interfaces: [nodeInterface]
})

const { connectionType: AddressConnection } = connectionDefinitions({
    nodeType: AddressType,
});
// const PersonType = new GraphQLObjectType({
//     name: 'Person',
//     fields: {
//         name: { type: GraphQLString },
//         bestFriend: { type: PersonType }
//     }
// })



const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        adress: {
            type: AddressType,
            resolve: () => {
                return 'Hello world!';
            }
        },
        hello: {
            description: '描述',
            type: GraphQLString,
            resolve: () => {
                return 'Hello world!';
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: Query,
    mutation: null
})