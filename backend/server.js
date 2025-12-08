import express from 'express';
import cors from 'cors';
import { validate as uuidValidate } from 'uuid';
import { program } from 'commander';

import { fakeAuthAs, requireAuth } from './middelware/auth.js';
import usersRouter from './modules/user/router.js';
import connectionsRouter from './modules/connections/router.js';
import notesRouter from './modules/notes/router.js';
import requestsRouter from './modules/requests/router.js';
import lookingForTagsRouter from './modules/looking_for/router.js';
import genreRouter from './modules/genres/router.js';
import chatRouter from './modules/chat/router.js';
import storiesRouter from './modules/stories/router.js';
program.option('--authorize-as <string>', 'Override the authentication middleware.');
program.parse();

runApp(program.opts());

function runApp(opts) {
  const app = express();
  const PORT = process.env.PORT || 3300;

  // Before production this needs to be changed to a valid url, or something more secure.
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3300'], // Adjust this to your frontend's origin
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());

  if (opts.authorizeAs) {
    if (uuidValidate(opts.authorizeAs)) {
      console.log(
        `WARNING: Fake authorization is enabled. All requests will be authorized as user ID: ${opts.authorizeAs}`
      );
      app.use(fakeAuthAs(opts.authorizeAs));
    } else {
      console.error(`Not a valid UUID: ${opts.authorizeAs}. Exiting..`);
      return;
    }
  }

  // Mount users router
  app.use('/users', usersRouter);
  app.use('/connections', connectionsRouter);
  app.use('/notes', notesRouter);
  app.use('/requests', requestsRouter);

  app.get('/', (req, res) => {
    res.send('Server is running TRIVIUM');
  });
  app.use('/genres', genreRouter);
  app.use('/looking_for_tags', lookingForTagsRouter);
  app.use('/chat', requireAuth, chatRouter);
  app.use('/stories', storiesRouter);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
