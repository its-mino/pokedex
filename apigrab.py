import pokepy

client = pokepy.V2Client(cache='in_memory')

file = open('pokemon.sql', 'w')

file.write('Drop table if exists Pokemon;\n'+
		   'CREATE TABLE Pokemon (\n'+
		   'Name varchar(100) NOT NULL,\n'+
		   'Type1 varchar(100) NOT NULL,\n'+
		   'Type2 varchar(100) NOT NULL,\n'+
		   'Speed int(10) NOT NULL,\n'+
		   'SpecialDefense int(10) NOT NULL,\n'+
		   'SpecialAttack int(10) NOT NULL,\n'+
		   'Defense int(10) NOT NULL,\n'+
		   'Attack int(10) NOT NULL,\n'+
		   'HP int(10) NOT NULL,\n'+
		   'Evo1 varchar(100) NOT NULL,\n'
		   'Level1 varchar(10),\n'
		   'Evo2 varchar(100) NOT NULL,\n'
		   'Level2 varchar(10),\n'
		   'Evo3 varchar(100) NOT NULL,\n'
		   'Sprite varchar(100) NOT NULL\n'+
		   ');\n')

for i in range(1,808):
	pokemon = client.get_pokemon(i)
	file.write('INSERT INTO Pokemon VALUES(\''+pokemon[0].name+'\', ')
	file.write('\''+pokemon[0].types[0].type.name+'\'')
	if len(pokemon[0].types) > 1:
		file.write(', \''+pokemon[0].types[1].type.name+'\', ')
	else:
		file.write(', \'\', ')
	file.write(str(pokemon[0].stats[0].base_stat)+','+str(pokemon[0].stats[1].base_stat)+','+str(pokemon[0].stats[2].base_stat)+','+str(pokemon[0].stats[3].base_stat)+','+str(pokemon[0].stats[4].base_stat)+','+str(pokemon[0].stats[5].base_stat)+',')
	species = client.get_pokemon_species(i)
	species_id = species[0].evolution_chain.url.split('/')[-2]
	chain = client.get_evolution_chain(species_id)[0].chain
	file.write('\''+chain.species.name+'\',')
	if('evolves_to' in dir(chain)):
		if(len(chain.evolves_to) > 0):
			file.write('\''+str(chain.evolves_to[0].evolution_details[0].min_level)+'\',')
			chain = chain.evolves_to[0]
			file.write('\''+chain.species.name+'\',')
			if('evolves_to' in dir(chain)):
				if(len(chain.evolves_to) > 0):
					file.write('\''+str(chain.evolves_to[0].evolution_details[0].min_level)+'\',')
					chain = chain.evolves_to[0]
					file.write('\''+chain.species.name+'\',')
				else:
					file.write('NULL,\'\',')
			else:
				file.write('NULL,\'\',')
		else:
			file.write('NULL,\'\',NULL,\'\',')
	else:
		file.write('NULL,\'\',NULL,\'\',')
	file.write('\'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+str(i)+'.png\');\n')

	file.write('DROP table if exists `'+pokemon[0].name+'_moves`;\n'+
			   'CREATE TABLE `'+pokemon[0].name+'_moves` (\n'+
			   'Name varchar(100) NOT NULL,\n'+
			   'LevelLearned varchar(10)\n'+
			   ');\n')

	for move in pokemon[0].moves:
		if move.version_group_details[0].level_learned_at == 0:
			if move.version_group_details[0].move_learn_method.name == 'egg':
				move.version_group_details[0].level_learned_at = '\'Egg\''
			elif move.version_group_details[0].move_learn_method.name == 'machine':
				move.version_group_details[0].level_learned_at = '\'TM or HM\''
			elif move.version_group_details[0].move_learn_method.name == 'tutor':
				move.version_group_details[0].level_learned_at = '\'Tutor\''
			else:
				move.version_group_details[0].level_learned_at = '\'Event\''
		file.write('INSERT INTO `'+pokemon[0].name+'_moves`'+' VALUES(\''+move.move.name+'\','+str(move.version_group_details[0].level_learned_at)+');\n')

file.close()
