const { EntitySchema } = require('typeorm');

const Expense = new EntitySchema({
    name: 'Expense',
    tableName: 'expenses',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        amount: {
            type: 'float'
        },
        category: {
            type: 'varchar'
        },
    },
    relations: {
        income: {
            type: 'many-to-one',
            target: 'Income',
            inverseSide: 'has'
        }
    }
});

module.exports = Expense;
