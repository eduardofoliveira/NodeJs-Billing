/* Tabela de clientes deve ser a tabela do ASTPP */
CREATE TABLE clientes(
    id bigint not null primary key auto_increment,
    nome varchar(100),
    saldo decimal(20,6)
);

CREATE TABLE dids(
    id bigint not null primary key auto_increment,
    did varchar(50),
    fk_id_cliente bigint not null,
    foreign key (fk_id_cliente) references clientes (id)
);

CREATE TABLE areas(
    id bigint not null primary key auto_increment,
    nome varchar(50)
);

CREATE TABLE prefixos(
    id bigint not null primary key auto_increment,
    prefixo varchar(50),
    fk_id_area bigint not null,
    foreign key (fk_id_area) references areas (id)
);

CREATE TABLE tarifas(
    id bigint not null primary key auto_increment,
    custo_conexao decimal(20,6),
    segundos_incluidos int,
    custo_minuto decimal(20,6),
    incremento_inicial int,
    increment int,
    fk_id_area bigint not null,
    fk_id_cliente bigint not null,
    foreign key (fk_id_area) references areas (id),
    foreign key (fk_id_cliente) references clientes (id)
);

/* Tabela de cdr deve ser a tabela do ASTPP */
CREATE TABLE cdrs(
    id bigint not null primary key auto_increment,
    data_chamada datetime not null,
    origem varchar(50) not null,
    destino varchar(50) not null,
    duracao int not null,
    descricao_destino varchar(50),
    taxa decimal(20,6),
    valor decimal(20,6)
);

INSERT INTO clientes (nome, saldo) VALUES ('Eduardo', 0.00);
INSERT INTO clientes (nome, saldo) VALUES ('Brastel', 0.00);

INSERT INTO dids (did, fk_id_cliente) VALUES ('551135880115', 1);
INSERT INTO dids (did, fk_id_cliente) VALUES ('5511358800866', 2);

INSERT INTO areas (nome) VALUES ('São Paulo Fixo');
INSERT INTO areas (nome) VALUES ('São Paulo Móvel');

INSERT INTO prefixos (prefixo, fk_id_area) VALUES ('5511', 1);
INSERT INTO prefixos (prefixo, fk_id_area) VALUES ('55119', 2);

INSERT INTO tarifas (custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, fk_id_area,
fk_id_cliente) VALUES (0, 4, 0.04, 30, 6, 1, 1);

INSERT INTO tarifas (custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, fk_id_area,
fk_id_cliente) VALUES (0, 4, 0.04, 30, 6, 1, 2);

INSERT INTO tarifas (custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, fk_id_area,
fk_id_cliente) VALUES (0, 4, 0.69, 30, 6, 2, 1);

INSERT INTO tarifas (custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, fk_id_area,
fk_id_cliente) VALUES (0, 4, 0.69, 30, 6, 2, 2);

/* Select Call Log Asterisk */
select src as origem, dst as destino, billsec as duracao, disposition, calldate as data_chamada from cdr;

/* Select Call Log Astpp */
select id, accountid, type, callerid, callednum, billseconds, debit, rate_cost,
call_direction, calltype,  answer_stamp, end_stamp from cdrs where billseconds >= 5
and callednum like '0800%' and accountid = ?;

update cdrs set debit = ?, rate_cost = ? where id = ?;

update accounts set balance = balance - debit where id = ?;
