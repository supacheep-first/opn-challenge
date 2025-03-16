CREATE TABLE Customers (
    ID SERIAL PRIMARY KEY,
    FullName VARCHAR(255),
    Age INT,
    Gender VARCHAR(20)
);

CREATE TABLE Addresses (
    ID SERIAL PRIMARY KEY,
    CustomerID INT,
    AddressLine1 VARCHAR(255),
    AddressLine2 VARCHAR(255),
    City VARCHAR(255),
    Province VARCHAR(255),
    PostalCode VARCHAR(20),
    Country VARCHAR(255),
    AddressType VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customers(ID)
);

CREATE TABLE ProductCategories (
    ID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255)
);

CREATE TABLE Products (
    ID SERIAL PRIMARY KEY,
    ProductName VARCHAR(255),
    Description TEXT,
    CategoryID INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (CategoryID) REFERENCES ProductCategories(ID)
);

CREATE TABLE ProductOptions (
    ID SERIAL PRIMARY KEY,
    OptionName VARCHAR(255)
);

CREATE TABLE ProductVariants (
    ID SERIAL PRIMARY KEY,
    ProductID INT,
    OptionID INT,
    Value VARCHAR(255),
    Quantity INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ID),
    FOREIGN KEY (OptionID) REFERENCES ProductOptions(ID)
);

CREATE TABLE Carts (
    ID SERIAL PRIMARY KEY,
    CustomerID INT,
    ModifyDate TIMESTAMP,
    Status VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Customers(ID)
);

CREATE TABLE CartItems (
    ID SERIAL PRIMARY KEY,
    CartID INT,
    ProductID INT,
    ProductVariantID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (CartID) REFERENCES Carts(ID),
    FOREIGN KEY (ProductID) REFERENCES Products(ID),
    FOREIGN KEY (ProductVariantID) REFERENCES ProductVariants(ID)
);