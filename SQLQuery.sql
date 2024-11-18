select * from active_item
select top 1 * from bidHistorylist ORDER BY Prize DESC
insert into bidHistorylist values('SRH', 'Kanguva', null, 2.0)
update active_item set Records = '[]' where id=2
INSERT INTO active_item (name, Country, Records, base_p) OUTPUT INSERTED.* VALUES ('Kangva', 'NZ', '', 2)

select * from bidHistorylist

