from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import sqlite3

try:
    connectDB = sqlite3.connect('Epidemiologicas_e_Morbidades.db')
    print('connect successful')

except sqlite3.Error as error:
    print('error in db connection')

cursor = connectDB.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS casos (ano INTEGER PRIMARY KEY, cases INTEGER)''')

driver = webdriver.Chrome()

values = ["aids_{:02d}.dbf".format(i) for i in range(22, -1, -1)] + \
         ["aids_{:02d}.dbf".format(i) for i in range(99, 81, -1)] + \
         ["aids_80.dbf"]

driver.get('https://datasus.saude.gov.br/informacoes-de-saude-tabnet/')
element = driver.find_element(By.ID,'elementor-tab-title-2153')
element.click()
time.sleep(0.1)
element = driver.find_elements(By.CLASS_NAME, "s3")
element = [element for element in element if element.text.strip() != '']
element[1].click()

for value in values:
    element = driver.find_element(By.CSS_SELECTOR, "[value='{}']".format(value))
    element.click()

element =  driver.find_element(By.NAME, "mostre")
element.click()
time.sleep(0.5)
elements =  driver.find_elements(By.CSS_SELECTOR, "[align='RIGHT']")

for element in elements:
    yearCaseDuplet = element.text.split()
    if len(yearCaseDuplet) == 2:
        year, cases = yearCaseDuplet
        try:
            year = int(year)
            cases = float(cases.replace('.', ''))
            cases = int(cases)
            print(cases)
        except ValueError:
            print("Invalid year or cases:", year, cases)
            continue
        try:
            cursor.execute("SELECT * FROM casos WHERE ano = ?", (year,))
            existing_record = cursor.fetchone()
            if existing_record:
                print("Updating info for", year)
                cursor.execute("UPDATE casos SET cases = ? WHERE ano = ?", (cases, year))
                connectDB.commit()
            else:
                cursor.execute("INSERT INTO casos VALUES(?, ?)", (int(year), int(cases)))
        except sqlite3.Error as error:
            print("Error inserting data:", error)
        connectDB.commit()
        
    else:
        continue
    

driver.close()
