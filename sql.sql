create database bamazon;

use bamazon;

create table products(
	ID integer(100) auto_increment not null,
    product_name varchar(100),
    department_name varchar(100),
    price integer(100),
    stock_quantity integer(100),
    primary key(id));
    
insert into products(product_name, department_name,price,stock_quantity) 
values("Calculator","Tech",100,30),
("Ice", "Outdoor",5,100),
("iPhone","Tech",400,50),
("TV","Tech",248,10),
("Fishing Pole","Outdoor",200,15),
("Hunting Knife","Outdoor",60,30),
("Xbox","Tech",249,20),
("MacBook","Tech",1250,15),
("Tents","Outdoor",180,8),
("Rain Boots","Outdoor",60,5);

-- drop table testtable;
-- 
-- update programming_languages
-- set languages = "sanscrit"
-- where ID = 1