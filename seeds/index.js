require('dotenv').config()
const mongoose =require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect(process.env.MONGO_ATLAS);
const Campground = require('../models/campground');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// function to select from array
const sample = (array) => array[Math.floor(Math.random() * array.length)];


// loop to randomly select ciites, states and locations
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62487cd35f947e6cd508c179',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet atque dolore reiciendis pariatur cum ut itaque inventore temporibus! Expedita veniam autem voluptatem nulla nostrum praesentium rem repellat, explicabo alias reiciendis!',
price,
geometry: {
  type: "Point",
  coordinates: [
    cities[random1000].longitude,
    cities[random1000].latitude,
]
},
images:  [
    {
      url: 'https://res.cloudinary.com/fjdsalk/image/upload/v1649450319/yelpcamp/nx3gnhwe4mhrtszyxjws.avif',
      filename: 'yelpcamp/nx3gnhwe4mhrtszyxjws',
    },
    {
      url: 'https://res.cloudinary.com/fjdsalk/image/upload/v1649450320/yelpcamp/dcvoeaggqpkpdw8pzjhx.avif',
      filename: 'yelpcamp/dcvoeaggqpkpdw8pzjhx',
    }
  ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})