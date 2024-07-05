-- Active: 1716465236302@@127.0.0.1@3306
USE  pomodoro;

CREATE TABLE `Users` (
  `UserID` int PRIMARY KEY AUTO_INCREMENT,
  `Username` varchar(255),
  `Password` varchar(255),
  `Email` varchar(255)
);

CREATE TABLE `Pomodoro` (
  `PomodoroID` int PRIMARY KEY AUTO_INCREMENT,
  `UserID` int,
  `TaskID` int,
  `HabitID` int,
  `StartTime` timestamp DEFAULT CURRENT_TIMESTAMP,
  `EndTime` timestamp NULL,
  `IsCompleted` boolean DEFAULT FALSE
);

CREATE TABLE `HabitRecords` (
  `RecordID` int PRIMARY KEY AUTO_INCREMENT,
  `HabitID` int,
  `PomodoroID` int,
  `Date` date,
  `IsCompleted` boolean DEFAULT FALSE
);

CREATE TABLE `Tasks` (
  `TaskID` int PRIMARY KEY AUTO_INCREMENT,
  `UserID` int,
  `Content` varchar(255),
  `CreateTime` timestamp DEFAULT CURRENT_TIMESTAMP,
  `IsCompleted` boolean DEFAULT FALSE
);

CREATE TABLE `Habits` (
  `HabitID` int PRIMARY KEY AUTO_INCREMENT,
  `UserID` int,
  `Name` varchar(255),
  `CreateTime` timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `Pomodoro` ADD FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

ALTER TABLE `Pomodoro` ADD FOREIGN KEY (`TaskID`) REFERENCES `Tasks` (`TaskID`);

ALTER TABLE `Pomodoro` ADD FOREIGN KEY (`HabitID`) REFERENCES `Habits` (`HabitID`);

ALTER TABLE `HabitRecords` ADD FOREIGN KEY (`HabitID`) REFERENCES `Habits` (`HabitID`);

ALTER TABLE `HabitRecords` ADD FOREIGN KEY (`PomodoroID`) REFERENCES `Pomodoro` (`PomodoroID`);

ALTER TABLE `Tasks` ADD FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

ALTER TABLE `Habits` ADD FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

ALTER TABLE `Pomodoro`
MODIFY `TaskID` int NULL,
MODIFY `HabitID` int NULL,
ADD `Type` varchar(10) DEFAULT NULL;
