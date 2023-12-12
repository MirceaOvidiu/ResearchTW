from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import selenium.common.exceptions


# main scraping function
def scrape(url, base_rating=4.5):
    options = Options()
    options.add_argument("--incognito")
    options.add_argument("--headless")

    driver = webdriver.Chrome(keep_alive=True, options=options)

    driver.get(url)

    # Get number of pages
    prod_num = driver.find_elements(By.CLASS_NAME, "js-listing-pagination")
    prod = prod_num[0].find_elements(By.TAG_NAME, "strong")
    prod_one_page = int(prod[0].get_attribute("innerHTML").split(" ")[-1])
    total_prod = int(prod[1].get_attribute("innerHTML"))
    total_pages = round(total_prod / prod_one_page)

    products_list = []

    for page in range(1, total_pages + 1):
        print(f"====================PAGE {page}=====================")
        driver.get(url + "p" + str(page) + "/c")
        try:
            WebDriverWait(driver, 2).until(
                EC.presence_of_element_located((By.CLASS_NAME, "average-rating"))
            )

            rated_products = driver.find_elements(By.CLASS_NAME, "average-rating")
            for product in rated_products:
                product_rating = float(product.text)
                if product_rating - base_rating >= 0:
                    try:
                        product_name = product.find_element(
                            By.XPATH, "../../../../h2[@class='card-v2-title-wrapper']/a"
                        ).text
                        product_link = product.find_element(
                            By.XPATH,
                            "../../../../../a",
                        ).get_attribute("href")
                        product_image = product.find_element(
                            By.XPATH,
                            "../../../../../a/div[@class='card-v2-thumb-inner']/img",
                        ).get_attribute("src")
                        product_price = "".join(
                            product.find_element(
                                By.XPATH,
                                "../../../../../../..//p[@class='product-new-price']",
                            )
                            .text.split(" ")[0]
                            .split(".")
                        )

                        products_list.append(
                            {
                                "name": product_name,
                                "price": product_price,
                                "rating": product_rating,
                                "link": product_link,
                                "img": product_image,
                            }
                        )
                    except selenium.common.exceptions.NoSuchElementException:
                        continue
        except selenium.common.exceptions.TimeoutException:
            print(f"Page {page} timed out")
            continue
    print(f"Found {len(products_list)} products")
    return products_list
