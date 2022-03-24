<script>
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  export let results;
  export let group;
  let returnArray = [];

  const displayTimes = getDisplayTimes();
  function getDisplayTimes() {
    let displayTimes = [];
    let startTime = dayjs().hour(0).minute(0);
    for (let i = 0; i < 24; i++) {
      displayTimes.push(startTime.format("HH"));
      startTime = startTime.add(1, "hour");
    }
    return displayTimes;
  }

  onMount(() => {
    if (group === "Hour") {
      for (let time of displayTimes) {
        returnArray.push({ Hour: time, bookings: 0 });
        returnArray = returnArray;
      }
    } else if (group === "Day") {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      for (let thisDay of days) {
        returnArray.push({ Day: thisDay, bookings: 0 });
        returnArray = returnArray;
      }
    } else if (group === "Month") {
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
      for (let thisMonth of months) {
        for (let entry of results) {
          if (thisMonth === dayjs(entry.month).format("MMMM")) {
            console.log("hooray");
          }
        }
        returnArray.push({ Month: thisMonth, bookings: 0 });
        returnArray = returnArray;
      }
    } else {
      console.log("huh?");
    }
  });
</script>

<section class="pb-1">
  <table class="my-5 mx-2">
    <thead>
      <th>{group}</th>
      <th>Bookings</th>
    </thead>
    <tbody>
      {#each returnArray as result (result)}
        <tr>
          <td class="px-3 py-2">{result[group]}</td>
          <td class="px-3 py-2">{result.bookings}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  tbody {
    border: 5px solid black;
  }
  tr {
    border-bottom: 3px solid gray;
  }
  td {
    border: 1px solid grey;
  }
</style>
