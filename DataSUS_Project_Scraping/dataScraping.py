from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()

driver.get('https://datasus.saude.gov.br/informacoes-de-saude-tabnet/')
element = driver.find_element(By.ID,'elementor-tab-title-2153')
element.click()
element = driver.find_elements(By.CLASS_NAME, "s3")
element = [element for element in element if element.text.strip() != '']
element[3].click()
element = driver.find_element(By.NAME, "radiobutton")
element.click()
element = driver.find_element(By.ID, "mySelect")
element.click()
element = driver.find_elements(By.TAG_NAME, "option")
element[6].click()
element = driver.find_element(By.CLASS_NAME, "mostra")
element.click()

# Fill out forms and submit
  # input_element = driver.find_element_by_name('input_name')
  # input_element.send_keys('input_text')
  # input_element.send_keys(Keys.ENTER)

# Once the desired page is reached, extract the HTML
 #page_source = driver.page_source

# Use Beautiful Soup to parse the HTML
 #soup = BeautifulSoup(page_source, 'html.parser')

# Extract the data using Beautiful Soup
# ...

# Close the browser
#driver.quit()
