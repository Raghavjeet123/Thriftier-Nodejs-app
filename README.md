Full Flow (The Real Story)

This is the part you must speak confidently in interviews:

🧭 Step-by-Step Flow
1. Developer Pushes Code

You push code to main branch on GitHub

👉 This triggers the pipeline automatically

2. GitHub Actions Starts

Runner: Ubuntu machine

Code is pulled using checkout

3. Environment Setup

Node.js 18 is installed

👉 Ready to run JS project

4. Code Quality Check (SonarQube)

Code is scanned

Issues, bugs, vulnerabilities detected

👉 This step ensures:
“Bad code doesn’t go forward”

5. Project Sent to EC2

Using SCP:

Entire project copied to:

/home/ubuntu/student-app

👉 Now cloud has your code

6. Docker Image Build
docker build -t student-reg:latest .

👉 Your app becomes a container image

7. Remote Deployment (EC2)

Through SSH:

Old containers stopped:

docker compose down

New version started:

docker compose up -d --build

👉 Fresh deployment, zero manual work

🌊 In One Line (Power Statement)

You can say this in interviews:

👉
“I built a Node.js-based student registration system and implemented a CI/CD pipeline using GitHub Actions that integrates SonarQube for code quality and automates Docker-based deployment to AWS EC2.”

🧠 What This Project Demonstrates

This is what recruiters actually see:

You understand CI/CD pipelines

You know real deployment (EC2)

You use Docker properly

You care about code quality (SonarQube)

You can automate end-to-end flow

👉 This is DevOps mindset, not just tools.
