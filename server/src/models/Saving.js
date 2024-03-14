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
        name: {
            type: "varchar",
            nullable: false,
        },
        targetAmount: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        },
        deadline: {
            type: 'date',
            nullable: false
        }
       
    },
    relations: {
        savedBy: {
            type: 'many-to-one',
            target: 'User',
            inverseSide: 'savings'
        }
    }
});

module.exports = Saving;
