<script>
  import dayjs from "dayjs";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";
  import Event from "./Event.svelte";
  import { createEventDispatcher } from "svelte";
  export let dates;
  export let rawDates;
  export let monthNumber;
  export let appMonth;
  export let year;
  export let events;
  export let jdx;
  export let idx;
  export let modalDate;

  const dispatch = createEventDispatcher();
  
  function returnDate(event) {
    modalDate = rawDate;
    dispatch("message");
  }

  // raw date obejct for current block
  const rawDate = rawDates[`${idx * 7 + jdx}`];

  const date = dates[`${idx * 7 + jdx}`];
  export let isThisMonth = true;
  let color = "black";
  if (!isThisMonth) {
    color = "grey";
  }
  let newDate = dayjs(rawDate).format("DD-MM");

  const flipDurationMs = 300;
  function handleDndConsider(e) {
    items = e.detail.items;
  }
  function handleDndFinalize(e) {
    items = e.detail.items;

    // update date
  }

  $: thisMonthsEvents = events.filter((event) => {
    return dayjs(event.event_start).format("MMMM") === appMonth;
    console.log(thisMonthsEvents);
  });
  $: items = thisMonthsEvents;
</script>

<div on:click={returnDate} class="calendar-item" style="color: {color}">
  {date}<br />
  <section
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each items as event (event.id)}
      <Event {year} {monthNumber} {date} {event} />
    {/each}
  </section>
</div>

<style>
  .calendar-item {
    min-height: 70px;
    height: 16vw;
    max-height: 85px;
    background: #eef;
    font-weight: bold;
  }
  .calendar-item:hover,
  .calendar-item:focus {
    border: 2px solid #338bff;
  }
</style>
