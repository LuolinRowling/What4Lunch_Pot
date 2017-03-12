#########################################################################
# File Name: pca_literature.py
# Author: Haoyue Shi
# mail: freda.haoyue.shi@gmail.com
# Created Time: 2017-03-12 11:27:45
# Description: This script is used to PCA.
#########################################################################
import json
import numpy as np
import matplotlib
import matplotlib.pyplot as plt  

authors=['dickens','shakespear']

def zeroMean(dataMat):
	meanVal=np.mean(dataMat,axis=0)
	newData=dataMat-meanVal  
	return newData,meanVal  
			  
def pca(dataMat,n):  
	newData,meanVal=zeroMean(dataMat)  
	covMat=np.cov(newData,rowvar=0)
	eigVals,eigVects=np.linalg.eig(np.mat(covMat))
	eigValIndice=np.argsort(eigVals)
	n_eigValIndice=eigValIndice[-1:-(n+1):-1]
	n_eigVect=eigVects[:,n_eigValIndice]
	lowDDataMat=newData*n_eigVect
	reconMat=(lowDDataMat*n_eigVect.T)+meanVal
	return lowDDataMat,reconMat 


select_user_pairs = [(0,1)]
cnt = 0
for pair in select_user_pairs:
	authorlist = [authors[pair[0]], authors[pair[1]]]
	fin = open('../../Data/literature_feature.json')
	features = [[],[]]
	lines = fin.readlines()
	for i in xrange(0,len(lines),2):
		userName = lines[i].strip()
		vector = lines[i+1].strip()
		if userName not in authorlist:
			continue
		if userName == authorlist[0]:
			features[0].append(np.array(json.loads(vector)))
		else:
			features[1].append(np.array(json.loads(vector)))
	print len(features[0]), len(features[1])
	delta = 50
	all_features = features[0]
	all_features.extend(features[1])
	newData, meanVal = zeroMean(all_features)
	lowDDataMat, reconMat = pca(newData, 2)
	fin.close()
	cnt += 1
	f1 = plt.figure(cnt)
	split_point = len(all_features) - len(features[1])
	x = [float(x) for x in lowDDataMat[:,0]][:delta]
	y = [float(y) for y in lowDDataMat[:,1]][:delta]
	plt.scatter(x, y, c = 'b')
	x = [float(x) for x in lowDDataMat[:,0]][-delta:]
	y = [float(y) for y in lowDDataMat[:,1]][-delta:]
	plt.scatter(x, y, c = 'y')
	plt.show()	
