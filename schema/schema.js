const graphql = require('graphql');
const fs = require("fs");
const path = require("path");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;


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
          
        let usersList = JSON.parse(fs.readFileSync(path.join(__dirname, "../notes.json")))
        
        if(args.user == "all")
        {
            return usersList;
        }
        return usersList.filter(u => u['user'] == args.user);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});