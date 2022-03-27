<script>
  import dayjs from "dayjs";
  // import { flip } from "svelte/animate";

  import MonthBlock from "./MonthBlock.svelte";
  import HourBlock from "./HourBlock.svelte";
  import Modal from "./Modal.svelte";
  // import Event from "./Event.svelte";/
  import { onMount } from "svelte";
  import { APIEndPoint, modal } from "../../stores";
  import Weekblock from "./Weekblock.svelte";
  // import { dndzone } from "svelte-dnd-action";

  const apiURL = $APIEndPoint;

  // default view
  let viewType = "month";

  // this is modified to change the dates shown
  let currentDate = dayjs();
  let modalDate = 0;

  // gets important info about the currentDate
  $: month = currentDate.format("MMMM");
  $: monthNumber = currentDate.format("MM");
  $: year = currentDate.format("YYYY");
  $: weekOf = currentDate.startOf("week").format("DD/MM");
  $: daysInMonth = currentDate.daysInMonth();

  // currentDate passed in to avoid changing globally
  $: daysToDisplay = getDisplayDays(currentDate);
  $: rawDaysToDisplay = getRawDisplayDays(currentDate);

  // 7 columns because 7 days a week!
  let cols = 7;
  // this adjusts the rows so all the days fit
  $: rows = Math.ceil(daysToDisplay.length / cols);
  // days of week for headers
  const weekdays = getWeekDays();
  $: rawWeekdays = getRawWeekDays(currentDate);
  const displayTimes = getDisplayTimes();
  let events = [];
  onMount(async () => {
    // fetches events
    let res = await fetch(apiURL);
    events = await res.json();
  });

  // GETS IMPORTANT INFO
  function getWeekDays() {
    let weekdays = [];
    let newDay;
    for (let i = 0; i <= 6; i++) {
      newDay = dayjs().day(i).format("ddd");
      weekdays.push(newDay);
    }
    return weekdays;
  }
  function getRawWeekDays(curDate) {
    let rawWeekdays = [];
    let newDay;
    for (let i = 0; i <= 6; i++) {
      newDay = dayjs(curDate).day(i);
      rawWeekdays.push(newDay);
    }
    return rawWeekdays;
  }
  function getDisplayDays(curDate) {
    // dates to be displayed
    let toDisplay = [];
    // first day of month
    let tempDate = curDate.startOf("month");
    // the first date to be displayed
    let preDate = tempDate.startOf("week");
    let preDateArray = [];

    // the last dates to be displayed
    let tempEndDate = tempDate.endOf("month");
    let postDate = tempEndDate.endOf("week");
    let postDateArray = [];

    // dates for the first few days to display
    for (let i = 0; i < tempDate.day(); i++) {
      preDateArray.push(preDate.format("D"));
      preDate = preDate.add(1, "d");
    }

    // get days during the month
    for (let i = 0; i < daysInMonth; i++) {
      toDisplay.push(tempDate.format("D"));
      tempDate = tempDate.add(1, "d");
    }

    // counteracts duplicates
    tempEndDate = tempEndDate.add(1, "d");
    // dates for end of calendar
    for (let i = tempEndDate.day(); i <= postDate.day(); i++) {
      postDateArray.push(tempEndDate.format("D"));
      tempEndDate = tempEndDate.add(1, "d");
    }
    toDisplay = [...preDateArray, ...toDisplay, ...postDateArray];
    // console.log("dates to display ->", toDisplay);
    return toDisplay;
  }
  function getRawDisplayDays(curDate) {
    // dates to be displayed
    let toDisplay = [];
    // first day of month
    let tempDate = curDate.startOf("month");
    // the first date to be displayed
    let preDate = tempDate.startOf("week");
    let preDateArray = [];

    // the last dates to be displayed
    let tempEndDate = tempDate.endOf("month");
    let postDate = tempEndDate.endOf("week");
    let postDateArray = [];
    // dates for the first few days to display
    for (let i = 0; i < tempDate.day(); i++) {
      preDateArray.push(preDate);
      preDate = preDate.add(1, "d");
    }
    // get days during the month
    for (let i = 0; i < daysInMonth; i++) {
      toDisplay.push(tempDate);
      tempDate = tempDate.add(1, "d");
    }
    // counteracts duplicates
    tempEndDate = tempEndDate.add(1, "d");
    // dates for end of calendar
    for (let i = tempEndDate.day(); i <= postDate.day(); i++) {
      postDateArray.push(tempEndDate);
      tempEndDate = tempEndDate.add(1, "d");
    }
    toDisplay = [...preDateArray, ...toDisplay, ...postDateArray];
    return toDisplay;
  }
  function getDisplayTimes() {
    let displayTimes = [];
    let startTime = dayjs().hour(0).minute(0);
    for (let i = 0; i < 48; i++) {
      displayTimes.push(startTime);
      startTime = startTime.add(30, "minute");
    }
    return displayTimes;
  }

  // ALL FOR DATE CHANGERS
  function prevMonth() {
    currentDate = dayjs(currentDate).subtract(1, "month");
  }
  function nextMonth() {
    currentDate = dayjs(currentDate).add(1, "month");
  }
  function prevWeek() {
    currentDate = dayjs(currentDate).subtract(1, "week");
  }
  function nextWeek() {
    currentDate = dayjs(currentDate).add(1, "week");
  }
  function prevDay() {
    currentDate = dayjs(currentDate).subtract(1, "day");
  }
  function nextDay() {
    currentDate = dayjs(currentDate).add(1, "day");
  }

  function toggleModal(message) {
    $modal = !$modal;
  }

  const flipDurationMs = 300;
  function handleDndConsider(e) {
    items = e.detail.items;
  }

  function handleDndFinalize(e) {
    items = e.detail.items;
  }
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
</svelte:head>

