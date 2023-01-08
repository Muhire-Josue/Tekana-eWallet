import { Model, DataTypes } from 'sequelize';
import db from '.';

/**
 * User Model
 */
class Wallet extends Model {
  public id!: number;
  public user_id!: number;
  public balance!: number;
}

Wallet.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'wallet',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Wallet;
