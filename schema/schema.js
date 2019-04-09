const graphql = require("graphql");
const fs = require("fs");
const path = require("path");
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql;

const userType = new graphql.GraphQLObjectType({
  name: "user",
  fields: () => ({
    user: { type: GraphQLString },
    content: { type: GraphQLString },
    likedBy: { type: GraphQLList(GraphQLString) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: { user: { type: GraphQLString }, content: { type: GraphQLString } },
      resolve(parent, args) {
        let usersList = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../notes.json"))
        );
        if (args.content == undefined) {
          if (args.user == "all") {
            return usersList;
          } else {
            return usersList.filter(u => u["user"] == args.user);
          }
        } else {
          console.log(usersList.filter(
            note =>
              note["user"] == args["user"] && note["content"] == args["content"]
          ));
          
          return usersList.filter(
            note =>
              note["user"] == args["user"] && note["content"] == args["content"]
          );
        }
      }
    }
    
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNote: {
      type: userType,
      args: {
        user: { type: GraphQLString },
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        let usersList = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../notes.json"))
        );

        let newNote = {
          user: args.user,
          content: args.content,
          likedBy: [],
        };

        usersList.push(newNote);
        fs.writeFileSync(
          path.join(__dirname, "../notes.json"),
          JSON.stringify(usersList)
        );

        return newNote;
      }
    },
    addLike: {
      type: userType,
      args: {
        user: { type: GraphQLString },
        content: { type: GraphQLString },
        likedBy: { type: GraphQLString }
      },
      resolve(parent, args) {
        

        let usersList = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../notes.json"))
        );

        let heartIndex = usersList.findIndex(
          note => note["user"] == args.user && note["content"] == args.content
        );
        
        console.log("in resolve like");
        console.log(args.likedBy);
        console.log(args.content);

        if(usersList[heartIndex]["likedBy"].indexOf(args.likedBy) == -1)
        {
          console.log("liking");
          
          usersList[heartIndex]["likedBy"].push(args.likedBy);
          fs.writeFileSync(
            path.join(__dirname, "../notes.json"),
            JSON.stringify(usersList)
          );
        }
        else{
          console.log("multiple entries detected");
          
        }
        
        return newNote;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
