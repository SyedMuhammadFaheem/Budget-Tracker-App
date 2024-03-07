const { EntitySchema } = require('typeorm');

const Saving = new EntitySchema({
    name: 'Saving',
    tableName: 'savings',
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

module.exports = Saving;
