import time
import cv2
import cvzone
import numpy as np
from PoseModule import PoseDetector

cap = cv2.VideoCapture(0)

detector = PoseDetector()
ptime = 0
ctime = 0
color = (255, 255, 255)
BgColor = (132, 123, 102)

dir =  0
push_ups = 0


while True:

    _, img = cap.read()
    img = cv2.flip(img, 1)
    img = detector.findPose(img)
    lmlst, bbox = detector.findPosition(img,draw=False)
    if lmlst:
        #Detect Arms Points
        a1 = detector.findAngle(img, 12, 14, 16)
        a2 = detector.findAngle(img, 15, 13, 11)
        #Detect Back Points
        a3 = detector.findAngle(img, 12, 24, 26)
        #Detect Arms Points
        a4 = detector.findAngle(img, 14, 12, 24)
        a5 = detector.findAngle(img, 23, 11, 13)

        #Detect between what values the muscle has to move to give out a percentage 
        per_val1 = int(np.interp(a1, (85, 175), (100, 0)))
        per_val2 = int(np.interp(a2, (85, 175), (100, 0)))
        per_val3 = int(np.interp(a3, (230, 300), (300, 0)))
        per_val4 = int(np.interp(a4, (230, 300), (100, 0)))
        per_val5 = int(np.interp(a5, (230, 300), (100, 0)))

        bar_val1 = int(np.interp(per_val1, (0, 100),(40+460,150)))
        bar_val2 = int(np.interp(per_val2, (0, 100), (40 + 460, 150)))
        bar_val3 = int(np.interp(per_val3, (0, 300), (40 + 350, 40)))
        bar_val4 = int(np.interp(per_val4, (0, 100), (40 + 350, 40)))
        bar_val5 = int(np.interp(per_val5, (0, 100), (40 + 350, 40)))
        print(per_val5)
        # 1st Bar
        # Fill
        cv2.rectangle(img, (570+640, bar_val2), (570+640 + 35, 150 + 350), color, cv2.FILLED)
        # Border
        cv2.rectangle(img, (1210,150),(1210+35,150+350),(),2)
        # 2nd Bar
        # Fill
        cv2.rectangle(img, (35, bar_val1), (35 + 35, 150 + 350), color, cv2.FILLED)
        # Border
        cv2.rectangle(img, (35, 150), (35 + 35, 150 + 350), (), 2)

        # Bar Percentages
        cvzone.putTextRect(img, f'{per_val1} %', (30, 120), 1.1, 2, colorT=(255, 255, 255), colorR=(BgColor))
        cvzone.putTextRect(img, f'{per_val2} %', (1200, 120), 1.1, 2, colorT=(255, 255, 255), colorR=(BgColor))

        # count push ups
        if per_val1 == 100 and per_val2 == 100:
            if dir == 0:
                push_ups += 1
                dir = 1
                color = (0, 255, 0)
        elif per_val1 == 0 and per_val2 == 0:
            if dir == 1:
                push_ups += 0
                dir = 0
                color = (0, 255, 0)
        else:
            color = (255, 255, 255)
        
        # Name label & counter
        cvzone.putTextRect(img, f'Push Ups: {int(push_ups)}/20', (440, 60), 3, 2, colorT=(255, 255, 255), colorR=(BgColor))
        cvzone.putTextRect(img,'Left Arm', (43, 600+80), 3, 2, colorT=(255, 255, 255), colorR=(BgColor))
        cvzone.putTextRect(img,'Right Arm', (985, 600+80), 3, 2, colorT=(255, 255, 255), colorR=(BgColor))

        # Back feedback
        if per_val3 <= 290:
            cvzone.putTextRect(img, f'Keep your back straight', (430, 110), 2, 2, colorT=(255, 255, 255),
                               colorR=(0, 0, 255),  colorB=())
        else:
            cvzone.putTextRect(img, f' ', (550, -50), 2, 2, colorT=(255, 255, 255),
                               colorR=(0, 135, 0))


        #Feedback
        if push_ups == 5:
            cvzone.putTextRect(img, f'Good Job', (480, 680), 4, 2, colorT=(255, 255, 255),
                               colorR=(0, 255, 0),  colorB=())

        elif push_ups == 10:
            cvzone.putTextRect(img, f'Keep going!', (450, 680), 4, 2, colorT=(255, 255, 255),
                               colorR=(0, 255, 0),  colorB=())
        elif push_ups == 15:
            cvzone.putTextRect(img, f'Almost there!', (410, 680), 4, 2, colorT=(255, 255, 255),
                               colorR=(0, 255, 0),  colorB=())
        elif push_ups == 20:
            cvzone.putTextRect(img, f'You did it!', (480, 680), 4, 2, colorT=(255, 255, 255),
                               colorR=(0, 255, 0),  colorB=())
        elif push_ups == 21:
            quit()

        else:
            cvzone.putTextRect(img, f' ', (550, -50), 2, 2, colorT=(255, 255, 255),
                               colorR=(0, 135, 0))


    ctime = time.time()
    fps = 1/(ctime-ptime)
    ptime = ctime
    #cvzone.putTextRect(img, f'FPS: {int(fps)}',(265, 440), 1.6, 2, colorT=(255, 255, 255),colorR=(0,135,0), border=3, colorB=())
    cv2.imshow('Push-ups', img)
    if cv2.waitKey(1) == ord('q'):
        break