#########################################################################
# File Name: comment_extraction.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-12 04:33:30
# Description: This script is used to extract comments.
#########################################################################

import json

input_filename = '../../../Data/comments_0000000000%02d'
authors = dict()

selected_comments = list()
for idx in range(0, 32):
	print idx
	for line in open(input_filename%(idx)):
		item = json.loads(line)
		if 'text' in item and len(item['text'])<50:
			selected_comments.append(item['text'])
	print len(selected_comments)
	break


authors = sorted([(x, authors[x]) for x in authors], key = lambda x:-x[1])
fout = open('../../../Data/selected_comments.json', 'w')
fout.write(json.dumps(selected_comments) + '\n')
fout.close()
