const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar'
        },
        email: {
            type: 'varchar'
        },
        password: {
            type: 'varchar'
        },
        role:{
            type: 'varchar'
        }
    },

    relations: {
        earns: {
            type: 'one-to-many',
            target: 'Income',
            inverseSide: 'earned'
        }
    }

});

module.exports = User;
