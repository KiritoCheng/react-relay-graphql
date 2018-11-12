import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import {
    nodeDefinitions,
    globalIdField,
    fromGlobalId,
    connectionDefinitions
} from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        var { type, id } = fromGlobalId(globalId);
        return data[type][id]
    },
    obj => {
        return GraphQLHello;
    }
)

const GraphQLHello = new GraphQLObjectType({
    name: 'Hello',
    fields: {
        id: globalIdField()
    },
    interfaces: [nodeInterface]
})

const { 
    connectionType: TodosConnection,
    edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
    name: 'Hello',
    nodeType: GraphQLHello,
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField
    })
})

export const schema = new GraphQLSchema({
    query: Query,
    mutation: null
})