<main>
  {#if $modal}
    <Modal bind:modalDate={modalDate} />
  {/if}
  <h1>Calendar</h1>
  {#if viewType === "month"}
    <div id="option-container">
      <div id="month-selector" class="bg-secondary">
        <p on:click={prevMonth}>&lt;</p>
        <h2>{month} {year}</h2>
        <p on:click={nextMonth}>&gt;</p>
      </div>
      <div
        class="btn-group"
        role="group"
        aria-label="radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          bind:group={viewType}
          value="month"
          autocomplete="off"
          checked
        />
        <label class="btn btn-secondary" for="btnradio1">Month</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          bind:group={viewType}
          value="week"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio2">Week</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          bind:group={viewType}
          value="day"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio3">Day</label>
      </div>
    </div>
    <section id="grid-display">
      {#each weekdays as day}
        <div class="header">{day}</div>
      {/each}

      {#each Array(rows) as _, idx}
        {#each Array(cols) as _, jdx (rawDaysToDisplay[`${idx * 7 + jdx}`].format("DDMMYY"))}
          {#if idx === 0 && parseInt(daysToDisplay[`${idx * 7 + jdx}`]) > 8}
            <!-- dates that DONT belong -->
            <MonthBlock
              isThisMonth={false}
              {idx}
              {jdx}
              dates={daysToDisplay}
              rawDates={rawDaysToDisplay}
              {events}
              on:message={toggleModal}
              appMonth={month}
              {year}
              bind:modalDate={modalDate}
            />
          {:else if idx >= 4 && parseInt(daysToDisplay[`${idx * 7 + jdx}`]) < 8}
            <!-- dates that DONT belong -->
            <MonthBlock
              isThisMonth={false}
              {idx}
              {jdx}
              dates={daysToDisplay}
              rawDates={rawDaysToDisplay}
              {events}
              on:message={toggleModal}
              appMonth={month}
              {year}
              bind:modalDate={modalDate}
            />
          {:else}
            <!-- dates that belong -->
            <MonthBlock
              {idx}
              {jdx}
              dates={daysToDisplay}
              rawDates={rawDaysToDisplay}
              {events}
              appMonth={month}
              {year}
              bind:modalDate={modalDate}
              on:message={toggleModal}
            />
          {/if}
        {/each}
      {/each}
    </section>
  {:else if viewType === "week"}
    <div id="option-container">
      <div id="month-selector" class="bg-secondary">
        <p on:click={prevWeek}>&lt;</p>
        <h2>Week Begin: {weekOf}</h2>
        <p on:click={nextWeek}>&gt;</p>
      </div>
      <div
        class="btn-group"
        role="group"
        aria-label="radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          bind:group={viewType}
          value="month"
          autocomplete="off"
          checked
        />
        <label class="btn btn-secondary" for="btnradio1">Month</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          bind:group={viewType}
          value="week"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio2">Week</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          bind:group={viewType}
          value="day"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio3">Day</label>
      </div>
    </div>
    <section>
      <section id="grid-display" style="grid-template-columns: repeat(8, 1fr);">
        <div class="header" />
        {#each rawWeekdays as day}
          <div class="header">{day.format("dd, DD")}</div>
        {/each}
        {#each displayTimes as time, jdx}
          <div class="calendar-header">{time.format("hh:mma")}</div>
          {#each Array(cols) as _, idx}
            <Weekblock
              {idx}
              {jdx}
              {events}
              {monthNumber}
              {year}
              {rawWeekdays}
              times={displayTimes}
              on:message={toggleModal}
            />
          {/each}
        {/each}
      </section>
    </section>
  {:else if viewType === "day"}
    <div id="option-container">
      <div id="month-selector" class="bg-secondary">
        <p on:click={prevDay}>&lt;</p>
        <h2>{currentDate.format("ddd DD, MMM YYYY")}</h2>
        <p on:click={nextDay}>&gt;</p>
      </div>
      <div
        class="btn-group"
        role="group"
        aria-label="radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          bind:group={viewType}
          value="month"
          autocomplete="off"
          checked
        />
        <label class="btn btn-secondary" for="btnradio1">Month</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          bind:group={viewType}
          value="week"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio2">Week</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          bind:group={viewType}
          value="day"
          autocomplete="off"
        />
        <label class="btn btn-secondary" for="btnradio3">Day</label>
      </div>
    </div>
    <section id="grid-display" style="grid-template-columns: 1fr 6fr;">
      {#each displayTimes as time, z}
        <div class="calendar-header">{time.format("hh:mma")}</div>
        <HourBlock
          index={z}
          {events}
          {monthNumber}
          {year}
          date={currentDate}
          times={displayTimes}
          on:message={toggleModal}
        />
      {/each}
    </section>
  {:else}
    <section>
      <p>Something has gone terribly wrong...</p>
    </section>
  {/if}
</main>

<style>
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 10px;
  }
  h1 {
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  #grid-display {
    display: grid;
    position: relative;
    
    min-width: 400px;
    min-height: 400px;

    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    padding: 5px;
    background: #444;
    border-radius: 8px;
    overflow: hidden;
  }
  .header {
    text-align: center;
    margin: 7px 0;
    font-weight: bold;
    color: #eef;
  }
  #option-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto;
    width: 95%;
  }
  #month-selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border-radius: 20px;
    padding: 5px 10px;
    max-width: 250px;
    width: 50%;
    max-height: 40px;
  }
  #month-selector p {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
  }
  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  .calendar-header {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
