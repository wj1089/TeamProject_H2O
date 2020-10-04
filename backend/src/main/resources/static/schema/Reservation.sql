CREATE TABLE Reservation
(
    `Reservation_No`   INT             NOT NULL    AUTO_INCREMENT,
    `Reservation_Type` BOOLEAN         NULL,
    `Date`             VARCHAR(50)     NULL,
    `Price`            VARCHAR(20)     NULL,
    `Prescription`     VARCHAR(100)    NULL,
    `User_No`          INT             NOT NULL,
    `Doctor_No`        INT             NOT NULL,
    `Ambulance_No`     INT             NOT NULL,
    PRIMARY KEY (Reservation_No)
)default character set utf8 collate UTF8_GENERAL_CI;