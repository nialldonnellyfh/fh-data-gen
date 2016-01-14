# fh-data-gen
Large data generator for mongodb clusters
Using dummy json to produce large datasets.

###Endpoints

`GET /user`
Get random user;

`GET /user/generate?numberOfRecords=?`
Inserts data into database (numberOfRecords - number of entries to insert to database) 

###Development

Local development/testing
`env FH_USE_LOCAL_DB=true node application.js`

or if love grunt:

`grunt serve` 