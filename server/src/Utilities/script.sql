select * from users;
select * from incomes;
select * from expenses;
select * from savings;



INSERT INTO incomes (name, amount, "receivedDate", type, "earnedId") 
VALUES 
('Salary', 3000.00, '2024-03-09', 'regular', 1),
('Freelancing', 500.00, '2024-03-07', 'one-time', 1),
('Investment', 200.00, '2024-03-05', 'passive', 1),
('Bonus', 1000.00, '2024-03-02', 'one-time', 2),
('Interest', 50.00, '2024-03-10', 'passive', 2);



INSERT INTO expenses (name, amount, type, "expenseDate", "spentById") 
VALUES 
('Online Shopping', 50.00, 'groceries', '2024-03-11', 1),
('Restaurant', 30.00, 'entertainment', '2024-03-10', 1),
('Rent', 500.00, 'utilities', '2024-03-05', 2),
('Transportation', 20.00, 'transportation', '2024-03-02', 2);


INSERT INTO savings (name,"targetAmount", deadline, "savedById") 
VALUES 
('Vacation',1000.00, '2024-12-31', 1),
('Home', 2000.00, '2025-01-01', 2);

