CREATE DATABASE vehicle_data;

CREATE TABLE vehicle2 (
    no_reg text primary key,
    name text NOT NULL,
    merk text NOT NULL,
    production_year numeric(4,0),
    capacity numeric
);

INSERT INTO vehicle2 (no_reg, name, merk, production_year, capacity) VALUES ('B-7763-TXY', 'Lionel Messi', 'Honda PCX', 2018, 150);

{
    "no_reg": "B-7763-TXY", 
    "name": "Lionel Messi",
    "merk": "Honda PCX", 
    "production_year": 2018, 
    "capacity": 150
}