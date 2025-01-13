const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize('tenten', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

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

// Define Relationships
Booking.belongsTo(Tent, { foreignKey: 'tent_id' });
Tent.hasMany(Booking, { foreignKey: 'tent_id' });

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset database

    // Add dummy tents
    const tent1 = await Tent.create({
      name: 'Luxury Tent',
      capacity: 5,
      price_per_day: 150.0
    });

    const tent2 = await Tent.create({
      name: 'Family Tent',
      capacity: 8,
      price_per_day: 200.0
    });

    const tent3 = await Tent.create({
      name: 'Solo Tent',
      capacity: 1,
      price_per_day: 50.0
    });

    // Add dummy bookings
    await Booking.create({
      customer_name: 'John Doe',
      start_date: '2025-01-15',
      end_date: '2025-01-20',
      tent_id: tent1.id
    });

    await Booking.create({
      customer_name: 'Jane Smith',
      start_date: '2025-01-17',
      end_date: '2025-01-22',
      tent_id: tent2.id
    });

    console.log('Dummy data added successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
