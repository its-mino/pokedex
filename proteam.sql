Drop table if exists proteam;

CREATE TABLE proteam (
PlayerName varchar(100) NOT NULL,
Ranking varchar(100) NOT NULL,
Pokemon1 varchar(100) NOT NULL,
Pokemon2 varchar(100) NOT NULL,
Pokemon3 varchar(100) NOT NULL,
Pokemon4 varchar(100) NOT NULL,
Pokemon5 varchar(100) NOT NULL,
Pokemon6 varchar(100) NOT NULL
);

INSERT INTO proteam VALUES('Toler Webb' , 'Masters Div Champion', 'landorus', 'amoonguss', 'politoed' , 'aegislash', 'thundurus', 'gardevoir');
INSERT INTO proteam VALUES('Raphael Bagara' , 'Masters Div Runner-Up', 'gardevoir', 'amoonguss', 'heatran' , 'scrafty', 'landorus', 'thundurus');
INSERT INTO proteam VALUES('Aaron Zheng' , 'Masters Div Semi-Finalist', 'rotom', 'landorus', 'amoonguss' , 'salamence', 'tyranitar', 'aegislash');
INSERT INTO proteam VALUES('Blake Hopper' , 'Masters Div Semi-Finalist', 'charizard', 'conkeldurr', 'sylveon' , 'aegislash', 'landorus', 'thundurus');
INSERT INTO proteam VALUES('Angel Miranda' , 'Masters Div Top 8', 'aegislash', 'landorus', 'tyranitar' , 'charizard', 'jellicent', 'sylveon');
INSERT INTO proteam VALUES('Wolfe Glick' , 'Masters Div Top 8', 'kangaskhan', 'heatran', 'landorus' , 'thundurus', 'amoonguss', 'milotic');
INSERT INTO proteam VALUES('Hayden McTavish' , 'Masters Div Top 8', 'rotom', 'salamence', 'heatran' , 'aegislash', 'cresselia', 'conkeldurr');
INSERT INTO proteam VALUES('Alex Underhill' , 'Masters Div Top 8', 'excadrill', 'gastrodon', 'cresselia' , 'salamence', 'rotom', 'tyranitar');
