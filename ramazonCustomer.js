//require packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var divider = "--------------";

//establishes connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "ramazon_DB"
});

function runMe() {
    display();
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the item you want?",
            name: "choice"
        },
        {
            type: "input",
            message: "How many do you want to buy?",
            name: "quantity"
        }
    ]).then(function (response) {
        var thing = connection.query("select * from products where item_id=?", [response.choice], function (err, res) {
            var stock = res[0].stock_quantity;
            if (stock >= response.quantity) {
                var buy = connection.query("update products set ? where ?", [{
                    stock_quantity: parseInt(stock - response.quantity)
                }, {
                    item_id: response.choice
                }
                ], function (err, resb) {
                    console.log("Congrats! You bought " + response.quantity + " of " + res[0].product_name + " for " + (response.quantity * res[0].price));
                });
            }
            else {
                console.log("We don't have enough in stock. Try again Bitch.");
                runMe();
            }
        });
    });
}


function display() {
    console.log("Shit you can buy:\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var j = 0; j < res.length; j++) {
            console.log("ID: " + res[j].item_id + "\nName: " + res[j].product_name + "\nDepartment: " + res[j].department_name + "\nPrice: " + res[j].price + "\nStock: " + res[j].stock_quantity);
            console.log(divider);
        }
    });
}

runMe();