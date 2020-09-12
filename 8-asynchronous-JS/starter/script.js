// const first = () => {
//     console.log('Hey there');
//     second();
//     console.log('The end!');
// }

// const second = () => {
//     setTimeout(
//         () => console.log('Async Hey there!'),
//         2000);
// }

// //first();

// function getRecipe(){
//     setTimeout(
//         () => {
//             const recipeID = [1, 2, 3];
//             console.log(recipeID);

//             setTimeout(
//                 (id) => {
//                     const recipe = {
//                         title: 'Pasta',
//                         publisher: 'Kapil',
//                     };
//                     console.log(id, recipe);
//                 },
//                 1000, recipeID[2]
//             );
//         },
//         1500);
// }
// getRecipe();

// const getIDs = new Promise((resolve, reject) => {
//     setTimeout(() => resolve([123, 456, 789]), 1500);
// });


// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         setTimeout((id) => {
//             console.log(id);
//             const recipe = {title: 'Fresh Pasta', publisher: 'Kapil'};
//             resolve(`${recID} Recipe: ${recipe}`);
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout(pub => {
//             const recipe = {title: 'Pasta', publisher: 'Kapil'};
//             resolve(`${pub}: ${recipe}`);
//         }, 1500, publisher);
//     })
// };
// getIDs.then(ids => {
//     console.log(ids);
//     return getRecipe(ids[2]);}
// ).then((recipe) => {
//     console.log(recipe);
//     return getRelated(recipe.publisher);
// }).then((recipe) => {
//     console.log(recipe);
// }).catch(error => console.log(error, 'Failure!'));

// async function getRecipesAW(){
//     const ids = await getIDs;
//     console.log(ids);
//     const recipe = await getRecipe(ids[2]);
//     console.log(recipe);
//     const related = await getRelated('Kapil');
//     console.log(related);
//     return recipe;
// }
// const rec = getRecipesAW();
// rec.then((result) => console.log(result));
// console.log('Running');
async function getWeather(woeid){
    let weather;
    weather = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
    if (weather.status != 200) return;

    weather = await weather.json();

    const today = weather.consolidated_weather[0];
    console.log(`Temperatures in ${weather.title} stay between ${today.min_temp} and ${today.max_temp}.`)
}

getWeather(2487956);
getWeather(44418);
