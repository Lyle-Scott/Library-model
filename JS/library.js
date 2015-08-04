'use strict'

var Library = function(branch) {
this.branch = branch;
this.shelf = [];
};

var Shelf = function(subject) {
this.subject = subject;
this.book = [];
};

var Book = function(title, author) {
  this.title = title;
  this.author = author;
};

Library.prototype.addShelf = function (newShelf) {
  this.shelf.push(newShelf);
  render();
};

Library.prototype.removeShelf = function (oldShelf) {
  for (var i = 0; i < this.shelf.length; i++) {
    if (oldShelf == this.shelf[i]) {
      this.shelf.splice(i,1);
      render();
      break;
    }
  }
};

Shelf.prototype.addBook = function (newBook) {
  this.book.push(newBook)
      render();
};

Shelf.prototype.removeBook = function (oldBook) {
  for (var i = 0; i < this.book.length; i++) {
    if (oldShelf == this.book[i]) {
      this.book.splice(i,1);
      render();
      break;
    }
  }
};

var campBecca = new Library("Camp Becca");
var philosophy = new Shelf("Philosophy");
var dogStories = new Shelf("Books about dogs");
var kant1 = new Book("Critique of Pure Reason", "Immanuel Kant");
var hegel1 = new Book("Phenomenology of Spirit", "Georg Hegel");
var yeller = new Book("Old Yeller", "Fred Gipson");
var lassie = new Book("Lassie Come-Home", "Eric Knight");

var render = function() {
  $('#library').children().remove();
  $.each(campBecca.shelf, function(i, val) {
    $('#library').append('<li class=\"shelf\" id=\"campBecca' + i + '\"><h2>' + campBecca.shelf[i].subject + '</h2></li>');
    $.each(campBecca.shelf[i].book, function(j, val) {
      $('#campBecca' + i).append('<h3 class\"book\">\"' + campBecca.shelf[i].book[j].title + '\" by ' + campBecca.shelf[i].book[j].author + '</h3>')
    })
  })
};
  
campBecca.addShelf(philosophy);
campBecca.addShelf(dogStories);
philosophy.addBook(kant1);
philosophy.addBook(hegel1);
dogStories.addBook(yeller);
dogStories.addBook(lassie);

render();
console.log("done");