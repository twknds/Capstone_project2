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

if torch.cuda.is_available():
    device = torch.device('cuda')
else:
    device = torch.device('cpu')

with open("C:/Users/hyuno/Desktop/data/label.json") as f:
    labels = json.load(f)

# with open("C:/Users/hyuno/Desktop/data/coco.json") as f:
#     labels = json.load(f)

net = mobilenet_v2(pretrained=True)
print(net.eval())

datasetPath = 'C:/Users/hyuno/Desktop/data'

img = Image.open(datasetPath+'/'+'3.jpg')
print(img)

data_transform = transforms.Compose([transforms.Resize((224, 224)), transforms.ToTensor()])
img_t = data_transform(img).unsqueeze(0)
print(img_t.size())

with torch.no_grad():
    predict = net(img_t)

print('class : {}' .format(labels[predict.argmax()]))


print(len(predict))
# Image.fromarray(img.mul(255).permute(1,2,0).byte().numpy())