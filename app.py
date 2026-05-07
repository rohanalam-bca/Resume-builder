from flask import Flask, request, jsonify, render_template
from db import get_connection

app = Flask(__name__)

# Save Resume API
@app.route('/save-resume', methods=['POST'])
def save_resume():
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    # Insert user
    cursor.execute("""
        INSERT INTO users (name, email, phone)
        VALUES (%s, %s, %s)
    """, (
        data['personalInfo']['name'],
        data['personalInfo']['email'],
        data['personalInfo']['phone']
    ))

    user_id = cursor.lastrowid

    # Insert resume
    cursor.execute("""
        INSERT INTO resumes (user_id, template)
        VALUES (%s, %s)
    """, (
        user_id,
        data['templateUsed']
    ))

    conn.commit()
    conn.close()

    return jsonify({"status": "success"})

@app.route('/mark-downloaded', methods=['POST'])
def mark_downloaded():
    data = request.json
    resume_id = data['resume_id']

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE resumes SET downloaded = TRUE WHERE id = %s
    """, (resume_id,))

    conn.commit()
    conn.close()

    return jsonify({"status": "updated"})



@app.route('/dashboard-data')
def dashboard_data():
    conn = get_connection()
    cursor = conn.cursor()

    # Counts
    cursor.execute("SELECT COUNT(*) as total_users FROM users")
    users_count = cursor.fetchone()

    # Today's resumes
    cursor.execute("""
    SELECT COUNT(*) AS today_resumes
    FROM resumes
    WHERE DATE(created_at) = CURDATE()
    """)

    today_resumes = cursor.fetchone()

    # Template usage
    cursor.execute("""
        SELECT template, COUNT(*) as count 
        FROM resumes 
        GROUP BY template
    """)
    templates = cursor.fetchall()

    # 🔥 NEW: Get latest users
    cursor.execute("""
        SELECT name, email, phone, created_at 
        FROM users 
        ORDER BY id DESC 
        LIMIT 10
    """)
    users_list = cursor.fetchall()

    conn.close()

    return jsonify({
        "users": users_count['total_users'],
        "today_resumes": today_resumes['today_resumes'],
        "templates": templates,
        "users_list": users_list   # ✅ NEW
    })


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)