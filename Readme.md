# Real-time Reserved Seating Chart

## Demo

[http://seating-chart.v0rs4.com](http://seating-chart.v0rs4.com)


## Description

- Users can access a web app and see a grid of circles, representing stadium seats.
- They can select up to 10 seats from the grid. Other users visiting the app can see the seats update in real-time, as selections are made. 
- If the user exhausts their 10 seats, they have to click on their selected seats to deselect them. 
- Others can't reserve a seat that's already selected.


### Users see
* Seats (as circles):
    * Their selected seats in dark blue
    * Others selected seats in light blue
    * Available seats in gray
* Countdown of their selected seats out of 10
* A running tally of number of users online
* Zoom in and zoom out using mouse wheel

### Tech Stack

* Express
* Socket.io
* React
* Redux, Rematch
* React-Konva

### Up and Running
```sh
docker-composer up
```

and go to http://localhost:5000
