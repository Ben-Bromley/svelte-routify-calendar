<script>
  import dayjs from "dayjs";
  import { APIEndPoint } from "../../stores";
  let eventModal = false;
  const url = $APIEndPoint;

  function toggleEventModal() {
    eventModal = !eventModal;

    // adding props to bindable values
    // resets to avoid confusion
    name = event.event_name;
    desc = event.event_desc;
    isAllDay = parseInt(event.event_isAllDay);
    eventStart = dayjs(event.event_start).format("YYYY-MM-DDThh:mm");
    eventEnd = dayjs(event.event_end).format("YYYY-MM-DDThh:mm");

    eventMonth = dayjs(event.event_start).format("MMMM");
  }
  const submit = async () => {
    // data will be updated
    let newStart = dayjs(eventStart).toISOString();
    let newEnd = dayjs(eventEnd).toISOString();
    if (isAllDay) {
      newStart = dayjs(newStart).hour(1).minute(0).toISOString();
      newEnd = dayjs(newEnd).hour(0).minute(59).second(59).toISOString();
    }
    let eventUpdate = [event.id, name, desc, isAllDay, eventStart, eventEnd];
    console.log("Sent =>", eventUpdate);
    let response = await fetch(`${url}/updateEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(eventUpdate),
    });
  };

  const deleteEvent = async () => {
    // make fetch request to delete record
    let response = await fetch(`${url}home/deleteEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify([event.id]),
    });
  };
  export let event = {
    id,
    event_name,
    event_desc,
    event_isAllDay,
    event_start,
    event_end,
  };

  let eventDate = dayjs(event.event_start).format("DD/MM/YYYY");
  let eventDay = dayjs(event.event_start).format("D");
  let eventYear = dayjs(event.event_start).format("YYYY");
  let eventMonth = dayjs(event.event_start).format("MM");

  // adding props to bindable values
  let name = event.event_name;
  let desc = event.event_desc;
  let isAllDay = parseInt(event.event_isAllDay);
  let eventStart = dayjs(event.event_start).format("YYYY-MM-DDThh:mm");
  let eventEnd = dayjs(event.event_end).format("YYYY-MM-DDThh:mm");
  let eventTime = dayjs(event.event_start).format("hh:mma");

  export let rawDate;
  export let date;
  export let time = eventTime;
  export let year;
  let monthNumber = rawDate.format("MM");
  export let allDay = 0;
  
  // TESTING PURPOSES ONLY
  // console.log(name, {
  //   "Standard: ": [monthNumber, date, year, time],
  //   "Query: ": [monthNumber, eventDay, eventYear, eventTime],
  // });
</script>

{#if eventModal}
  <div id="modal-window">
    <form action={url} method="POST">
      <label for="eventName">
        Event Name
        <input
          bind:value={name}
          name="eventName"
          type="text"
          placeholder="Tea with Ted"
        />
      </label>
      <label for="eventDescription">
        Description
        <input
          bind:value={desc}
          name="eventDescription"
          type="text"
          placeholder="Description"
        />
      </label>
      <div class="form-check form-switch">
        <label for="isAllDay" id="checkbox-label" class="form-check-label"
          >All Day</label
        >
        <input
          type="checkbox"
          name="isAllDay"
          id="isAllDay"
          class="form-check-input"
          bind:checked={isAllDay}
        />
      </div>
      <label for="eventStart">
        Event Start
        <input
          bind:value={eventStart}
          name="eventStart"
          type="datetime-local"
        />
      </label>
      {#if !isAllDay}
        <label for="eventEnd">
          Event End
          <input bind:value={eventEnd} name="eventEnd" type="datetime-local" />
        </label>
      {/if}
      <input
        type="submit"
        on:click|preventDefault={submit}
        class="btn btn-primary"
        value="Update"
      />
      <button on:click={deleteEvent} class="btn btn-danger">Delete</button>
      <button on:click={toggleEventModal} class="btn btn-outline-secondary">
        Close
      </button>
    </form>
  </div>
{/if}
{#if eventMonth === monthNumber && eventDay === date && eventYear === year && eventTime === time}
  {#if allDay == 0}
    <div on:click={toggleEventModal} class="event">
      <p>{event.event_name}</p>
    </div>
  {:else}
    <div on:click={toggleEventModal} class="event allDay">
      <p>{event.event_name}</p>
    </div>
  {/if}
{/if}

<style>
  .event:hover {
    font-weight: 800;
  }
  .allDay {
    background: blue;
    color: white;
    /* padding: 2px; */
    position: absolute;
    top: 35px;
  }
  #modal-window {
    /* so buttons behind don't show up */
    z-index: 2;
    /* so window takes up whole screen */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* dims background */
    background: #222222bb;
    /* aligns the form center */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #modal-window form {
    /* allows inputs to be stacked vertically */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* restricts dimensions */
    max-width: 300px;
    min-height: 500px;
    /* min-height: 300px; */
    /* max-height: 400px; */
    padding: 20px;
    border-radius: 0.5em;
    background: white;
  }
</style>
