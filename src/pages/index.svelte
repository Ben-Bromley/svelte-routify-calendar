<script>
  import { metatags } from "@roxi/routify";
  import calendarImage from '../assets/calendar.png'
  metatags.title = "Calendar";
  metatags.description = "Calendar App made using routify";
</script>

<nav>
    <a id="title" href="/">Home</a>
  <ul>
    <li><a href="/calendar">Calendar</a></li>
    <li><a href="/reporting">Reporting</a></li>
    <li><a href="/signup">Sign Up</a></li>
  </ul>
</nav>
<main>
  <section>
    <h2>View the next generation of virtual calendars...</h2>
    <img src={calendarImage} alt="Calendar">
    <p>With state of the art booking and reporting facilities, our virtual calendar can handle all your needs: business, personal, and beyond.</p>
  </section>
  <div class="inner">
    <a class="button" href="/calendar">View Calendar Demo</a>
    <a class="button" href="/reporting">View Reporting Demo</a>
  </div>
</main>
<footer>
  <hr />
  <p>&copy; 2021 Ben and Hossam</p>
  <hr />
</footer>

<style>
  main {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  nav {
    background-color: rgb(26, 38, 77);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 6px;
    height: 70px;
  }
  #title {
    margin: 15px;
    font-size: 2rem;
    text-align: center;
    color: cornflowerblue;
  }
  #title:hover {
    text-decoration: none;
  }
  ul {
    display: flex;
    color: lightblue;
    padding: 4px;
  }
  ul:hover {
    color: grey;
  }
  li {
    margin: 0 10px;
    list-style: none;
    display: flex;
    align-items: center;
  }
  ul li a {
    color: inherit;
    transition: font-size 0.4s ease-in-out 0s;
  }
  ul li a:hover {
    color: lightblue;
    text-decoration: none;
    font-size: 1.2rem;
  }
  section {
    max-width: 540px;
    margin: 0 auto;
    padding: 0 20px;
  }
  section h2 {
    font-size: 2.2rem;
    max-width: 85%;
    color:rgb(26, 38, 77);
  }
  section p {
    text-align: center;
    font-size: 1.2rem;
    max-width: 40ch;
    margin: 20px auto;
    color: rgb(122, 132, 165);
    font-weight: 500;
  }
  img {
    display: block;
    width: 70%;
    margin: 0 auto;
    
    /* border: 1px solid blue; */
  }
  .inner {
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .button {
    padding: 20px;
    margin: 10px;
    font-size: 1.2rem;
    color: cornflowerblue;
    border-radius: 0.3em;
    -webkit-box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out 0s;
  }
  .button:hover {
    -webkit-box-shadow: 1px 4px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 4px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 4px 5px 0px rgba(0, 0, 0, 0.2);
    color: rgb(26, 38, 77);
    text-decoration: none;
  }
  footer {
    background:rgb(26, 38, 77);
    color: white;
    padding: 30px;
    margin-top: 60px;
  }
</style>
