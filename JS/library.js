'use strict'

var unsorted = {title:"unsorted", type:"storage", ID:-1, index:[]};
var trash = {title:"trash", type: "storage", ID:-2, index:[]};

var Library = function(title) {
  this.type = "branch";
  this.title = title;
  this.index = [];
  this.IDList = [];
};

var LibraryItem = function(branch) {
  this.branch = branch;
  this.ID;
  this.location = unsorted;
};

var CheckIn = function (libraryItem, branch) { 
  libraryItem.ID = (branch.IDList.length);
  LibraryItem.branch = branch;
  branch.IDList.push(libraryItem);
  unsorted.index.push(libraryItem);
};

LibraryItem.prototype.assignBook = function (title, author, branch) {
  this.type = "book";
  this.title = title;
  this.author = author;
  CheckIn(this, branch);
};

LibraryItem.prototype.assignMagazine = function (title, month, year, branch) {
  this.type = "magazine";
  this.title = title;
  this.month = month;
  this.year = year;
  CheckIn(this, branch);
}

LibraryItem.prototype.assignCD = function (title, artist, branch) {
  this.type = "CD";
  this.title = title;
  CheckIn(this, branch);
}

LibraryItem.prototype.assignShelf = function (title, branch) {
  this.type = "shelf";
  this.title = title;
  this.index = [];
  CheckIn(this, branch);
};

LibraryItem.prototype.assignBox = function (title, branch) {
  this.type = "box";
  this.title = title;
  this.index = [];
  CheckIn(this, branch);
}

LibraryItem.prototype.add = function (destination) {
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

LibraryItem.prototype.remove = function() {
this.Add(unsorted);
};

LibraryItem.prototype.empty = function() {
  if (this.index) {
    for (var i = this.index.length-1; i >= 0; i--) {
      this.index[i].add(unsorted);
    }
  }
}; 

LibraryItem.prototype.erase = function() {
  if (this.index) {
    this.Empty();
  }
  this.Add(trash);
  trash.index = [];
  this.ID = null;
  this.location = null;
  this.branch = null;
  this.title = null;
  this.type = null;
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

shelf01.assignShelf("Philosophy", campBecca);
shelf02.assignShelf("Books about dogs", campBecca);
shelf03.assignShelf("Stuffed animals", campBecca);
shelf04.assignShelf("Junk shelf", campBecca);
book01.assignBook("Critique of Pure Reason", "Immanuel Kant", campBecca);
book02.assignBook("Phenomenology of Spirit", "Georg Hegel", campBecca);
book03.assignBook("Old Yeller", "Fred Gipson", campBecca);
book04.assignBook("Lassie Come-Home", "Eric Knight", campBecca);
book05.assignBook("Winnie-The-Pooh", "A. A. Milne", campBecca);
book06.assignBook("The Very Hungry Caterpillar", "Eric Carle", campBecca);
mag01.assignMagazine("Muffintop Monthly", 12, 2004, campBecca);
mag02.assignMagazine("Games Magazine", 3, 1985, campBecca);
CD01.assignCD("Huey Lewis and the News", "Sports", campBecca);
CD02.assignCD("The Beatles", "The White Album", campBecca);
box01.assignBox("periodicals", campBecca);
box02.assignBox("media", campBecca);

shelf01.add(campBecca);
shelf02.add(campBecca);
shelf03.add(campBecca);
shelf04.add(campBecca);
book01.add(shelf01);
book02.add(shelf01);
book03.add(shelf02);
book04.add(shelf02);
book05.add(shelf03);
book06.add(shelf03);
CD01.add(box02);
CD02.add(box02);
mag01.add(box01);
mag02.add(box01);
box01.add(shelf04);
box02.add(shelf04);

render();

// $("input:radio[name=shelf]").on({'click': function() {
//   var destinationShelf = $(this).val();
//   console.log(destinationShelf); 
// }});

console.log("Library initialized");