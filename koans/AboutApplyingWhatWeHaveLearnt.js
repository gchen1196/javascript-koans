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
  
  it("should find the largest prime factor of a composite number", function () {
    //find largest prime factor of a composite number
    //input: composite number:  4, 6, 8, 9, 10, 12, 14, 15, 16
    //output: largest prime factor: divisible by itself or one 
    //input: 10 and output: 5 because 5 is prime and divisble by input
    //iterate from input - 1 to 2 
    //if number is prime and divisible, then set largest prime = num
    //need helper function that determines if number is prime or not
    //isPrime function 
    //input: num and output: boolean
    //if input <= 1, then it is not prime 
    //iterate from 2 to input - 1
    //if input % num === 0, then it is not prime 
    //return true 
    function findLargestPrimeFactor(composite) {
      var largestPrimeFactor = 0;
      for (var i = composite - 1; i > 1; i--) {
        if (isPrime(i) && composite % i === 0) {
          largestPrimeFactor = i;
          break;
        }
      }
      return largestPrimeFactor; 
    }
    function isPrime(num) {
      if (num <= 1) {
        return false; 
      }
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false; 
        }
      }
      return true; 
    }
    expect(findLargestPrimeFactor(10)).toBe(5);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //find the largest palindrome from product of two 3 digit numbers
    //999 * 999, 999 * 998, 999 * 997...999 * 101
    //998 * 998, 998 * 997... 998 * 101 
    //997 * 997... 
    //if product is palindrome and greater than current max, then set max = product 
    //return max 
    //need helper function to check if Palindrome
    //isPalindrome if num = String(num).split('').reverse().join('')
    function largestPalindrome() {
      var largest = 0;
      for (var i = 999; i > 100; i--) {
        for (var j = i; j > 100; j--) {
          var product = i * j;
          if (isPalindrome(product) && product > largest) {
            largest = product; 
          }
        }
      }
      return largest; 
    }

    function isPalindrome(num) {
      return String(num) === String(num).split('').reverse().join(''); 
    }
    expect(largestPalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      //find smallest number that is divisble by 1, 2, 3, 4...20 
      //increase the num if none are divisible by 1 - 20
    function smallestDiv() {
      var num = 20;
      while (num % 1 !== 0 || num % 2 !== 0 || num % 3 !== 0 || num % 4 !== 0 || num % 5 !== 0 || num % 6 !== 0 || num % 7 !== 0 || num % 8 !== 0 || num % 9 !== 0 || num % 10 !== 0 || num % 11 !== 0 || num % 12 !== 0 || num % 13 !== 0 || num % 14 !== 0 || num % 15 !== 0 || num % 16 !== 0 || num % 17 !== 0 || num % 18 !== 0 || num % 19 !== 0 || num % 20 !== 0) {
        num += 20;
      }
      return num;
    } 
    expect(smallestDiv()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    //sum of the squares = a^2 + b^2 + c^2... 
    //square of the sums = (a + b + c...)^2
    //square of the sums - sum of the squares 
    //36 - 14 = 22
    function difference() {
      var sumSquares = 0;
      var sum = 0;
      var squareSum = 0;
      for (var i = 0; i < arguments.length; i++) {
        var num = arguments[i];
        sumSquares += num * num;
        sum += num;
      }
      squareSum = sum * sum; 
      return squareSum - sumSquares; 
    }
    expect(difference(1, 2, 3)).toBe(22);
    
  });

  it("should find the 10001st prime", function () {
    //increment num by 1 while count less than 10001
    //if is num is prime, then increase found by 1 and set prime to num
    function findPrime() {
      var found = 0;
      var num = 2;
      var prime = 0;
      while (found < 10001) {
        if (isPrime(num)) {
          found += 1;
          prime = num;
        }
        num += 1;
      }
      return prime; 
    }
    function isPrime(num) {
      if (num <= 1) {
        return false; 
      }
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false; 
        }
      }
      return true; 
    }
    expect(findPrime()).toBe(104743);
  });
  
});
