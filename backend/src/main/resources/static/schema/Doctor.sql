CREATE TABLE Doctor
(
    `Doctor_No`       INT             NOT NULL    AUTO_INCREMENT,
    `Doctors_License` VARCHAR(10)      NOT NULL,
    `Doctor_Name`     VARCHAR(5)      NOT NULL,
    `Hospital_Name`   VARCHAR(20)     NULL,
    `Position`        VARCHAR(20)     NULL,
    `Detail_Data`     VARCHAR(255)    NULL,
    `Specialized`     VARCHAR(255)    NULL,
    `Medical_Subject`  VARCHAR(20)     NULL,
    `Birthday`        VARCHAR(20)     NULL,
    `Hospital_No`     INT                    NULL,
    PRIMARY KEY (Doctor_No)
)default character set utf8 collate UTF8_GENERAL_CI;