import I2C_LCD_driver
from time import *


f = open('data.txt',"r")

mylcd = I2C_LCD_driver.lcd()
mylcd.lcd_display_string(f.read(),1)


f.close()
