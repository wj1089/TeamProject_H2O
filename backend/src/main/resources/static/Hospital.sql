CREATE TABLE Hospital
(
    `Hospital_No`                   INT             NOT NULL       AUTO_INCREMENT,
    `Hospital_Name`                 VARCHAR(20)     NOT NULL,
    `business_License_Number`       VARCHAR(20)     NOT NULL,
    `Logo`                          VARCHAR(255)    NULL,
    `Addr`                          VARCHAR(50)    NULL,
    `Hospital_Type`                  VARCHAR(10)     NULL,
    `Medical_Person`                 VARCHAR(5)      NULL,
    `Tel`                           VARCHAR(15)     NULL,
    `Latitude`                      VARCHAR(10)     NULL,
    `Longitude`                     VARCHAR(10)     NULL,
    PRIMARY KEY (Hospital_No)
)default character set utf8 collate UTF8_GENERAL_CI;