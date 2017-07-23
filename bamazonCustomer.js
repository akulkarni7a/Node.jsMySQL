var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Cricket47",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");


    // display items 

    function displayAll() {
        console.log("Here are all of our products for sale: \n");
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            console.log(res);
            startInquire();
        });
    }

    displayAll();



    // Step 2: Prompt the user questions

    function startInquire() {
        inquirer
            .prompt([
                // list
                {
        type:"input",
        name:"userIDChoice",
        message:"What is the ID number of the product you want?"
    },
    {
        type:"input",
        name:"userUnitsChoice",
        message:"How many do you want?"
    }

            ])

            .then(function(inquirerResponse) {
                console.log("You chose: " + inquirerResponse.userUnitsChoice + " units of product ID " + inquirerResponse.userIDChoice);


                // select quantity of items

                function checkQuant() {
                    var query = "SELECT stock_quantity FROM products WHERE ?";
                    connection.query(query, { team_id: inquirerResponse.userIDChoice }, function(err, res) {
                        for (var i = 0; i < res.length; i++) {
                            var currentStock = res[i].stock_quantity;
                            console.log(currentStock);
                            if (res[i].stock_quantity < inquirerResponse.userUnitsChoice) {
                                console.log("Insufficient quantity!");
                            } else {
                                updateQuant();

                            }
                        }

                    })
                };

                checkQuant();

                function updateQuant() {
                    var query = "SELECT stock_quantity FROM products WHERE ?";
                    connection.query(query, { team_id: inquirerResponse.userIDChoice }, function(err, res) {
                        for (var i = 0; i < res.length; i++) {

                            var currentStock = parseInt(res[i].stock_quantity);
                            console.log("Current Quantity: " + currentStock);

                            var userQuant = parseInt(inquirerResponse.userUnitsChoice);
                            console.log("User Quantity: " + userQuant);

                            var newStock = currentStock - userQuant;
                            console.log("New Stock: " + newStock);




                            console.log("Updating Product Quantities... \n");
                            connection.query(
                                "UPDATE products SET ? WHERE ?", [{
                                        stock_quantity: newStock
                                    },
                                    {
                                        team_id: inquirerResponse.userIDChoice
                                    }
                                ],
                                function(err, res) {
                                    console.log("Quantity Updated to " + newStock);
                                });

                        }

                    })



                };

                updateQuant();

                function checkPrice() {
                    var query = 'SELECT price FROM products WHERE ?';
                    connection.query(query, { team_id: inquirerResponse.userIDChoice }, function(err, res) {
                        for (var i = 0; i < res.length; i++) {

                            var price = parseFloat(res[i].price);
                            console.log('Cost Per Item: $ ' + price);

                            var userQuant = parseFloat(inquirerResponse.userUnitsChoice);
                            console.log('User Quantity: ' + userQuant);

                            var userPrice = price * userQuant;
                            console.log('Your total cost is: $' + userPrice);

                        }

                    })



                };
                checkPrice();
            });

    };
});