const { execSync } = require('child_process');

console.log('== Fresh Meadow Dairy CMS Database Setup ==');

// 1. Try to create the database if not exists
try {
  console.log('> Checking / Creating database...');
  execSync('npx sequelize-cli db:create', { stdio: 'inherit' });
} catch (error) {
  console.log('> Database already exists or creation passed. Proceeding with migrations...');
}

// 2. Run migrations
try {
  console.log('> Running database migrations...');
  execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
  console.log('== Database migration completed successfully! ==');
} catch (error) {
  console.error('> Database migration failed:', error.message);
  process.exit(1);
}
