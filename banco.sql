CREATE TABLE planos(
    id bigint not null primary key auto_increment,
    nome varchar(100)
);

CREATE TABLE clientes(
    id bigint not null primary key auto_increment,
    nome varchar(100),
    saldo decimal(20,6),
    fk_id_plano bigint not null,
    foreign key (fk_id_plano) references planos (id)
);

CREATE TABLE dids(
    id bigint not null primary key auto_increment,
    did varchar(50),
    fk_id_cliente bigint not null,
    foreign key (fk_id_cliente) references clientes (id)
);

CREATE TABLE areas(
    id bigint not null primary key auto_increment,
    nome varchar(100)
);

CREATE TABLE prefixos(
    id bigint not null primary key auto_increment,
    prefixo varchar(50),
    localidade varchar(100),
    fk_id_area bigint not null,
    foreign key (fk_id_area) references areas (id)
);

CREATE TABLE tarifas(
    id bigint not null primary key auto_increment,
    custo_conexao decimal(20,6),
    segundos_inclusos int,
    custo_minuto decimal(20,6),
    incremento_inicial int,
    incremento int,
    fk_id_area bigint not null,
    fk_id_plano bigint not null,
    foreign key (fk_id_area) references areas (id),
    foreign key (fk_id_plano) references planos (id)
);

CREATE TABLE cdrs(
    id bigint not null primary key auto_increment,
    origem varchar(50) not null,
    destino varchar(50) not null,
    duracao int not null,
    localidade varchar(100),
    area varchar(100),
    data_chamada datetime not null,
    valor decimal(20,6)
);

INSERT INTO planos (nome) VALUES ('Basix');
INSERT INTO planos (nome) VALUES ('Basix Nacional');
