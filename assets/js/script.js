//variable for writing current time to the document
var timeDisplay = $("#currentDay");

$(function () {
  
  //variable for specifically the current hour
  var currentHour = dayjs().hour();
  //a for each loop that checks for anything that has a class of timeblock
  $(".time-block").each(function() {
    //for each instance of timeblock it looks at its related id and takes the first integer within the id after the "-".
    var hourId = parseInt($(this).attr("id").split("-")[1]);
    //loop checks the current hour against the hour id of the time block and assigns time classes
    if (currentHour > hourId) {
      $(this).addClass("past");
    } else if (currentHour === hourId) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Listener for click on saveBtn
  $(".saveBtn").on("click", function() {
    //saves the description area and id when save is pressed. $(this) allows the foreach loop to work on each timeblock's id and description fields
    //siblings since description is the same hierarchy as savebtn
    //parent since id is above savebtn in hierarchy
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    //putting the two variables into an object for local storage purposes
    var saveData = {
      Text: text,
      Time: time,
    }
    //sets the object to local storage under the key value of the coressponding hour
    localStorage.setItem(time, JSON.stringify(saveData));
  });

  // Checks local storage for previous descriptions
  $(".time-block").each(function() {
    //for each class of time-block put the related id into a variable
    var hourId = $(this).attr("id");
    //create a variable that takes data from local storage as long as it matches the hour id
    var prevData = localStorage.getItem(hourId);
    //only runs the following if there was previous data
    if (prevData) {
      //parse the local storage data so that we can use it
      var parseData = JSON.parse(prevData);
      //adds the previous data to the description field
      $(this).find(".description").val(parseData.Text);
    }
    });
  
  });

//function that checks the current time and displays it to timeDisplay
function displayTime() {
  //uses the dayjs api to set and format the current time to a variable (day of the week, month, numerical date, time, and am/pm)
  var currentTime = dayjs().format("dddd, MMMM D, h:mm a");
  //displays the date to the #currentday id
  timeDisplay.text(currentTime);
}


//call function to retrieve the time and display it once
displayTime();
//interval to keep refresh displayTime every 1000ms
setInterval(displayTime, 1000);