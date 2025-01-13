// Define Models
const Tent = sequelize.define('Tent', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_day: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  
  const Booking = sequelize.define('Booking', {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });