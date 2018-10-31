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
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View products", "View low inventory", "Add to inventory", "Add new product"],
            name: "command"
        }
    ]).then(function (response) {
        switch (response.command) {
            case 'View products':
                display();
                break;
            case 'View low inventory':
                viewLow();
                break;
            case 'Add to inventory':
                addMore();
                break;
            case 'Add new product':
                addNew();
                break;
            default:
                display();
        }
    });
}


function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var j = 0; j < res.length; j++) {
            console.log("ID: " + res[j].item_id + " | Name: " + res[j].product_name + " | Department: " + res[j].department_name + " | Price: " + res[j].price + " | Stock: " + res[j].stock_quantity);
            console.log(divider);
        }
    });
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var j = 0; j < res.length; j++) {
            console.log("ID: " + res[j].item_id + " | Name: " + res[j].product_name + " | Department: " + res[j].department_name + " | Price: " + res[j].price + " | Stock: " + res[j].stock_quantity);
            console.log(divider);
        }
    });
}

function addMore() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the item you want to add?",
            name: "id"
        },
        {
            type: "input",
            message: "How many do you want to add?",
            name: "stock"
        }
    ]).then(function (response) {
        //add to the database
        console.log(response.stock);
        var damn = connection.query("select * from products where item_id=?", [response.id], function(err, res){
            var newTotal = res[0].stock_quantity + parseInt(response.stock);
            console.log(newTotal);
            var query = connection.query(
                "update products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newTotal
                    },
                    {
                        item_id: response.id
                    }
                ],
                function (err, res) {
                    // console.log(res);
                });
        });
    
    });
}

function addNew() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the item?",
            name: "item"
        },
        {
            type: "input",
            message: "Which department should it be a part of?",
            name: "department"
        },
        {
            type: "input",
            message: "How much do you want to charge?",
            name: "price"
        },
        {
            type: "input",
            message: "How many are you adding?",
            name: "stock"
        }
    ]).then(function (response) {
        //add to the database
        createProduct(response.item, response.department, response.price, response.stock);
    })
}

function createProduct(name, department, price, stock) {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: stock
        },
        function (err, res) {
            console.log(res.affectedRows + "  included!\n");
        }
    );
}

runMe();