#########################################################################
# File Name: corpus_generation.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-11 20:05:19
# Description: This script is used to generate corpus for word embedding.
#########################################################################

import json
import codecs

input_filename_stories = '../../../Data/stories'
input_filename_comments = '../../../Data/comments_0000000000%02d'
input_filenames = [input_filename_stories]
input_filenames.extend([input_filename_comments%idx for idx in range(32)])
fout = codecs.open('../../../Data/corpus.txt', 'w', encoding='utf8')
error_cnt = 0
for input_filename in input_filenames:
	print input_filename, error_cnt
	for line in codecs.open(input_filename, encoding='utf8'):
		try:
			item = json.loads(line, encoding='utf8')
			if 'text' in item:
				fout.write(item['text'] + '\n')
		except:
			error_cnt += 1
fout.close()
