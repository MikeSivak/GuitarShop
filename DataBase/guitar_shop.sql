use GuitarShop;

create table roles
(
	id int identity(1,1) primary key,
	role_name nvarchar(20) not null
);

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
