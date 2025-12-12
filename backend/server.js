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
import searchRouter from './modules/search/router.js';
import storiesRouter from './modules/stories/router.js';
import morgan from 'morgan';
import { consoleLogger, logger } from './logger.js';

// Redirect console logs to winston logger.
console.log = (...args) => {
  consoleLogger('info', ...args);
};
console.info = (...args) => {
  consoleLogger('info', ...args);
};
console.error = (...args) => {
  consoleLogger('error', ...args);
};
console.warn = (...args) => {
  consoleLogger('warn', ...args);
};

program.option('--authorize-as <string>', 'Override the authentication middleware.');
program.parse();

runApp(program.opts());

function runApp(opts) {
  const app = express();
  const PORT = process.env.PORT || 3300;

  const stream = {
    write: (message) => logger.info(message.trim()),
  };

  // Set up HTTP request logging
  app.use(morgan('tiny', { stream }));

  // Before production this needs to be changed to a valid url, or something more secure.
  app.use(
    cors({
      origin: getCORSAllowedOrigins(),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());

  if (opts.authorizeAs) {
    if (uuidValidate(opts.authorizeAs)) {
      console.warn(
        `Fake authorization is enabled. All requests will be authorized as user ID: ${opts.authorizeAs}`
      );
      app.use(fakeAuthAs(opts.authorizeAs));
    } else {
      console.error(`Not a valid UUID: ${opts.authorizeAs}. Exiting..`);
      return;
    }
  }

  app.get('/', (req, res) => {
    res.send('Server is running TRIVIUM');
  });

  app.use('/users', usersRouter);
  app.use('/connections', connectionsRouter);
  app.use('/notes', notesRouter);
  app.use('/requests', requestsRouter);
  app.use('/genres', genreRouter);
  app.use('/looking_for_tags', lookingForTagsRouter);
  app.use('/chat', chatRouter);
  app.use('/search', searchRouter);
  app.use('/stories', storiesRouter);

  // Set up custom error handler. must be registered *after* all other middleware and routing.
  app.use((err, _req, res, _next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function getCORSAllowedOrigins() {
  const corsAllowedOriginsString = process.env.CORS_ALLOWED_ORIGINS;
  if (!corsAllowedOriginsString) {
    throw new Error('Missing environment variable: CORS_ALLOWED_ORIGINS');
  }

  if (corsAllowedOriginsString === 'all') {
    console.warn('CORS checks are disabled.');
    return true; // Setting 'origin' to true will explicitly allow all origins
  } else {
    const allowedOrigins = corsAllowedOriginsString.split(';');
    console.info(`CORS enabled with allowed origins: ${allowedOrigins}.`);
    return allowedOrigins;
  }
}
