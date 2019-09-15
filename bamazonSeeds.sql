DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  item_price decimal (10, 2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('notebook', 'stationary', "4.50", "25");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('pens', 'office supplies', "8.50", "40");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('toilet paper', 'paper goods', "4.50", "25");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('perfume', 'toiletries', "44.50", "20");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('foundation', 'cosmetics', "7.50", "10");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('table', 'furniture', "89.99", "5");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('stool', 'furniture', "54.99", "12");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('yoga mat', 'sporting goods', "24.00", "10");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('blocks', 'sporting goods', "9.50", "10");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('nail polish', 'cosmetics', "2.50", "5");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('chocolate', 'snacks', "2.50", "25");
INSERT INTO products (product_name, dept_name, item_price, stock_quantity) values ('banana', 'groceries', ".50", "25");
