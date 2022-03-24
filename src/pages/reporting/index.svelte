<script>
  import { APIEndPoint } from "../../stores";
  import { onMount } from "svelte";
  import ResultTable from "./ResultTable.svelte";
  import { metatags } from "@roxi/routify";
  metatags.title = "Reporting";
  const url = $APIEndPoint;
  let display = "Hour";

  // forms are bound to these values
  // this is from the input
  // sent to api
  let eventHour;
  let eventDay;
  let eventDate;
  let eventWeek;
  let eventMonth;
  let results = [];
  let showResults = false;
$: console.log(showResults);
  const searchByHour = async () => {
    results = await fetch(`${url}/searchByHour`);
    console.log("response ->", await results.json());
  };
  const searchByDay = async () => {
    results = await fetch(`${url}/searchByDay`);
    console.log("response ->", await results.json());
  };
  const searchByDate = async () => {
    results = await fetch(`${url}/searchByDate`);
    console.log("response ->", await results.json());
  };
  const searchByWeek = async () => {
    results = await fetch(`${url}/searchByWeek`);
    console.log("response ->", await results.json());
  };
  const searchByMonth = async () => {
    results = await fetch(`${url}/searchByMonth`);
    console.log("response ->", await results.json());
    showResults != showResults;
  };
  const showTable = () => {
    showResults != showResults;
  }

  // list of days for the day group
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // list of months for the month group
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
</svelte:head>

<main class="container">
  <h1 class="my-4">REPORTS</h1>
  <!-- Start, End date, groupby (hour,day,date,week,month) 
    How many bookings were made on that date OR How many bookings are taking place on the day -->

  <!-- GROUP BY SELECTOR -->
  <div
    class="btn-group mb-3"
    role="group"
    aria-label="radio toggle button group"
  >
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio1"
      bind:group={display}
      value="Hour"
      autocomplete="off"
      checked
    />
    <label class="btn btn-secondary" for="btnradio1">Hour</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio2"
      bind:group={display}
      value="Day"
      autocomplete="off"
    />
    <label class="btn btn-secondary" for="btnradio2">Day</label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio3"
      bind:group={display}
      value="Date"
      autocomplete="off"
    />
    <label class="btn btn-secondary" for="btnradio3">Date</label>
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio4"
      bind:group={display}
      value="Week"
      autocomplete="off"
    />
    <label class="btn btn-secondary" for="btnradio4">Week</label>
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="btnradio5"
      bind:group={display}
      value="Month"
      autocomplete="off"
    />
    <label class="btn btn-secondary" for="btnradio5">Month</label>
  </div>

  <!-- input forms -->
  <section>
    <h2>Search By {display}</h2>
    {#if display == "Hour"}
      <form>
        <label for="hourfilter">
          Select Hour
          <input
            bind:value={eventHour}
            name="hourfilter"
            type="time"
            step="3600"
          />
        </label>
        <input
          type="submit"
          on:click|preventDefault={searchByHour}
          class="btn btn-primary"
          value="Submit"
        />
        <ResultTable {results} group={display} />
      </form>
    {:else if display == "Day"}
      <form>
        <label for="eventDayFilter">
          Event Day
          <select
            bind:value={eventDay}
            name="eventDayFilter"
            id="eventDayFilter"
          >
            {#each days as day}
              <option value={day}>{day}</option>
            {/each}
          </select>
        </label>
        <input
          type="submit"
          on:click|preventDefault={searchByDay}
          class="btn btn-primary"
          value="Submit"
        />
        <ResultTable {results} group={display} />
      </form>
    {:else if display == "Date"}
      <form>
        <label for="eventDateFilter">
          Event Date
          <input bind:value={eventDate} name="eventDateFilter" type="date" />
        </label>
        <input
          type="submit"
          on:click|preventDefault={searchByDate}
          class="btn btn-primary"
          value="Submit"
        />
      </form>
    {:else if display == "Week"}
      <p>search</p>
    {:else if display == "Month"}
      <form>
        <!-- <label for="eventMonthFilter">
          Event Month
          <select
            bind:value={eventMonth}
            name="eventDayFilter"
            id="eventDayFilter"
          >
            {#each months as month}
              <option value={month}>{month}</option>
            {/each}
          </select>
        </label> -->
        <input
          type="submit"
          on:click|preventDefault={searchByMonth}
          class="btn btn-primary"
          value="Submit"
        />
      </form>
      {#if showResults}
        <ResultTable bind:results={results} group={display} />
      {/if}
    {/if}
  </section>
</main>

<style>
  h1 {
    color: blueviolet;
    font-size: 3.5rem;
  }
</style>
