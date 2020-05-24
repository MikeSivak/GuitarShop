use GuitarShop;

--(1) ROLES TABLE
create table roles
(
	id int identity(1,1) primary key,
	role_name nvarchar(20) not null
);

--(2) USERS TABLE
create table users
(
	id int identity(1,1) primary key,
	id_role int not null references roles(id),
	first_name nvarchar(50) not null,
	last_name nvarchar(50) not null,
	phone nvarchar(30) not null,
	email nvarchar(50) not null,
	password nvarchar(50) not null
);

insert into roles(role_name)
values('admin'),
('manager'),
('client');

insert into users(id_role, first_name, last_name, phone, email, password)
values(1, 'Mike', 'Sivak', '+375297314004', 'noizemcnorm@gmail.com', '1999'),
(2, 'Vasily', 'Pupkin', '+375334544823', 'vasya_pupchansky@gmail.com', '2222'),
(3, 'Helena', 'Eremina', '+375335562244', 'len_ina@gmail.com', '3333');


--COUTRIES TABLE
create table countries
(
	id int identity(1,1) primary key,
	title nvarchar(50) not null
);

insert into countries(title)
values
('USA'),
('Japan'),
('Czech'),
('Korea');
select * from countries;
--MANUFACTURERS TABLE
create table manufacturers
(
	id int identity(1,1) primary key,
	id_country int not null,
	title nvarchar(50) not null
);
select * from manufacturers;
insert into manufacturers(id_country,title)
values
(1, 'Martin'),
(1, 'Gibson'),
(1, 'Taylor'),
(4, 'Cort'),
(2, 'Yamaha'),
(1, 'Guild'),
(3, 'Strunal')

select manufacturers.title, countries.title 
from manufacturers
join countries
on manufacturers.id_country = countries.id;

alter table manufacturers add foreign key (id_country) references countries(id);

--GUITAR BODY TYPE TABLE
create table guitar_body_type
(
	id int identity(1,1) primary key,
	id_guitar_type int not null,
	title nvarchar(40) not null
);

select *from guitar_type;
insert into guitar_body_type(id_guitar_type, title)
values
(2, 'Standart'),
(1, 'Drednought'),
(1, 'Orchestra'),
(1, 'Grand Auditorium'),
(1, 'Jumbo'),
(1, 'Parlor'),
(1, 'Folk')

select guitar_body_type.title, guitar_type.title 
from guitar_body_type
join guitar_type
on guitar_body_type.id_guitar_type = guitar_type.id;

alter table guitar_body_type add foreign key (id_guitar_type) references guitar_type(id);

--GUITAR TYPES TABLE
create table guitar_type
(
	id int identity(1,1) primary key,
	title nvarchar(50) not null
);

insert into guitar_type(title)
values
('Western'),
('Classic')

--() GUITARS TABLE
create table guitars
(
	id int identity(1,1) primary key,
	model nvarchar(20) not null,
	price int not null,
	quantity int not null,
	id_manufacturer int not null,
	id_body_type int not null,
	--id_type int not null
);
drop table guitars;
update guitars set id_manufacturer = 1 where id = 5;
alter table guitars add foreign key (id_manufacturer) references manufacturers(id) on update cascade on delete cascade;
alter table guitars add foreign key (id_body_type) references guitar_body_type(id) on update cascade on delete cascade;
--alter table guitars add foreign key (id_type) references guitar_type(id);

insert into guitars(model, price, quantity, id_manufacturer, id_body_type)
values
('SC-13E', 1899, 10, 1, 4),
('GPC-16E MAHOGANY', 2049, 5, 1, 4),
('D-18E 2020', 3649, 2, 1, 2),
('AD 810', 150, 20, 4, 4)

select manufacturers.title, model, guitar_body_type.title as 'body type', guitar_type.title as 'guitar type', countries.title, price, quantity
from guitars
join manufacturers on manufacturers.id = guitars.id_manufacturer
join guitar_body_type on guitar_body_type.id = guitars.id_body_type
join guitar_type on guitar_body_type.id_guitar_type = guitar_type.id
join countries on manufacturers.id_country = countries.id;

select * from guitars;