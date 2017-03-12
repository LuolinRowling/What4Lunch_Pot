#########################################################################
# File Name: topic2class.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-12 03:26:54
# Description: This script is used to match topic to class.
#########################################################################

import json


input_filename = '../../../Data/all_story_fea'
topics = dict()



item = json.loads(open('../../../Data/topic_tags').readline())
c = set()
for i in item:
	c.add(item[i])
print c
