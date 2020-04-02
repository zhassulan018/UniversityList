const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./../../models/uniModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Succesful database connection'));

const universities = JSON.parse(
  fs.readFileSync(`${__dirname}/universities.json`),
  'utf-8'
);

const importData = async () => {
  try {
    await University.create(universities);
    console.log('Successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await University.deleteMany();
    console.log('Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
