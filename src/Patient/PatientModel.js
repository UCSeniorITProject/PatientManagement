const SequelizeInstance = require("../dbConnection");
const Sequelize = require("sequelize");
const activeEnum = require("../constants/activeEnum");
const encrypt = require("../constants/encrypt");

const Patient = SequelizeInstance.define(
  "Patient",
  {
    patientId: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientUserId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    socialSecurityNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      values: ["M", "F"],
    },
    address: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    insuranceName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    insurancePlanNo: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    insuranceCoPayAmount: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.DataTypes.STRING,
      values: activeEnum,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (patient) => {
        if (patient.changed("socialSecurityNumber")) {
          patient.socialSecurityNumber = encrypt(patient.socialSecurityNumber);
        }
      },
    },
  }
);

module.exports = Patient;
