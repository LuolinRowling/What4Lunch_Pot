#########################################################################
# File Name: named_entity_recognition.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-11 10:51:04
# Description: This script is used to analyze documents by calling Google API.
#########################################################################
from google.cloud import language
import json

input_filename_stories = '../../../Data/stories'
output_filename_stories = '../../../Data/new_stories'

def main():
	client = language.Client()
	fout = open(output_filename_stories, 'w')
	doc_cnt = 0
	query_cnt = 0
	for line in open(input_filename_stories):
		doc_cnt += 1
		if doc_cnt % 10000 == 0:
			print doc_cnt, query_cnt
		item = json.loads(line)
		if 'title' not in item:
			fout.write(line)
			continue
		query_cnt += 1
		print query_cnt
		text_content = item['title']
		document = client.document_from_text(text_content)
		try:
			entity_response = document.analyze_entities()
		except:
			continue
		entities = list()
		for e in entity_response.entities:
			entities.append({'name':e.name, 
							 'type':e.entity_type,
							 'metadata':e.metadata,
							 'salience':e.salience})
		item['NEs'] = entities
		fout.write(json.dumps(item) + '\n')
		

if __name__ == '__main__':
	main()
