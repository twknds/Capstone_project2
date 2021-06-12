import ipywidgets
import traitlets
import ipywidgets.widgets as widgets
from IPython.display import display
import Robot
from uuid import uuid1
import os
import json
import glob
import datetime
import numpy as np
import cv2
import time
from jetcam.csi_camera import CSICamera

DATASET_DIR = 'dataset_xy'

try:
    os.makedirs(DATASET_DIR)
except FileExistsError:
    print('디렉토리가 존재합니다')

camera = CSICamera(width=224, height=224) #camera open

widget_width = camera.width
widget_height = camera.height

image_widget = widgets.Image(format='jpeg', width=widget_width, height=widget_height)
target_widget = widgets.Image(format='jpeg', width=widget_width, height=widget_height)

x_slider = widgets.FloatSlider(min=-1.0, max=1.0, step=0.001, description='x')
y_slider = widgets.FloatSlider(min=-1.0, max=1.0, step=0.001, description='y')

def bgr8_to_jpeg(value, quality=75):
    return bytes(cv2.imencode('.jpg', value)[1])

def display_xy(camera_image):
    image = np.copy(camera_image)
    x = x_slider.value
    y = y_slider.value
    x = int(x * widget_width / 2 + widget_width / 2)
    y = int(y * widget_height / 2 + widget_height / 2)
    image = cv2.circle(image, (x, y), 8, (0, 255, 0), 3)
    image = cv2.circle(image, (widget_width / 2, widget_height), 8, (0, 0, 255), 3)
    image = cv2.line(image, (x, y), (widget_width / 2, widget_height), (255, 0, 0), 3)
    jpeg_image = bgr8_to_jpeg(image)
    return jpeg_image

time.sleep(1)
traitlets.dlink((camera, 'value'), (image_widget, 'value'), transform=bgr8_to_jpeg)
traitlets.dlink((camera, 'value'), (target_widget, 'value'), transform=display_xy)

display(widgets.HBox([image_widget, target_widget]), x_slider, y_slider)

# controller로 dataset을 수집하기 위해 controller widget 생성
controller = widgets.Controller(index=0)

display(controller)

# x,y 좌표를 수집하기 위해 display된 위젯과 link함
widgets.jsdlink((controller.axes[2], 'value'), (x_slider, 'value'))
widgets.jsdlink((controller.axes[3], 'value'), (y_slider, 'value'))

DATASET_DIR = 'dataset_xy'

# 데이터셋 임의 삭제를 방지함
try:
    os.makedirs(DATASET_DIR)
except FileExistsError:
    print('Directories not created because they already exist')

for b in controller.buttons:
    b.unobserve_all()

count_widget = widgets.IntText(description='count', value=len(glob.glob(os.path.join(DATASET_DIR, '*.jpg'))))

# x, y 좌표
def xy_uuid(x, y):
    return 'xy_%03d_%03d_%s' % (x * widget_width / 2 + widget_width / 2, y * widget_height / 2 + widget_height / 2, uuid1())

def save_snapshot(change):
    if change['new']:
        uuid = xy_uuid(x_slider.value, y_slider.value)
        image_path = os.path.join(DATASET_DIR, uuid + '.jpg')
        with open(image_path, 'wb') as f:
            f.write(image_widget.value)
        count_widget.value = len(glob.glob(os.path.join(DATASET_DIR, '*.jpg')))

# 컨트롤러 버튼을 눌러서 데이터셋 수집
controller.buttons[9].observe(save_snapshot, names='value')

display(widgets.VBox([
    target_widget,
    count_widget
]))