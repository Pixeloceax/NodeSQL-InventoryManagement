import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { UUIDV4 } from "sequelize";

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  supplier: string;
  reorderThreshold: number;
  location: string;
  serialNumber?: string;
  image?: string;
  notes?: string;
  taxRate: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public description!: string;
  public category!: string;
  public quantity!: number;
  public supplier!: string;
  public reorderThreshold!: number;
  public location!: string;
  public serialNumber?: string;
  public image?: string;
  public notes?: string;
  public taxRate!: number;

  public calculateVAT(): number {
    return this.price * this.taxRate;
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reorderThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "../assets/images/default_product_img_150.png",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);

export default Product;
