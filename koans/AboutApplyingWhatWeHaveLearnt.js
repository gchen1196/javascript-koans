var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) { //get products[0]
        if (products[i].containsNuts === false) { //if false === false => true 
            hasMushrooms = false; //
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") { //products[0].ingredients[2] => 'mushrooms' === 'mushrooms', true
                  hasMushrooms = true; 
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]); //products[0] not pushed because hasMushrooms = true 
        }
    }
    //productsICanEat = [products[1]]
    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      //input: none
      //output: array
      //allergic to nuts: containsNuts = false 
      //hate mushrooms: no 'mushrooms' in ingredients array
      //use filter method 
      //products.filter(pizza that containsNuts = false && !ingredients.include('mushrooms')) => productsICanEat array
      function safePizza(pizza) {
        if (pizza['containsNuts'] === false && !(pizza['ingredients'].includes('mushrooms'))) {
          return true;
        }
        return false; 
      }
      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(safePizza);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    //3 + 5 + 15 + 30 + 45 +...
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */
    //use _.range[1, 1000] to get [1, 2, 3...1000]
    //use .reduce that receives a function with parameters acc, num
    //if num divisible by 3 or by 5, then acc += num 
    //return acc 
    //output: sum
    sum = _.range(0, 1000).reduce(function(acc, num) {
      if (num % 3 === 0 || num % 5 === 0) {
        acc += num;
      }
      return acc; 
    })

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0};
    //use chain method to chain each method 
    //use map to get the value (array) of ingredients in each obj 
    //return 2-D array [[a, b, c], [a, b, c]]
    //use flatten method to change from 2-D array to 1-D array [a, b, c, a, b, c]
    //use reduce method to return obj = ingredientCount
    //function(obj, ingredient)
    //if ingredient exists in obj, then obj[ingredient]++
    //else obj[ingredient] = 1

    _(products).chain()
              .map(function(obj) {return obj['ingredients']}) //[[a, b, c], [a, b, c]]
              .flatten() //[a, b, c, a, b, c]
              .reduce(function(result, ingredient) {
                if (ingredient in result) {
                  result[ingredient] += 1;
                };
                else {
                  result[ingredient] = 1; 
                }
                return result;
              }, {});//{a : 2, b : 2, c : 2}
                        



    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount["mushrooms"]).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  */
});
