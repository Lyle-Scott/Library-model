'use strict'

var unsorted = {title:"unsorted", type:"storage", ID:0, index:[]};

var Library = function(title) {
  this.type = "library";
  this.title = title;
  this.index = [];
  this.IDList = [];
};

var LibraryItem = function(branch) {
  this.branch = branch;
  this.ID;
  this.location = unsorted;
};

var checkIn = function (libraryItem, branch) { 
  libraryItem.ID = (branch.IDList.length);
  LibraryItem.branch = branch;
  branch.IDList.push(libraryItem);
  unsorted.index.push(libraryItem);
};

LibraryItem.prototype.AssignBook = function (title, author) {
  this.type = "book";
  this.title = title;
  this.author = author;
  checkIn(this);
};

LibraryItem.prototype.AssignMagazine = function (title, month, year) {
  this.type = "magazine";
  this.title = title;
  this.month = month;
  this.year = year;
  checkIn(this);
}

LibraryItem.prototype.AssignCD = function (title, artist) {
  this.type = "CD";
  this.title = title;
  checkIn(this);
}

LibraryItem.prototype.AssignShelf = function (title) {
  this.type = "shelf";
  this.title = title;
  this.index = [];
  checkIn(this);
};

LibraryItem.prototype.AssignBox = function (title) {
  this.type = "box";
  this.title = title;
  this.index = [];
  checkIn(this);
}

LibraryItem.prototype.Add = function (destination) {
  var isCompleted = false;
  if (destination.index == null) {
    console.log(destination.type, ": ", destination.title, " does not contain storage.");
    isCompleted = true;    
  }
  if (destination.ID == this.location.ID) {
    console.log("Source is the same as destination (", destination.title, "is the same as", this.location.title, ")");
    isCompleted = true;
  }
  if (destination.ID == this.ID) {
    console.log("Item cannot be put into itself");
    isCompleted = true;
  }
  if (isCompleted == false) {
    console.log(this.title, "moved from", this.location.title, "to", destination.title);
    for (var i = 0; i < this.location.index.length; i++) {
      if (this.location.index[i].ID == this.ID) {
        this.location.index.splice(i, 1);
        destination.index.push(this);
        this.location = destination; 
        render(); 
      }
    }
  }
};

LibraryItem.prototype.Remove = function () {
this.Add(unsorted);
};

var render = function() {
//   $('#library').empty();
//   $('#select-shelf').empty();
//   $.each(campBecca.index, function(i, val) {
//     $('#select-shelf').append('<h3><input type=\"radio\" name="shelf" value=\"' + campBecca.index[i].title + '\">' + campBecca.index[i].title + '</h3>');
//   });
//   $.each(campBecca.index, function(i, val) {
//     $('#library').append('<li class=\"shelf\" id=\"campBecca' + i + '\"><h2>' + campBecca.index[i].title + '</h2></li>');
//     $.each(campBecca.index[i].index, function(j, val) {
//       $('#campBecca' + i).append('<h3 class\"book\">\"' + campBecca.index[i].index[j].title + '\" - ' + campBecca.index[i].index[j].author + '</h3>')
//     })
//   })
};

var campBecca = new Library("Camp Becca");
var shelf01 = new LibraryItem();
var shelf02 = new LibraryItem();
var shelf03 = new LibraryItem();
var shelf04 = new LibraryItem();
var book01 = new LibraryItem();
var book02 = new LibraryItem();
var book03 = new LibraryItem();
var book04 = new LibraryItem();
var book05 = new LibraryItem();
var book06 = new LibraryItem();
var mag01 = new LibraryItem();
var mag02 = new LibraryItem();
var CD01 = new LibraryItem();
var CD02 = new LibraryItem();
var box01 = new LibraryItem();
var box02 = new LibraryItem();

shelf01.AssignShelf("Philosophy");
shelf02.AssignShelf("Books about dogs");
shelf03.AssignShelf("Stuffed animals");
shelf04.AssignShelf("Junk shelf");
book01.AssignBook("Critique of Pure Reason", "Immanuel Kant");
book02.AssignBook("Phenomenology of Spirit", "Georg Hegel");
book03.AssignBook("Old Yeller", "Fred Gipson");
book04.AssignBook("Lassie Come-Home", "Eric Knight");
book05.AssignBook("Winnie-The-Pooh", "A. A. Milne");
book06.AssignBook("The Very Hungry Caterpillar", "Eric Carle");
mag01.AssignMagazine("Muffintop Monthly", 12, 2004);
mag02.AssignMagazine("Games Magazine", 3, 1985);
CD01.AssignCD("Huey Lewis and the News", "Sports");
CD02.AssignCD("The Beatles", "The White Album");
box01.AssignBox("periodicals");
box02.AssignBox("media");

shelf01.Add(campBecca);
shelf02.Add(campBecca);
shelf03.Add(campBecca);
shelf04.Add(campBecca);
book01.Add(shelf01);
book02.Add(shelf01);
book03.Add(shelf02);
book04.Add(shelf02);
book05.Add(shelf03);
book06.Add(shelf03);
CD01.Add(box02);
CD02.Add(box02);
mag01.Add(box01);
mag02.Add(box01);
box01.Add(shelf04);
box02.Add(shelf04);

render();

// $("input:radio[name=shelf]").on({'click': function() {
//   var destinationShelf = $(this).val();
//   console.log(destinationShelf); 
// }});

console.log("Library initialized");