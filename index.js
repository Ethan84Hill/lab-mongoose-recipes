const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)

  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
   return Recipe.create({
    title: "E Recipe",
    level: "Easy Peasy",
    ingredients: ["eggs", "chicken"],
    cuisine: "american",
    dishType: "breakfast",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 40,
    creator: "Ethan", 
   })
  })

  .then((anotherRecipe) => {
    console.log(`Another Recipe was created: ${anotherRecipe}`)
    return Recipe.insertMany(data);
  })

  .then((anotherRecipeList) => {
    anotherRecipeList.forEach((r) => {
      console.log(r.title);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    console.log('The Rigatoni alla Genovese Recipe has been updated successfully!')
    return Recipe.deleteOne( { title: "Carrot Cake" } )
  })

  .then(() => {
    console.log('The Carrot Cake Recipe was successfully removed!')
    return mongoose.connection.close();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
