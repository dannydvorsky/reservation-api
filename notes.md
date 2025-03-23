**Data:**

Column          Type            Description
id              INTEGER         Primary Key
merchant name   TEXT            Name of merchant
place name      TEXT            Name of place
table_number    INTEGER         Table number
people_count    INTEGER         Number of guests
note            TEXT            Note and extra requirements
date_time       TEXT            Reservation date/time in ISO for
customer_name   TEXT            Name of customer
customer_phone  TEXT            Contact phone
customer_email  TEXT            Contact email
created_at      TEXT            Timestamp of creation
status          TEXT            pending, active, canceled, completed


**Users table (for authentification)**

Column          Type            Description
id              INTEGER         Primary Key
username        TEXT            Unique username
password        TEXT            Hashed password