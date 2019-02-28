function Muppet(age, hobby) {
  this.age   = age; //age : 
  this.hobby = hobby; //hobby : 
  
  this.answerNanny = function(){ //answerNanny : Everything's cool
	return "Everything's cool!"; 
  }
}

function SwedishChef(age, hobby, mood) { //(2, 'cooking', 'chillin')
  Muppet.call(this, age, hobby); //(2, 'coding')
  this.mood = mood; // mood: chilling
  
  this.cook = function() { //cook : "Mmmm soup!"
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet();

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet      = new Muppet(2, "coding"); //{age : 2, hobby: coding, answerNanny: Everything's cool}
  	this.swedishChef = new SwedishChef(2, "cooking", "chillin"); //{{age : 2, hobby: cooking, answerNanny: Everything's cool}, mood: chilling, cook: 'Mmmm soup!'}
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual('Mmmm soup!');
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything\'s cool!");
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual('cooking');
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual('chillin');
  });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () { //add new method into Object constructor
  function F() {} 
  F.prototype = this; //add this into F function
  return new F(); //return F constructor with this as key 
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby); 
  this.trick = trick;
  
  this.doTrick = function() {
    return this.trick;
  }
}

// no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();
//Muppet.prototype.beget() = function () {
    //function 
//}
// note: if you're wondering how this line affects the below tests, the answer is that it doesn't.
// however, it does do something interesting -- it makes this work:
// var g = new Gonzo(...);
// g instanceOf Muppet // true

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
    this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual('eat a tire');
    //Gonzo(3, 'daredevil performer', 'eat a tire').doTrick()
    //
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything\'s cool!");
    //Gonzo(3, 'daredevil performer', 'eat a tire').answerNanny()
    //this answerNanny = 'Everything's cool'
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    //new Gonzo(3, "daredevil performer", "eat a tire").age 
    //3
    expect(this.gonzo.hobby).toEqual('daredevil performer');
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual('eat a tire');
  });
});
