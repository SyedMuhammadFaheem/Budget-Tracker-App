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
            type: 'varchar',
            nullable: false
        },
        email: {
            type: 'varchar',
            nullable: false,
            unique: true
        },
        password: {
            type: 'varchar',
            nullable: false
        },
        role:{
            type: 'varchar',
            default: 'user'
        },
        balance: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0
        }
    },
    relations: {
        incomes: {
            type: 'one-to-many',
            target: 'Income',
            inverseSide: 'earned'
        },
        expenses: {
            type: 'one-to-many',
            target: 'Expense',
            inverseSide: 'spentBy'
        },
        savings: {
            type: 'one-to-many',
            target: 'Saving',
            inverseSide: 'savedBy'
        }
    },
    methods: {
        calculateBalance() {
            let totalIncome = this.incomes.reduce((total, income) => total + income.amount, 0);
            let totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0);
            let totalSavings = this.savings.reduce((total, saving) => total + saving.targetAmount, 0);
            return totalIncome - totalExpense - totalSavings;
        }
    }
});

module.exports = User;
