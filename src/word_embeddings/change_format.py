#########################################################################
# File Name: change_format.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-11 23:26:20
# Description: This script is used to change vector format.
#########################################################################

from gensim.models.keyedvectors import KeyedVectors
import json

filename = 'vectors.bin'
fin = open(filename)
n, m = fin.readline().strip().split()
n = int(n)
m = int(m)
output = dict()
for i in range(n / 10):
	try:
		line = fin.readline().strip().split()
		word = line[0]
		vector = [float(x) for x in line[1:]]
		output[word] = vector
		if (i + 1) % 10000 == 0:
			print i + 1
	except:
		print i + 1

fout = open('vectors.json','w')
fout.write(json.dumps(output) + '\n')
fout.close()
