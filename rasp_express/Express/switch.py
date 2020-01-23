import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(18, GPIO.OUT)
GPIO.setup(21, GPIO.IN)

try:
    while True:
        inputIO = GPIO.input(21)

        if inputIO == False:
            GPIO.output(18, GPIO.HIGH)
            #time.sleep(1)

        else:
            GPIO.output(18, GPIO.LOW)
            #time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
