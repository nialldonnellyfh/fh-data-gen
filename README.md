# fh-data-gen
Large data generator for mongodb clusters
Using dummy json to produce large datasets.

###Endpoints

`GET /user`
Return single document

`GET /user/generate?numberOfRecords=?`
Inserts data into database (numberOfRecords - number of entries to insert to database) 

##### Params
_numberOfRecords_
- Ratio: number=1000 ~== 4GB of data
- Default value = 1
- Max numberOfRecords = 4000
