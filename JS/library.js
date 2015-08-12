'use strict'

var Library = function(branch) {
  this.branch = branch;
  this.shelves = [];
  this.index = [];
};

var Shelf = function(subject) {
  this.subject = subject;
  this.books = ["bookend"];
};

var Book = function(ID, title, author) {
  this.ID = ID;
  this.title = title;
  this.author = author;
  this.location = unshelved;
};

Shelf.prototype.addToLibrary = function (newLibrary) {
  newLibrary.shelves.push(this);
  render();
};

Shelf.prototype.removeFromLibrary = function (oldLibrary) {
  var i = this;
  $.each(oldLibrary.shelves, function(j) {
    if (i === this) {
      oldLibrary.shelf.splice(j,1);
      render(); 
    }
    return(i !== this);
  })
};

// Book.prototype.shelve = function(shelf) {
//   var out = false;
//   var i = this;
//   for (var j = 0; j < shelf.books.length; j++) {
//     console.log(i, shelf.book[j]);
//     if (i === shelf.book[j]) {
//       console.log("Book is already on this shelf.");
//       out = true;
//       break;
//     }
//   }

//   var out = true;
//   var i = this;
//   $.each(shelf.book, function(j, val) {
//     console.log(i, val);
//     if (i == val) {
//       console.log("Book is already in this shelf.");
//       out = false;
//       return(out);
//     };
//     if (j == shelf.book.length-1) {
//       shelf.book.push(this);
//       out=false;
//       return(out);
//     }
//   });
//     // needs loop to check if is already in library
//   campBecca.index.push(this);
//   this.location = shelf;
//   console.log(i.title, "is on shelf:", shelf.subject);
//   var temp = [];
//   $.each(campBecca.index, function (j) {
//     temp.push(campBecca.index[j].title);
//   });
//   console.log("Library index: ", temp)
//   render();
// };

Book.prototype.unshelve = function () {
  var isUnshelved = false;
  for (i = 0; i = unshelved.book.length; i++) {
    if (this === unshelved.book[i]) {
      console.log("Book is already unshelved.");
      isUnshelved = true;
      break;
    }
  }
  if (isUnshelved == false) {
    unshelved.books.push(this);
    this.location = unshelved;
    isUnshelved = true
    console.log(this.title, "has been unshelved.");
    for (i = 0; i < campBecca.index.length; i++) {
      if (this === campBecca.index.i) {
      console.log("Book is already in the library index.")
      }
    }

  // $.each(campBecca.index, function(j) {
  //   if (i === this) {
  //     return(false);
  //   }
  // });
  // campBecca.index.push(this);
  // // needs loop to check if is already in library
  // this.location = unshelved;
  // var temp = [];
  // $.each(campBecca.index, function (j) {
  //   temp.push(campBecca.index[j].title);
  // });
  // console.log("Library index: ", temp)
  render();
}};


// Book.prototype.unshelve = function() {
//   var i = this; 
//   $.each(book.location.book, function (j) {
//     if (i === this) {
//       shelf00.book.push(this);
//       this.location = shelf00;
//       shelf.book.splice(j,1);
//       render();
//     }
//     return(i !== this);
//   })
// };

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
    $.each(campBecca.shelf[i].books, function(j, val) {
      $('#campBecca' + i).append('<h3 class\"book\">\"' + campBecca.shelf[i].books[j].title + '\" - ' + campBecca.shelf[i].books[j].author + '</h3>')
    })
  })
  // save()
};

// if (localStorage.campBecca) {
//   var campBecca = JSON.parse(localStorage.campBecca);
// } else {
  var campBecca = new Library("Camp Becca");
  var unshelved = new Shelf("Unshelved");
  var shelf01 = new Shelf("Philosophy");
  var shelf02 = new Shelf("Books about dogs");
  var shelf03 = new Shelf("Stuffed animals");
  var book01 = new Book(1, "Critique of Pure Reason", "Immanuel Kant");
  var book02 = new Book(2, "Phenomenology of Spirit", "Georg Hegel");
  var book03 = new Book(3, "Old Yeller", "Fred Gipson");
  var book04 = new Book(4, "Lassie Come-Home", "Eric Knight");
  var book05 = new Book(5, "Winnie-The-Pooh", "A. A. Milne");
  var book06 = new Book(6, "The Very Hungry Caterpillar", "Eric Carle");

  shelf01.addToLibrary(campBecca);
  shelf02.addToLibrary(campBecca);
  shelf03.addToLibrary(campBecca);
  book01.shelve(shelf01);
  book02.shelve(shelf01);
  book03.shelve(shelf02);
  book04.shelve(shelf02);
  book05.shelve(shelf03);
  book06.shelve(shelf03);

render();
console.log("done");

$('#add-shelf').on({'click': function() {
  if ($('#subject').val() !== "") {
    console.log($('#subject').val());
    var userShelf = new Shelf($('#subject').val());
    userShelf.addToLibrary(campBecca);
    render();
  }
}});

$('#remove-shelf').on({'click': function() {
  if ($('#subject').val() !== "") {
    console.log($('#subject').val());
    var userShelf = $('#subject').val();
    // Needs VARIABLE NAME CONCATENATION
    userShelf.removeFromLibrary(campBecca);
    render();
  }
}});

  $('#add-book').on({'click': function() {
  console.log(!(($('#title').val()) == "" && ($('author').val() == "")));
  // console.log($("input:radio[name=shelf]").val() !== "");
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
    //   )
    // }
  }});

// this works for selecting items with the radio buttons.
$("input:radio[name=shelf]").on({'click': function() {
  destinationShelf = $(this).val();
  console.log(destinationShelf);
  if (!(($('#title').val()) == "" && ($('#author').val() == ""))) {
    console.log("First pass");
    $('#add-book').on({'click': function() {
      userBook = new Book($('#title').val(), $('#author').val());
      console.log(userBook);
      userBook.shelve($("input:radio[name=shelf]"))
      render();
    }})
  }
}});


//   if (!(($('#title').val()) == "" && ($('author').val() == "")) && $("input:radio[name=shelf]").val() !== "") {
//     ().addBook($('#title').val(), $('#author').val());
//     render();
//   }  
// }});

  // $("input:radio[name=shelf]").click(function() {
  //     var destinationShelf = $(this).val();
  // });