<script>
  import { APIEndPoint, events, modal } from "../../stores.js";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  const url = $APIEndPoint;
  //   function log() {
  //     console.log($events);
  //   }
  export let modalDate;
  function modalToggle() {
    $modal = !$modal;
  }
  const submit = async () => {
    let newStart = dayjs(eventStart).toISOString();
    let newEnd = dayjs(eventEnd).toISOString();
    if (isAllDay) {
      newStart = dayjs(newStart).hour(1).minute(0).toISOString();
      newEnd = dayjs(newEnd).hour(0).minute(59).second(59).toISOString();
    }
    const newEvent = {
      event_name: name,
      event_desc: desc,
      event_isAllDay: isAllDay,
      event_start: newStart,
      event_end: newEnd,
    };
    console.log(newEvent);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(newEvent),
    });
  };
  onMount(()=>{
    eventStart = dayjs(modalDate).hour(8).format("YYYY-MM-DDThh:mm");
    eventEnd = dayjs(modalDate).hour(10).format("YYYY-MM-DDThh:mm");
  })
  let name;
  let desc;
  let isAllDay = false;
  let eventStart;
  let eventEnd;
</script>

<!-- MODAL WINDWOW -->

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
      <input bind:value={eventStart} name="eventStart" type="datetime-local" />
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
      value="Add"
    />
    <button on:click={modalToggle} class="btn btn-outline-secondary">
      Close
    </button>
  </form>
</div>

<style>
  #modal-window {
    /* so buttons behind don't show up over modal */
    z-index: 2;
    /* so window takes up whole screen */
    position: absolute;
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
    min-height: 400px;
    padding: 20px;
    border-radius: 0.5em;
    background: white;
  }
  #modal-window form > label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 8px 0;
  }
  #modal-window form > button {
    margin: 8px 0;
  }
</style>
