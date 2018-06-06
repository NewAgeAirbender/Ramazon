drop database if exists ramazon_DB;

create database ramazon_DB;

use ramazon_DB;

create table products (
	item_id mediumint not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price mediumint not null,
    stock_quantity int not null,
    primary key (`item_id`)
);

insert into products (product_name, department_name, price, stock_quantity) values 
("Fever Ray by Fever Ray", "Music", 7, 12), 
("We Are Never Meeting In Real Life by Samantha Irby", "Books", 14, 10), 
("Neverwhere by Neil Gaiman", "Books", 9, 4), 
("No Kings by Doomtree", "Music", 10, 7), 
("Fledgling by Octavia Butler", "Books", 14, 9),
("Astrophysics for People in a Hurry by Neil deGrasse Tyson", "Books", 19, 4),
("Galore by The Cure", "Music", 5, 14),
("Unlimited by Bassnectar", "Music", 9, 3),
("Her Body and Other Parties by Carmen Maria Machado", "Books", 15, 9),
("Heart Murmurs by Jeremy Messersmith", "Music", 7, 6);

select * from products;