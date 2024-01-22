const inquirer = require('inquirer');
const Department = require('./schemas/department');
const Employee = require('./schemas/employee');
const Role = require('./schemas/role');

// Connect to MySQL using Sequelize
require('./connection');

// Function to start the CMS
function startCMS() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'model',
        message: 'Select a model:',
        choices: ['Department', 'Employee', 'Role', 'Exit'],
      },
    ])
    .then((answer) => {
      if (answer.model === 'Exit') {
        exitCMS();
      } else {
        chooseAction(answer.model);
      }
    });
}

// Function to choose action for a specific model
function chooseAction(model) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: `Select an action for ${model}:`,
        choices: ['View', 'Add', 'Back'],
      },
    ])
    .then((answer) => {
      if (answer.action === 'Back') {
        startCMS();
      } else {
        performAction(model, answer.action.toLowerCase());
      }
    });
}

// Function to perform action based on model and action type
function performAction(model, action) {
  const Model = getModelInstance(model);

  switch (action) {
    case 'view':
      viewItems(Model);
      break;
    case 'add':
      addItem(Model);
      break;
    default:
      console.log('Invalid action');
      chooseAction(model);
  }
}

// Function to get Sequelize model instance based on the model name
function getModelInstance(model) {
  switch (model) {
    case 'Department':
      return Department;
    case 'Employee':
      return Employee;
    case 'Role':
      return Role;
    default:
      return null;
  }
}

// Function to view items of a specific model
function viewItems(Model) {
  Model.findAll()
    .then((results) => {
      console.log(`--- View ${Model.name} ---`);
      results.forEach((item) => {
        console.log(item.toJSON());
      });

      chooseAction(Model.name);
    })
    .catch((err) => {
      console.error(`Error retrieving ${Model.name}:`, err);
      chooseAction(Model.name);
    });
}

// Function to add an item to a specific model
function addItem(Model) {
    inquirer
      .prompt(
        Object.keys(Model.rawAttributes).map((attribute) => ({
          type: 'input',
          name: attribute,
          message: `Enter the ${attribute}:`,
        }))
      )
      .then((answers) => {
        Model.create(answers)
          .then(() => {
            console.log(`${Model.name} added successfully!\n`);
            chooseAction(Model.name);
          })
          .catch((err) => {
            console.error(`Error adding ${Model.name}:`, err);
            chooseAction(Model.name);
          });
      });
  }  

// Function to exit the CMS
function exitCMS() {
  console.log('Exiting CMS. Goodbye!');
  require('./database').sequelize.close(); // Close Sequelize connection
}

// Start the CMS
startCMS();
