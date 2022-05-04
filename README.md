![TipOff](https://user-images.githubusercontent.com/97937045/166644397-3ea2308d-db64-4d03-8e15-2bd911e11f05.png)

**Tip-Off** - A basketball app for the NBA fan - game scores (live scoreboard!), stats, news, and fantasy pick'em.

## Description

This was the final project for my Web Development bootcamp from Concordia Bootcamps - I had 2 weeks to create it, from conception to working prototype. The only requirements were that it had to be a *full-stack* application, and no style libraries could be used.

The frontend was created entirely in React, while the backend uses Node, Express, and Firebase (Firestore, Cloud Functions, and Authentication).

Multiple APIs were used to fetch all of the necessary data - because I was trying to use free APIs, I had to use a different one for news stories, game scores and stats, **live** game scores, highlight videos, and betting odds.

## Features

**Mobile-first Design**

![TipOff 4-19-2022 11-05-00 PM](https://user-images.githubusercontent.com/97937045/166638779-5fdaf899-a456-4175-90ca-51754382da3a.png)

The app was designed with the mobile user in mind. The home page (seen above) is simple and to the point, showing the user the most important things - the current day's games/scores (if a game is live). A hamburger button drops the navigation links down on click, and the dates at the top can be cycled through to see past scores, or upcoming games.

![TipOff 4-22-2022 3-32-03 PM](https://user-images.githubusercontent.com/97937045/166639836-66c41cf2-1532-40af-8c8d-a3e7880bdee7.png)

Here we can see the tablet-sized layout - hamburger button navigation turns into icon links, 2 more dates are added to the top bar, and team icons are now displayed alongside their names on the scoreboard.

![TipOff 4-22-2022 3-32-51 PM](https://user-images.githubusercontent.com/97937045/166639991-4394dac6-06fe-4eb3-bf14-18ad69e203a9.png)

And finally the full-sized layout. Icon navigation links have turned into more descriptive words, _another_ 2 dates are added, and the news and fantasy leaderboard are now displayed on the home page, bordering the scoreboard.

**News!**

News stories come from GNews - clicking on a headline will then display the subheader and an image. Click it again to read a longer preview of the article, and finally if the story really interests you, a _third_ click will take you to the source on an external site. Clicking anywhere else will colapse that story.

**Stats!**

Clicking on a game once will drop down a small box displaying the leading performers from each team (provided the game is either finished or currently in-progress). Clicking again will drop down a larger box with two tabs, as can be seen in the full-sized screenshot above - by default, you will see more detailed stats for every player on either team, with the option to tab over to see youtube highlights (which get embedded and collected after the game is over via the Youtube API).

**Fantasy!**

Users have the ability to create an account (email and password authentication is handled through Firebase Authentication - user details, such as email address and username, get stored in the Firestore database). This allows users to participate in the Fantasy Pick'em section, where they can try to guess who will win upcoming games, and by how much. The odds (spreads for each team, and over/under for the game total) are taken from the Cloudbet API, and when the user makes their picks they get stored in the database. Once the game starts, picks are no longer able to be made or updated, and once it ends, the server compares the final score to all the picks made and assigns points for correct guesses. The scoreboard (seen on the right side of the full-screen display) shows the current tally, with the signed in user higlighted in gold. The "Y" column is just the tally from the previous day.

**Schedules!**

Want to know what games were played on Christmas day? Who won the first game of the season? How many points did your favourite team score last week? You could cycle through the dates with the date bar at the top of the homepage, but to jump to a date further away in time the "Schedule" page is much quicker. To reduce calls to the API, it first looks for game data in the database - if it can't find any, _then_ it makes a request to the BallDontLie API (and saves the results it gets in the database for future requests).

**Standings!**

While the Standings page was dynamic and getting its data from an API, with the end of the season (and therefore, the standings being locked in place), it now gets its data from a local json file. Teams can be sorted by Division, Conference or League.

**Light/Dark Mode!**

Finally, a button to toggle between a dark and light colour theme can be found at the bottom of the navigation links. The user's selection is saved in local storage, so it will persist between reloads of the site (all screenshots here are using dark mode). 
