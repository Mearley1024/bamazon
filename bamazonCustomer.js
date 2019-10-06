var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Empress1024!",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res){
  if (err) throw err;
  console.table(res);
  
  inquirer.prompt([
    {
      type: "input",
      message: "What is the item id for the product you would like to purchase?",
      name: "productId"
    },
    
    {
      type: "input",
      message: "How Many?",
      name: "productQuantity"
    }
  ])
  .then(function(inquirerResponse) {
    console.log(inquirerResponse);
    
    var product; 
    for (var i=0; i<res.length; i++){
      if (res[i].item_id === parseInt(inquirerResponse.productId)){
        product=res[i];
      }
    }
    console.log(product);
    
    if (product.stock_quantity >= parseInt(inquirerResponse.productQuantity)){
      console.log("Order complete, your total is: $", parseInt(inquirerResponse.productQuantity) * product.price);
      
      connection.query("UPDATE products SET stock_quantity = " + (product.stock_quantity - parseInt(inquirerResponse.productQuantity)) + " WHERE item_id = " + parseInt(inquirerResponse.productId), function(err, res){
        if (err) throw err;
        console.log(res);
      
      console.table(res);
      });
    } else {
      console.log("Not enough stock!");
    }
    connection.end();
  });
});