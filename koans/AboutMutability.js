describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";
    
    expect(aPerson.firstname).toBe('Alan'); //value of firstname prop is changed from John to Alan 
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname  = lastname;
    }
    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";
    
    expect(aPerson.firstname).toBe('Alan');
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function() {
      return this.firstname + " " + this.lastname;
    };
    
    var aPerson = new Person ("John", "Smith"); // {'firstname' : 'John', 'lastname' : 'Smith'}
    expect(aPerson.getFullName()).toBe('John Smith');
    
    aPerson.getFullName = function() {
      return this.lastname + ", " + this.firstname;
    };
    //aPerson = {'firstname' : 'John', 'lastname' : 'Smith'}
    expect(aPerson.getFullName()).toBe('Smith, John');
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname; //defined a var inside an obj
      
      this.getFirstName = function() { return firstname; }; //key of firstName and value that return firstname
      this.getLastName  = function() { return lastname; };
      this.getFullName  = function() { return fullName; };
    }
    var aPerson = new Person ("John", "Smith"); //{getFirstName: John, getLastName: Smith, getFullName: John Smith}

    aPerson.firstname = "Penny";
    aPerson.lastname  = "Andrews";
    aPerson.fullName  = "Penny Andrews";
    
    expect(aPerson.getFirstName()).toBe('John');
    expect(aPerson.getLastName()).toBe('Smith');
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function() {
      return aPerson.lastname + ", " + aPerson.firstname;
    };
    
    expect(aPerson.getFullName()).toBe('Andrews, Penny'); //invoking aPerson.getFullName
    //doesnt take in parameter but can access aPerson.lastname because it is a global variable 
  });

});
