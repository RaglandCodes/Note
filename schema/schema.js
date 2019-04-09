const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;
let users = [
  {
    user: "ra",
    content: "and do this work"
  },
  {
    user: "as",
    content: "his work"
  },
  {
    user: "as",
    content: " &&& do this work"
  },
  {
    user: "ra",
    content: "OK and do dis work"
  },
  {
    user: "op",
    content: "Fine and do this w)rk"
  },
  {
    user: "ra",
    content: "IPI AND AND and do this work"
  }
];

const userType = new graphql.GraphQLObjectType({
  name: "user",
  fields: () => ({
    user: { type: GraphQLString },
    content: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: { user: { type: GraphQLString } },
      resolve(parent, args) {
          console.log(users.filter(u => u['user'] == args.user));
        console.log(args.user);
        
        return users.filter(u => u['user'] == args.user);
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});

// const graphql = require('graphql');
// const _ = require('lodash');

// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '1' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
// ];

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: ( ) => ({
//         id: { type: GraphQLString },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLString } },
//             resolve(parent, args){
//                 // code to get data from db / other source
//                 console.log(_.find(books, { id: args.id }));
                
//                 return _.find(books, { id: args.id });
//             }
//         }
//     }
// });

// module.exports = new GraphQLSchema({
//     query: RootQuery
// });
