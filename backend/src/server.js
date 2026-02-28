require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = parseInt(process.env.PORT, 10) || 3010;

async function start() {
  await testConnection();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 Movie Review API running on http://0.0.0.0:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
