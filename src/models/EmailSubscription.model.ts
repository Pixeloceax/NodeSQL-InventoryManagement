import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../database/db";

export interface EmailSubscriptionAttributes {
  id: number;
  email: string;
  product_id: number;
  isActivated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EmailSubscription
  extends Model<EmailSubscriptionAttributes>
  implements EmailSubscriptionAttributes
{
  public id!: number;
  public email!: string;
  public product_id!: number;
  public isActivated!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EmailSubscription.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "email_subscriptions",
    sequelize,
  }
);

export default EmailSubscription;
