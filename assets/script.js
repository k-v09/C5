$(document).ready(function () {
  const workHours = [
      { hour: 9, display: "9AM" },
      { hour: 10, display: "10AM" },
      { hour: 11, display: "11AM" },
      { hour: 12, display: "12PM" },
      { hour: 13, display: "1PM" },
      { hour: 14, display: "2PM" },
      { hour: 15, display: "3PM" },
      { hour: 16, display: "4PM" },
      { hour: 17, display: "5PM" }
  ];

  const currentDay = $("#currentDay");
  currentDay.text(dayjs().format('dddd, MMMM D'));

  const container = $(".container");

  workHours.forEach(hour => {
      const timeBlock = $('<div class="time-block">').attr('id', `hour-${hour.hour}`);
      const hourLabel = $('<div class="hour">').text(hour.display);
      const textArea = $('<textarea>').attr('data-hour', hour.hour);
      const saveButton = $('<button class="saveBtn">').text('Save');

      timeBlock.append(hourLabel, textArea, saveButton);
      container.append(timeBlock);

      // Load saved events from local storage
      const savedEvent = localStorage.getItem(`event-${hour.hour}`);
      if (savedEvent) {
          textArea.val(savedEvent);
      }

      // Color code the time blocks
      const currentHour = dayjs().hour();
      if (hour.hour < currentHour) {
          textArea.addClass("past");
      } else if (hour.hour === currentHour) {
          textArea.addClass("present");
      } else {
          textArea.addClass("future");
      }
  });

  // Save event to local storage
  $(".saveBtn").on("click", function () {
      const hour = $(this).siblings("textarea").attr("data-hour");
      const event = $(this).siblings("textarea").val();
      localStorage.setItem(`event-${hour}`, event);
  });
});
