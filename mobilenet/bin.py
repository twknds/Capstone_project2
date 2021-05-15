import json

from MobileNetV2 import mobilenet_v2
import torch
import torchvision
import numpy as np
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import sys
import torchvision.models as models
import torchsummary

if torch.cuda.is_available():
    device = torch.device('cuda')
else:
    device = torch.device('cpu')

# with open("C:/Users/hyuno/Desktop/data/bin.json") as f:
#     labels = json.load(f)

net = models.MobileNetV2(num_classes=2)
print(net.eval())

# data_transform = {
#     'train' : transforms.Compose([
#         transforms.RandomSizedCrop(224),
#         transforms.RandomHorizontalFlip(),
#         transforms.ToTensor(),
#         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
#     ]),
#
# }

#
# datasetPath = 'C:/Users/hyuno/Desktop/data'
#
# img = Image.open(datasetPath+'/'+'3.jpg')
# print(img)
#
# data_transform = transforms.Compose([transforms.Resize((224, 224)), transforms.ToTensor()])
# img_t = data_transform(img).unsqueeze(0)
# print(img_t.size())
#
# with torch.no_grad():
#     predict = net(img_t)
#
# print('class : {}' .format(labels[predict.argmax()]))
#
#
# print(len(predict))
