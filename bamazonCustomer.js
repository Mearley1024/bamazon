var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Empress1024!",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "purchaseOrExit",
      type: "list",
      message: "What product would you like to purchase today?",
      choices: ["purchase", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.purchaseOrExit === "Purchase") {
        purchaseProduct();
      }
       else{
        connection.end();
      }
    });
}

function purchaseProduct() {
  
  inquirer
    .prompt([
      {
        name: "product_name",
        type: "input",
        message: "What is the product you would would like to purchase?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many units would you like to purchase?"
      },
      {
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO bamazon_DB SET ?",
        {
          product_name: product_name.item,
          dept_name: answer.dept_name,
          stock_quantity: answer.stock_quantity|| 0,
    
        },
        function(err) {
          if (err) throw err;
          console.log("Your purchase was created successfully!");
          
          start();
        }
      );
    });
}

function productQuantity() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
      

          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {stock_quantity: answer.stock_quantity
              },
              {
                item_id: item_name
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("purchase placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Insufficient Quantity. Try again...");
          start();
        }
      });
  });
}
