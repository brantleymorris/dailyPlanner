// create function to loop through times blocks to create table rows
    // array containing the time blocks
    var times = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    var timeId = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    // forEach loop to add table rows
    times.forEach(function (timeFrame, i) {
        addRow(timeFrame, i);
    });

    // may just hard code this
    function addRow (timeFrame, i) {
        // creates time section of table
        var time = document.createElement("div");
        time.setAttribute("class", "hour col");
        time.setAttribute("id", timeId[i]);
        time.textContent = timeFrame;
    
        // creates text box section of table
        var text = document.createElement("input");
        text.setAttribute("class", "time-block col-7")
        text.setAttribute("type", "text");
    
        // creates lock button section of table

        var lockButton = document.createElement("button"); // may need to add class, or other attribute, to add image possibly through css
        lockButton.setAttribute("type", "button");
        lockButton.setAttribute("class", "saveBtn col");
        lockButton.textContent = "Lock Image";

        // creates row and appends sections
        var row = document.createElement("div");
        row.setAttribute("class", "row text-center");
        row.append(time, text, lockButton);
        document.querySelector(".container").append(row); 
    };

// stores items when lock button is clicked
    function storeItems() {
        var textVal = $(this).siblings(".time-block").val();
        var timeVal = $(this).siblings().attr("id");

        localStorage.setItem(timeVal, textVal);
    }

// writes stored items when page is loaded, this may need to be called in addRow function
    function writeItems(time){
        $(`#${time}`).siblings(".time-block").val(localStorage.getItem(time));
    };

// color text area background based on current time
   function selectTime(time) {
        var currentTime = moment();
        var Time = parseInt(currentTime.format("HH"));
        var Time2 = parseInt(`${time}`);

        if (Time2 === Time) {
            $(`#${time}`).siblings(".time-block").attr("class", "time-block col-7 present");
        }
        else if (Time2 < Time) {
            $(`#${time}`).siblings(".time-block").attr("class", "time-block col-7 past");
        }
        else if (Time2 > Time) {
            $(`#${time}`).siblings(".time-block").attr("class", "time-block col-7 future");
        }
    };

// for loop to loop though ids 9-17 and call writeItems
    for (let i = 9; i < 18; i++) {
        writeItems(i);
        selectTime(i);
    };

// create time display at top of page, updates every second
    setInterval(function() {
        var timeAndDate = moment();
        $("#currentDay").text(timeAndDate.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    setInterval();

// add listener to track when the lock buttons are clicked
    $(document).on("click", ".saveBtn", storeItems);