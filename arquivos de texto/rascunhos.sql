/* Select Call Log Asterisk */
select src as origem, dst as destino, billsec as duracao, disposition, calldate as data_chamada from cdr;

/* Select Call Log Astpp */
select id, accountid, type, callerid, callednum, billseconds, debit, rate_cost,
call_direction, calltype,  answer_stamp, end_stamp from cdrs where billseconds >= 5
and callednum like '0800%' and accountid = ?;

update cdrs set debit = ?, rate_cost = ? where id = ?;

update accounts set balance = balance - debit where id = ?;

/* Query to insert Origination Rate*/
INSERT INTO routes (
    pattern, comment, connectcost, includedseconds, cost, pricelist_id, inc, init_inc, creation_date)
    VALUES (
    '^55119.*', 'São Paulo Móvel', 0, 4, 0.69, 5, 6, 30, now()
);

INSERT INTO routes (pattern, comment, connectcost, includedseconds, cost, pricelist_id, inc, init_inc, creation_date) VALUES ('^55119.*', 'São Paulo Móvel', 0, 4, 0.69, 5, 6, 30, now());
