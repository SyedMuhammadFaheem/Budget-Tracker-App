const { EntitySchema } = require("typeorm");

const IncomeType = {
  REGULAR: "regular",
  ONE_TIME: "one-time",
  PASSIVE: "passive",
};

const Income = new EntitySchema({
  name: "Income",
  tableName: "incomes",
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
    receivedDate: {
      type: "date",
    },
    type: {
      type: "enum",
      enum: Object.values(IncomeType),
      default: IncomeType.REGULAR,
    },
  },
  relations: {
    earned: {
      type: "many-to-one",
      target: "User",
      inverseSide: "incomes",
    },
  },
});

module.exports = { Income, IncomeType };
