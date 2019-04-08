import pokepy

client = pokepy.V2Client(cache='in_memory')

file = open('pokemon.sql', 'w')

file.write('Drop table if exists Pokemon;\n')
file.write('CREATE TABLE Pokemon (\n')
file.write('Name varchar(100) NOT NULL,\n')
file.write('Type1 varchar(100) NOT NULL,\n')
file.write('Type2 varchar(100) NOT NULL,\n')
file.write('Speed int(10) NOT NULL,\n')
file.write('SpecialDefense int(10) NOT NULL,\n')
file.write('SpecialAttack int(10) NOT NULL,\n')
file.write('Defense int(10) NOT NULL,\n')
file.write('Attack int(10) NOT NULL,\n')
file.write('HP int(10) NOT NULL,\n')
file.write('Sprite varchar(100) NOT NULL\n')
file.write(');\n')

for i in range(1,808):
	pokemon = client.get_pokemon(i)
	file.write('INSERT INTO Pokemon VALUES(\''+pokemon[0].name+'\', ')
	file.write('\''+pokemon[0].types[0].type.name+'\'')
	if len(pokemon[0].types) > 1:
		file.write(', \''+pokemon[0].types[1].type.name+'\', ')
	else:
		file.write(', \'\', ')
	file.write(str(pokemon[0].stats[0].base_stat)+','+str(pokemon[0].stats[1].base_stat)+','+str(pokemon[0].stats[2].base_stat)+','+str(pokemon[0].stats[3].base_stat)+','+str(pokemon[0].stats[4].base_stat)+','+str(pokemon[0].stats[5].base_stat)+',')
	file.write('\'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+str(i)+'.png\');\n')
	print(pokemon[0].name)

file.close()
