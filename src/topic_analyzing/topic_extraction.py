#########################################################################
# File Name: topic_extraction.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-11 11:56:46
# Description: This script is used to extract topics from the crawled NEs.
#########################################################################

import json
import pickle

input_filename_stories = '../../../Data/new_stories'

topic_count = dict()

for line in open(input_filename_stories):
	try:
		item = json.loads(line)
	except:
		print 'Error'
		break
	if 'NEs' not in item:
		continue
	entities = item['NEs']
	for e in entities:
		if e['type'] != 'OTHER' and e['salience'] > 0.3:
			try:
				name = str(e['name'].lower())
				if 'a' <= name[0] <= 'z':
					name = chr(ord(name[0]) + ord('A') - ord('a')) + name[1:]
			except:
				continue
			if name not in topic_count:
				topic_count[name] = 0
			topic_count[name] += 1
print sorted([(x,topic_count[x]) for x in topic_count], key = lambda x:-x[1])

writer = open('hot_topic', 'wb');
pickle.dump(topic_count, writer);
writer.close();
print len(topic_count)
