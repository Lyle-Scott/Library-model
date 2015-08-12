'use strict'

var Library = function(branch) {
  this.branch = branch;
  this.index = [];
};

var LibraryItem = function() {
  this.ID;
  this.index = [];
};

var checkIn = function (libraryItem) { 
  libraryItem.ID = (campBecca.index.length +1);
  campBecca.index.push(libraryItem);
  unsorted.index.push(libraryItem);
};

LibraryItem.prototype.AssignBook = function (title, author) {
  this.type = "book";
  this.title = title;
  this.author = author;
  this.location = unsorted;
  checkIn(this);
};

LibraryItem.prototype.AssignShelf = function (name) {
  this.type = "shelf";
  this.name = name;
  this.index = [];
  checkIn(this);
};

LibraryItem.prototype.Shelve = function () {

};

LibraryItem.prototype.UnShelve = function () {

};

// var render = function() {
//   $('#library').empty();
//   $('#select-shelf').empty();
//   $.each(campBecca.shelves, function(i, val) {
//     $('#select-shelf').append('<h3><input type=\"radio\" name="shelf" value=\"' + campBecca.shelf[i].subject + '\">' + campBecca.shelf[i].subject + '</h3>');
//   });
//   $.each(campBecca.shelf, function(i, val) {
//     $('#library').append('<li class=\"shelf\" id=\"campBecca' + i + '\"><h2>' + campBecca.shelf[i].subject + '</h2></li>');
//     $.each(campBecca.shelf[i].books, function(j, val) {
//       $('#campBecca' + i).append('<h3 class\"book\">\"' + campBecca.shelf[i].books[j].title + '\" - ' + campBecca.shelf[i].books[j].author + '</h3>')
//     })
//   })
// };

  var campBecca = new Library("Camp Becca");
  var unsorted = new LibraryItem();
  var shelf01 = new LibraryItem();
  var shelf02 = new LibraryItem();
  var shelf03 = new LibraryItem();
  var book01 = new LibraryItem();
  var book02 = new LibraryItem();
  var book03 = new LibraryItem();
  var book04 = new LibraryItem();
  var book05 = new LibraryItem();
  var book06 = new LibraryItem();

unsorted.AssignShelf("unsorted")
shelf01.AssignShelf("Philosophy");
shelf02.AssignShelf("Books about dogs");
shelf03.AssignShelf("Stuffed animals");
book01.AssignBook("Critique of Pure Reason", "Immanuel Kant");
book02.AssignBook("Phenomenology of Spirit", "Georg Hegel");
book03.AssignBook("Old Yeller", "Fred Gipson");
book04.AssignBook("Lassie Come-Home", "Eric Knight");
book05.AssignBook("Winnie-The-Pooh", "A. A. Milne");
book05.AssignBook("The Very Hungry Caterpillar", "Eric Carle");
// render();
console.log("done");