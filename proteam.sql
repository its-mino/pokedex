Drop table if exists Proteam;

CREATE TABLE Proteam (
PlayerName varchar(100) NOT NULL,
Ranking varchar(100) NOT NULL,
Pokemon1 varchar(100) NOT NULL,
Pokemon2 varchar(100) NOT NULL,
Pokemon3 varchar(100) NOT NULL,
Pokemon4 varchar(100) NOT NULL,
Pokemon5 varchar(100) NOT NULL,
Pokemon6 varchar(100) NOT NULL
);

INSERT INTO Proteam VALUES('Toler Webb' , 'Masters Div Champion', 'landorus', 'amoonguss', 'politoed' , 'aegislash', 'thundurus', 'gardevoir');
INSERT INTO Proteam VALUES('Raphael Bagara' , 'Masters Div Runner-Up', 'gardevoir', 'amoonguss', 'heatran' , 'scrafty', 'landorus', 'thundurus');
INSERT INTO Proteam VALUES('Aaron Zheng' , 'Masters Div Semi-Finalist', 'rotom', 'landorus', 'amoonguss' , 'salamence', 'tyranitar', 'aegislash');
INSERT INTO Proteam VALUES('Blake Hopper' , 'Masters Div Semi-Finalist', 'charizard', 'conkeldurr', 'sylveon' , 'aegislash', 'landorus', 'thundurus');
INSERT INTO Proteam VALUES('Angel Miranda' , 'Masters Div Top 8', 'aegislash', 'landorus', 'tyranitar' , 'charizard', 'jellicent', 'sylveon');
INSERT INTO Proteam VALUES('Wolfe Glick' , 'Masters Div Top 8', 'kangaskhan', 'heatran', 'landorus' , 'thundurus', 'amoonguss', 'milotic');
INSERT INTO Proteam VALUES('Hayden McTavish' , 'Masters Div Top 8', 'rotom', 'salamence', 'heatran' , 'aegislash', 'cresselia', 'conkeldurr');
INSERT INTO Proteam VALUES('Alex Underhill' , 'Masters Div Top 8', 'excadrill', 'gastrodon', 'cresselia' , 'salamence', 'rotom', 'tyranitar');
