// Pages Worker entry point.
// Handles /api/submit and falls back to static ASSETS for all other routes.
// This file is bundled by `npm run build:functions` into dist/_worker.js.
import submitHandler from './api/submit';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/submit')) {
      return submitHandler.fetch(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
