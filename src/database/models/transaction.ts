import { Model, DataTypes } from 'sequelize';
import db from '.';

/**
 * User Model
 */
class Transaction extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public type!: string;
}

Transaction.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'transaction',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Transaction;
