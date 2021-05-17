# How The System Works

- The whole working system is under the `src` folder in this repository, only this `ReportingBackend` and `keycloak configuration` have useful items for the reporting system. The other repositories are junk created by accident. (double check before deleting, keycloak is not yet connected to this system do not delete that).
- `send.js` and `receive.js` in `SubProcesses` folder (this is under src directory):
    - `node ./SubProcesses/send` will send messages to the message queue (2 queues: inventory and guestinfo). Ctrl c to terminate after it sends.

    - `receive.js` starts when the whole system starts.
        - listens the whole time system runs for new messages on the queue.
        - when new messages on queue, receive pulls these messages off the queue. It then sends the JSON object to the `insert.js` module.
    - `insert.js` gets the JSON object from receive.js and inserts it into the mongoDB database.
      -Inserted into two collections: `inventory` and `guestinfo`.

- `index.js` is the entry point of the system. This file has a few functionalities to it.
    - listens on `localhost:3000`
    - fires the receive.js file
    - fires the endpoints.js file
    - has two HTTP get methods, one for the main site on `localhost:3000/`, and one for a report request.
        - Requesting a report: on the main site, input the start and end date for the date range of the report.
          -Once submit is pressed a query string is sent through the url to the `/report` endpoint in the `endpoints.js` file.
          -The query strings are then retrieve from the url in the endpoint and sent over to the `report.js` file
- `report.js` is the file which creates the CSV report. This file has makeReport(QS, QS) function that is the entrypoint and takes the two query strings from the endpoints.
    - Once the query strings are retrieved, they are then turned into ISO dates and sent to the two methods that gather the object arrays of the data in each mongodb collection. (method names are understandable).
    - Then the object arrays are sent to the `matchKey` method that combines the inventory and guest objects with the same keys. This will put guests and their order data into one object. 
    - The object array is then turned into a string with CSV format. 
    - Then the string is to create a CSV file which is stored in the CSV folder.
    
-Once the operations in report.js are done, the endpoint responds with a download of the csv file in the `CSV` folder.

# How To Improve The System

- Edit the age array for in the combined object array to show age ranges specified in the report spec document.
    - These ages are listed under `household: ` in the object.

    - Current ages are separated by commas. Since they are in a CSV, this will mess up the report.

    - Suggestion: make nested object such as: `{household: {age 1-21: 2, age 22-40: 1}}` where 2 and 1 are the count of each person in that range.

        - Current method to turn object array into CSV does not convert nested objects. You will have to edit the method if you use the suggestion above to turn nested objects into CSV as well.

- Dockerize the whole system. 
- Edit `openapi.yaml` to have the right response schema.
- Connect with keycloak system. 
