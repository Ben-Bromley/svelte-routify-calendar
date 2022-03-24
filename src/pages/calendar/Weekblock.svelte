<script>
  import dayjs from "dayjs";

  import { createEventDispatcher } from "svelte";
  import Event from "./Event.svelte";
  const dispatch = createEventDispatcher();
  export let idx;
  export let jdx;
  export let year;
  export let monthNumber;
  export let times;
  export let rawWeekdays;
  export let events = [];

  const time = times[jdx].format("hh:mma");
  $: date = rawWeekdays[idx].format("DD");

  const returnWeek = (event) => {
    dispatch("message", event);
  };
</script>

<div class="calendar-item" on:click={returnWeek}>
  {#each events as event (event.id)}
      <Event {year} {monthNumber} {event} {date} {time} allDay={event.event_isAllDay}/>
  {/each}
</div>

<style>
  .calendar-item {
    min-height: 50px;
    background: #eef;
  }
</style>
