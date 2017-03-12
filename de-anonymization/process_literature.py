#########################################################################
# File Name: process_literature.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-12 11:14:48
# Description: This script is used to process literature.
#########################################################################

import json

files = ['../../Data/dickens.txt', '../../Data/shakespear.txt']
fout = open('../../Data/literature_feature.json', 'w')

words = ['a', 'an', 'the', 'of', 'in', 'on', 'and', 'but', 'if', 'before', 'from', 'oh', 'hey', 'with', 'or', 'for', 'to']

for filename in files: 
	author = filename[11:-4]
	print author
	buf = ''
	for line in open(filename):
		if len(line) < 2:
			if len(buf) < 50:
				buf = ''
				continue
			curr_feature = dict()
			for w in buf.split():
				word = w.lower()	
				if word[0]>'z' or word[0]<'a':
					if len(word) > 1:
						word = word[1:]
					else:
						continue
				if word[-1]>'z' or word[-1]<'a':
					if len(word) > 1:
						word = word[:-1]
					else:
						continue
				if word not in curr_feature:
					curr_feature[word] = 0
				curr_feature[word] += 1
			output_feature = [0 for x in range(len(words))]
			for i in range(len(words)):
				if words[i] not in curr_feature:
					output_feature[i] = 0
				else:
					output_feature[i] = float(curr_feature[words[i]])# / len(buf.split())
			fout.write(author + '\n')
			fout.write(json.dumps(output_feature) + '\n')
			buf = ''
		buf += ' ' + line.strip()
		
fout.close()

