CREATE TABLE Comments
(
    `Comments_No`     INT             NOT NULL    AUTO_INCREMENT,
    `Content`         VARCHAR(255)    NULL,
    `Creation_Date`   VARCHAR(20)     NULL,
    `Board_No`        INT             NULL,
    `Comments_Reply`  VARCHAR(255)    NULL,
    `Sequence_No`     INT             NULL,
    PRIMARY KEY (Comments_No)
);