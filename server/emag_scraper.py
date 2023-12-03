from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import selenium.common.exceptions

import time

base_rating = 4.3


def choose_category():
    category = input("Choose a category: ")
    if category == "phones":
        return "https://www.emag.ro/telefoane-mobile/"
    elif category == "laptops":
        return "https://www.emag.ro/laptopuri/c"
    elif category == "tvs":
        return "https://www.emag.ro/televizoare/c"
    elif category == "headphones":
        return "https://www.emag.ro/casti-pc/c"
    else:
        print("Invalid category")
        return None


def scrape(url):
    driver = webdriver.Chrome(keep_alive=True)

    options = Options()
    options.add_argument("--incognito")

    driver.get(url)

    # Get number of pages
    prod_num = driver.find_elements(By.CLASS_NAME, "js-listing-pagination")
    prod = prod_num[0].find_elements(By.TAG_NAME, "strong")
    prod_one_page = int(prod[0].get_attribute("innerHTML").split(" ")[-1])
    total_prod = int(prod[1].get_attribute("innerHTML"))
    total_pages = round(total_prod / prod_one_page)

    products_list = []

    for page in range(42, total_pages + 1):
        print(f"====================PAGE {page}=====================")
        driver.get(url + "p" + str(page) + "/c")
        time.sleep(3)
        products = driver.find_elements(By.CLASS_NAME, "card-v2")
        for i in range(0, prod_one_page):
            try:
                product_rating = float(
                    products[i].find_element(By.CLASS_NAME, "average-rating").text
                )
                if product_rating - base_rating >= 0:
                    product_name = (
                        products[i].find_element(By.CLASS_NAME, "card-v2-title").text
                    )
                    if "RESIGILAT" not in product_name:
                        product_price = (
                            products[i]
                            .find_element(By.CLASS_NAME, "product-new-price")
                            .text
                        )
                        product_link = (
                            products[i]
                            .find_element(By.CLASS_NAME, "card-v2-info")
                            .find_element(By.TAG_NAME, "a")
                            .get_attribute("href")
                        )
                        product_img = (
                            products[i]
                            .find_element(By.CLASS_NAME, "card-v2-thumb-inner")
                            .find_element(By.TAG_NAME, "img")
                            .get_attribute("src")
                        )
                        products_list.append(
                            {
                                "name": product_name,
                                "price": product_price,
                                "rating": product_rating,
                                "link": product_link,
                                "img": product_img,
                            }
                        )
            except selenium.common.exceptions.NoSuchElementException:
                pass
            except IndexError:
                break

    return products_list


if __name__ == "__main__":
    url = choose_category()
    if url:
        scrape(url)
