<script>
  import { createEventDispatcher } from "svelte";
  import Event from "./Event.svelte";
  const dispatch = createEventDispatcher();

  export let index;
  export let year;
  export let monthNumber;
  export let date;
  export let times;
  export let events = [];

  const time = times[index].format("hh:mma");
  const returnHour = () => {
    dispatch("message", index);
  };
</script>

<div on:click={returnHour} class="calendar-item">
  {#each events as event (event.id)}
    <Event
      {year}
      {monthNumber}
      {event}
      date={date.format("DD")}
      {time}
      allDay={event.event_isAllDay}
    />
  {/each}
</div>

<style>
  .calendar-item {
    min-height: 50px;
    background: #eef;
    font-weight: bold;
  }
</style>
