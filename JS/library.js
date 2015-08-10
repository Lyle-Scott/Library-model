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

Book.prototype.shelve = function(place) {
  place.book.push(this);
  render();
};

Book.prototype.unshelve = function(place) {
  for (var i =0; i < place.book.length; i++) {
    if (this == place.book[i]) {
      place.book.splice(i,1);
      render();
      break;
    }
  }
};

Library.prototype.addShelf = function (newShelf) {
  this.shelf.push(newShelf);
  render();
};

Library.prototype.removeShelf = function (oldShelf) {
  for (var i = 0; i < this.shelf.length; i++) {
    if (oldShelf == this.shelf[i].subject) {
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
    if (oldBook == this.book[i].title) {
      this.book.splice(i,1);
      render();
      break;
    }
  }
};

// THIS LOCAL STORAGE APPROACH DOESN'T WORK. NEED SOMETHING MORE SOPHISTICATED.
// var save = function() {
//     var session = JSON.stringify(campBecca);
//     localStorage.campBecca = session;
// };

var render = function() {
  $('#library').empty();
  $('#select-shelf').empty();
  $.each(campBecca.shelf, function(i, val) {
    $('#select-shelf').append('<h3><input type=\"radio\" name="shelf" value=\"' + campBecca.shelf[i].subject + '\">' + campBecca.shelf[i].subject + '</h3>');
  });
  $.each(campBecca.shelf, function(i, val) {
    $('#library').append('<li class=\"shelf\" id=\"campBecca' + i + '\"><h2>' + campBecca.shelf[i].subject + '</h2></li>');
    $.each(campBecca.shelf[i].book, function(j, val) {
      $('#campBecca' + i).append('<h3 class\"book\">\"' + campBecca.shelf[i].book[j].title + '\" by ' + campBecca.shelf[i].book[j].author + '</h3>')
    })
  })
  // save()
};

// if (localStorage.campBecca) {
//   var campBecca = JSON.parse(localStorage.campBecca);
// } else {
  var campBecca = new Library("Camp Becca");
  var philosophy = new Shelf("Philosophy");
  var dogStories = new Shelf("Books about dogs");
  var plush = new Shelf("Stuffed animals");
  var kant1 = new Book("Critique of Pure Reason", "Immanuel Kant");
  var hegel1 = new Book("Phenomenology of Spirit", "Georg Hegel");
  var yeller = new Book("Old Yeller", "Fred Gipson");
  var lassie = new Book("Lassie Come-Home", "Eric Knight");
  var pooh = new Book("Winnie-The-Pooh", "A. A. Milne");
  var caterpillar = new Book("The Very Hungry Caterpillar", "Eric Carle");

  campBecca.addShelf(philosophy);
  campBecca.addShelf(dogStories);
  campBecca.addShelf(plush);
  philosophy.addBook(kant1);
  philosophy.addBook(hegel1);
  dogStories.addBook(yeller);
  dogStories.addBook(lassie);
  plush.addBook(pooh);
  plush.addBook(caterpillar);  
// };

render();
console.log("done");

$('#add-shelf').on({'click': function() {
  if ($('#subject').val() !== "") {
    console.log($('#subject').val());
    var userShelf = new Shelf($('#subject').val());
    campBecca.addShelf(userShelf);
    render();
  }
}});

$('#remove-shelf').on({'click': function() {
  if ($('#subject').val() !== "") {
    console.log($('#subject').val());
    campBecca.removeShelf($('#subject').val());
    render();
  }
}});

  $('#add-book').on({'click': function() {
  console.log(!(($('#title').val()) == "" && ($('author').val() == "")));
  console.log($("input:radio[name=shelf]").val() !== "");
  //   if (!(($('#title').val()) == "" && ($('author').val() == "")) && $("input:radio[name=shelf]").val() !== "") {
  //     $("input:radio[name=shelf]").on.click(function() {
  //       console.log($(this).val());
  //       var destinationShelf = $(this).val();
  //       console.log(destinationShelf);
  //       var userBook = new Book($('#title').val(), $('#author').val());
  //       console.log(userBook);
  //       destinationShelf.addBook(userBook);
  //       render();
  //     }
  //   )}
  // }});

// this works for selecting items with the radio buttons.
  $("input:radio[name=shelf]").on({'click': function() {
    var destinationShelf = $(this).val();
    console.log(destinationShelf);
    if (!(($('#title').val()) == "" && ($('#author').val() == ""))) {
      console.log("First pass");
      $('#add-book').on({'click': function() {
        var userBook = new Book($('#title').val(), $('#author').val());
        console.log(userBook);
        userBook.shelve($("input:radio[name=shelf]"))
        render();
      }})
    }
  }
});


//   if (!(($('#title').val()) == "" && ($('author').val() == "")) && $("input:radio[name=shelf]").val() !== "") {
//     ().addBook($('#title').val(), $('#author').val());
//     render();
//   }  
// }});

  // $("input:radio[name=shelf]").click(function() {
  //     var destinationShelf = $(this).val();
  // });