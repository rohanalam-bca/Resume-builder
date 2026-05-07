import pymysql
import os

def get_connection():
    return pymysql.connect(
        host=os.getenv("trolley.proxy.rlwy.net"),
        port=int(os.getenv(19224)),
        user=os.getenv("root"),
        password=os.getenv("uuxudHDYCjcYFbKiVARCCuDWvbIuFtYD"),
        database=os.getenv("resume_builder"),
        cursorclass=pymysql.cursors.DictCursor
    )
