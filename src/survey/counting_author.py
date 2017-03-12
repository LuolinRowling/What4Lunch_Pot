#########################################################################
# File Name: counting_author.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-10 16:32:15
# Description: This script is used to count author and their comment number.
#########################################################################

import json

input_filename = '../../../Data/comments_0000000000%02d'
authors = dict()

for idx in range(0, 32):
	print idx
	for line in open(input_filename%(idx)):
		item = json.loads(line)
		if 'author' not in item:
			continue
		if item['author'] not in authors:
			authors[item['author']] = 0
		authors[item['author']] += 1


authors = sorted([(x, authors[x]) for x in authors], key = lambda x:-x[1])
fout = open('../../../Data/authorinfo.json', 'w')
for item in authors:
	fout.write(json.dumps(item) + '\n')
fout.close()
