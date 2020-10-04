DROP TABLE IF EXISTS Ambulance;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Board;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Hospital;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS Comments;

CREATE TABLE Ambulance
(
    `Ambulance_No`    INT            NOT NULL    AUTO_INCREMENT,
    `Ambulance_Name`  VARCHAR(50)    NOT NULL,
    `Addr`            VARCHAR(45)    NULL,
    `Tel`             VARCHAR(45)    NULL,
    `Home_Page`        VARCHAR(45)    NULL,
    `Count`           VARCHAR(45)    NULL,
    PRIMARY KEY (Ambulance_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE Reservation
(
    `Reservation_No`   INT             NOT NULL    AUTO_INCREMENT,
    `Reservation_Type` VARCHAR(20)     NULL,
    `Date`             VARCHAR(50)     NULL,
    `Price`            VARCHAR(20)     NULL,
    `Prescription`     VARCHAR(100)    NULL,
    `User_No`          INT             NULL,
    `Doctor_No`        INT             NULL,
    `Ambulance_No`     INT             NULL,
    PRIMARY KEY (Reservation_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE Board
(
    `Board_No`       INT             NOT NULL    AUTO_INCREMENT,
    `Title`          VARCHAR(100)    NULL,
    `Content`        VARCHAR(300)    NULL,
    `Creation_Date`  DATE            NULL,
    `Category`       VARCHAR(20)     NULL,
    `Med_Category`   VARCHAR(20)     NULL,
    `Customer_Category`   VARCHAR(20)     NULL,
    `Question_Category`   VARCHAR(20)     NULL,
    `User_No`        INT             NULL,
    `Hospital_No`    INT             NULL,
    `Click`          INT             NULL,
    PRIMARY KEY (Board_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE User
(
    `User_No`           INT             NOT NULL    AUTO_INCREMENT,
    `User_Id`           VARCHAR(50)     NOT NULL,
    `Name`              VARCHAR(20)     NULL,
    `Password`          VARCHAR(20)     NOT NULL,
    `Phone`             VARCHAR(30)     NULL,
    `Admin_Check`       INT             NULL,
    `Email`             VARCHAR(50)     NULL,
    `Birthday`          VARCHAR(20)     NULL,
    `History`           VARCHAR(150)    NULL,
    PRIMARY KEY (User_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE Hospital
(
    `Hospital_No`      INT             NOT NULL    AUTO_INCREMENT,
    `Business_Status`  VARCHAR(10)     NULL,
    `Tel`              VARCHAR(20)     NULL,
    `Addr`             VARCHAR(255)    NULL,
    `Hospital_Name`    VARCHAR(50)     NULL,
    `Latitude`         double          NULL,
    `Longitude`        double          NULL,
    `Hospital_Type`    VARCHAR(20)     NULL,
    `Medical_People`   INT             NULL,
    `Hospital_Room`    INT             NULL,
    `Hospital_Bed`     INT             NULL,
    `Hospital_Area`    VARCHAR(20)     NULL,
    `Type_Detail`      VARCHAR(255)    NULL,
    `Business_License_Number`       VARCHAR(20)     NOT NULL,
    PRIMARY KEY (Hospital_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE Doctor
(
    `Doctor_No`       INT             NOT NULL    AUTO_INCREMENT,
    `Doctors_License` VARCHAR(10)     NOT NULL,
    `Doctor_Name`     VARCHAR(5)      NOT NULL,
    `Hospital_Name`   VARCHAR(200)     NULL,
    `Position`        VARCHAR(20)     NULL,
    `Detail_Data`     VARCHAR(255)    NULL,
    `Specialized`     VARCHAR(255)    NULL,
    `Medical_Subject`  VARCHAR(100)   NULL,
    `Birthday`        VARCHAR(20)     NULL,
    `Hospital_No`     INT             NULL,
    PRIMARY KEY (Doctor_No)
)default character set utf8 collate UTF8_GENERAL_CI;
CREATE TABLE Comments
(
    `Comments_No`     INT             NOT NULL    AUTO_INCREMENT,
    `Content`         VARCHAR(255)    NULL,
    `Creation_Date`   DATE            NULL,
    `Board_No`        INT             NULL,
    `Comments_Reply`  VARCHAR(255)    NULL,
    `Sequence_No`     INT             NULL,
    PRIMARY KEY (Comments_No)
)default character set utf8 collate UTF8_GENERAL_CI;
