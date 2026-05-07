import pymysql

def get_connection():
    return pymysql.connect(
        host="trolley.proxy.rlwy.net",
        port=19224,
        user="root",
        password="uuxudHDYCjcYFbKiVARCCuDWvbIuFtYD",
        database="resume_builder",
        cursorclass=pymysql.cursors.DictCursor
    )
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

# mysql://root:uuxudHDYCjcYFbKiVARCCuDWvbIuFtYD@trolley.proxy.rlwy.net:19224/resume_builder