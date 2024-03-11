const { EntitySchema } = require("typeorm");

const ExpenseType = {
    GROCERIES: "groceries",
    ENTERTAINMENT: "entertainment",
    UTILITIES: "utilities",
    TRANSPORTATION: "transportation",
    MEDICAL: "medical",
    EDUCATION: "education",
    OTHER: "other"
  };

const Expense = new EntitySchema({
  name: "Expense",
  tableName: "expenses",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
    type: {
      type: "enum",
      enum: Object.values(ExpenseType)
    },
    expenseDate: {
      type: "date",
    },
  },
  relations: {
    spentBy: {
      type: "many-to-one",
      target: "User",
      inverseSide: "expenses",
    },
  },
});

module.exports = { Expense, ExpenseType };
