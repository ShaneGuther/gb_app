# gb_app
Golf Buddy is a react native application that was created to store the user's golf scores in an easy access format. As a golfer myself at the end of a season I'll have a stack of scorecards which are a hassle to keep track of, Golf Buddy allows the user to easily store the scores from their golf rounds to reflect on later as well as easily viewing stats about their game.  The app does not currently use a real handicap scoring system but it is in the works and a simple average score is displayed on the stats screen.

Future features to be added are a USGA handicap calculation, a distance measurment using the native phone featues and club distance storage.

The app provides a way to add information about a round of golf such as the course, score, weather, greens in regulation and fairways hit.
A mapview component is also available to see where each course played is located.

The app uses firebase authentication for logging in, and a firestore db to store all data for users.
Other libraries include google places autocomplete to select a valid golf course, picker select for some inputs, and a mapview component to display the location of the golf course.

<img width="279" alt="Screen Shot 2023-02-21 at 12 07 50 PM" src="https://user-images.githubusercontent.com/46198789/220709192-e2e9fc54-d5ff-4072-8235-5b0b5c05110a.png"><img width="279" alt="Screen Shot 2023-02-21 at 12 07 50 PM" src="https://user-images.githubusercontent.com/46198789/220709273-c2e55d1b-7008-43d9-90a9-0894eb4f8797.png">
<img width="279" alt="Screen Shot 2023-02-21 at 12 08 17 PM" src="https://user-images.githubusercontent.com/46198789/220709284-628583eb-3fd6-469a-9817-d2180f9eb292.png"><img width="279" alt="Screen Shot 2023-02-21 at 12 08 29 PM" src="https://user-images.githubusercontent.com/46198789/220709729-cfde336f-6c3e-4129-9282-494e1d3472be.png">
<img width="279" alt="Screen Shot 2023-02-21 at 12 10 21 PM" src="https://user-images.githubusercontent.com/46198789/220709750-f217de7d-304d-48f0-9228-969d40aa52c8.png">
<img width="279" alt="Screen Shot 2023-02-21 at 12 10 00 PM" src="https://user-images.githubusercontent.com/46198789/220709758-638c82d0-db99-4fe2-b141-d6aed3aecd6d.png">
<img width="279" alt="Screen Shot 2023-02-22 at 1 02 14 PM" src="https://user-images.githubusercontent.com/46198789/220716142-7c0d598c-af2e-4de8-be50-eeddb8de74f6.png">
<img width="279" alt="Screen Shot 2023-02-22 at 1 02 20 PM" src="https://user-images.githubusercontent.com/46198789/220716154-b921599b-0c70-4f80-a36a-49110e6ea11c.png">
<img width="279" alt="Screen Shot 2023-02-22 at 1 04 42 PM" src="https://user-images.githubusercontent.com/46198789/220716733-41751f24-1857-4b23-8372-1f218ca923e1.png">
* Working on solving a dependency issue with react-native-maps marker on map.
