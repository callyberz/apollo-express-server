import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { graphql } from 'graphql';
import DataLoader from 'dataloader';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { makeExecutableSchema } from 'apollo-server';
import { allow, deny, shield } from 'graphql-shield';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import config from './config';
import schema from './data/schema';
import resolvers from './data/resolvers';
import models, { connectDb } from './data/models';
import loaders from './data/loaders';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
// app.use(passport.initialize());

//
// Register API middleware
// -----------------------------------------------------------------------------
// Set up Apollo server express
const masterschema = makeExecutableSchema({
  typeDefs: schema['typeDefs'],
  resolvers,
});

// graphql permission
const permissions = shield({
  Query: {
    '*': allow,
  },
  Mutation: {
    '*': allow,
  },
});

const server = new ApolloServer({
  introspection: true,
  schema: applyMiddleware(masterschema, permissions),
  formatError: (error) => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, res }) => {
    if (res) {
      return buildContext({
        req,
        res,
        models,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      });
    }

    if (req) {
      return buildContext({
        req,
        res,
        models,
        User,
        secret: config.secret,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      });
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
//
// Launch the server
// -----------------------------------------------------------------------------
const port = config.port;

connectDb()
  .catch((err) => console.error(err))
  .then(() => {
    // if (config.mode == 'production') {
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server 🚀 on http://localhost:${port}/graphql`);
    });
    // }
  });

const createTempUsers = async () => {
  console.log('createing 1...');
  const user1 = new models.User({
    username: 'testuser1',
    email: 'hello@robin.com',
    password: 'rwieruch',
    role: 'DIRECTOR',
  });

  const user2 = new models.User({
    username: 'testuser2',
    email: 'hello@david.com',
    password: 'ddavids',
    role: 'MANAGER',
  });

  const user3 = new models.User({
    username: 'testuser3',
    email: 'hello@peter.com',
    password: 'peter22',
    role: 'TEACHER',
  });

  const user4 = new models.User({
    username: 'testuser4',
    email: 'hello@amy.com',
    password: 'amy22222',
    role: 'CAMPUS',
  });

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
};

const createTempStudents = async () => {
  console.log('createing 2...');
  let baseStudent = {
    fullName: 'testuser1',
    email: 'hello@robin.com',
    school: 'rwieruch',
    phoneNumber: '8888888',
    parentName: 'PP Lee',
    parentEmail: 'aaa@gmail.com',
    parentPhoneNumber: '99999999',
    parentRelationship: 'FATHER',
    remark: 'Test',
  };

  const student1 = new models.Student(baseStudent);
  baseStudent.fullName = 'testuser2222';
  const student2 = new models.Student(baseStudent);
  baseStudent.fullName = 'testuser333';
  const student3 = new models.Student(baseStudent);
  baseStudent.fullName = 'testuser444';
  const student4 = new models.Student(baseStudent);
  baseStudent.fullName = 'testuser5555';
  const student5 = new models.Student(baseStudent);

  await student1.save();
  await student2.save();
  await student3.save();
  await student4.save();
  await student5.save();
};

export default app;
