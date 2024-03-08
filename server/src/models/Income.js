const { EntitySchema } = require('typeorm');

const Income = new EntitySchema({
    name: 'Income',
    tableName: 'income',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        amount: {
            type: 'float'
        },
        incomeTitle: {
            type: 'varchar'
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            inverseSide: 'earns'
        },
        has: {
            type: 'one-to-many',
            target: 'Expense',
            inverseSide: 'income'
        },
        has: {
            type: 'one-to-many',
            target: 'Saving',
            inverseSide: 'income'
        }

    }
    
});

module.exports = Income;
