#########################################################################
# File Name: generate_feature.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-12 05:08:24
# Description: This script is used to generate function word feature for comments.
#########################################################################

import json

input_filename = '../../Data/UsefulComments.json'
words = ['a', 'an', 'the', 'of', 'in', 'on', 'and', 'but', 'if', 'before', 'from', 'oh', 'hey', 'with', 'or', 'for', 'to']
feature = dict()

fin = open('../../Data/authorinfo.json')
authors = list()
for line in fin:
	authors.append(json.loads(line)[0])
fin.close()
authors = authors[:50]

fout = open('../../Data/UserFeatures.json', 'w')
cnt = 0
for line in open(input_filename):
	item = json.loads(line)
	curr_feature = dict()
	cnt += 1
	if cnt % 10000 == 0:
		print cnt
	if item['author'] not in authors:
		continue
	if 'text' in item:
		for w in item['text'].split():
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
		if not item['author'] in feature:
			feature[item['author']] = list()
		output_feature = [0 for x in range(len(words))]
		for i in range(len(words)):
			if words[i] not in curr_feature:
				output_feature[i] = 0
			else:
				output_feature[i] = float(curr_feature[words[i]]) # / len(item['text'].split())
		fout.write(item['author'] + '\n')
		fout.write(json.dumps(output_feature) + '\n')

fout.close()

