# 🚀 Spare Project — Full Stack DevOps Setup

## 📌 Overview

This project is a **production-style full-stack application** built with a modern DevOps approach. It demonstrates how to containerize, orchestrate, and prepare an application for scalable deployment using Docker and CI/CD practices.

The application is structured into:

* **Client** → Frontend (React)
* **Server** → Backend (Node.js / Express)
* **Docker** → Containerized environment
* **Docker Compose** → Multi-container orchestration

---

## 🏗️ Project Structure

```
.
├── client/                 # Frontend (React)
├── server/                 # Backend (Node.js / Express)
├── docker-compose.yml      # Multi-container orchestration
├── Dockerfile              # Image build instructions
├── .gitignore              # Ignored files
└── README.md               # Project documentation
```

---

## ⚙️ Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express
* **Containerization:** Docker
* **Orchestration:** Docker Compose
* **Version Control:** Git & GitHub

---

## 🐳 Docker Architecture

### 🔹 Multi-Stage Build (Frontend)

The Dockerfile uses a **multi-stage build**:

1. **Build Stage**

   * Uses Node.js
   * Installs dependencies
   * Builds React app

2. **Production Stage**

   * Uses lightweight image (e.g., nginx or alpine)
   * Serves optimized static files

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have installed:

* Docker
* Docker Compose
* Git

---

### ▶️ Run the Application

```bash
docker-compose up --build
```

This will:

* Build Docker images
* Start frontend & backend services
* Connect them via Docker network

---

### 🛑 Stop the Application

```bash
docker-compose down
```

---

## 🌍 Environment Variables

Sensitive data is stored in `.env` files.

Example:

```
PORT=5000
DATABASE_URL=your_database_url
```

⚠️ Never push `.env` files to GitHub.

---

## 📦 .gitignore Best Practices

The following files are excluded:

```
node_modules/
.env
dist/
build/
*.log
Dockerfile*
docker-compose.override.yml
*.save
```

This ensures:

* Smaller repository size
* Better security
* Faster cloning

---
dist :-why we ignore dist
. It’s large and messy
Minified files
Hard to read
Changes frequently
for example :-
If you’re using React or a bundler:
npm run build
It generates:
dist/
  ├── index.html
  ├── main.js
  ├── styles.css
3. CI/CD will build it anyway

In a real DevOps pipeline:

GitHub Actions runs npm install
Then npm run build
Then produces dist/
❓ Should you push dist/ to GitHub?
✅ In most cases: NO

Add this to .gitignore:
-----------------------------------------
👉 So no need to store it in Git


.env 
✅ Your secrets (API keys, DB passwords) won’t be pushed to GitHub
✅ Your repo stays secure and clean
✅ Other developers won’t accidentally use your local credentials

Even though .env is ignored, your project still needs a way to show what variables are required.

✅ Best practice: create a .env.example, without specifically telling your credintials just say yours ..bla bla ..yours bla bla
Create a file like this:
PORT=3000
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
JWT_SECRET=your_secret_here

her developers can clone your project and know what to configure
Works perfectly with Docker, CI/CD, production setup
Makes your project look professional (DevOps standard)


✅ now lets commit our first commit before we go to creating ci.yml and cd.yml file locally

seid@seya:~/spare$ git commit -m "first project commit without cicd.yml file "

[master b03bcc7] first project commit without cicd.yml file
 31 files changed, 17589 insertions(+), 46 deletions(-)
 create mode 100644 .dockerignore
 create mode 100644 .gitignore
 delete mode 100644 .project_structure.txt.swp
 delete mode 100644 Dockerfile
 create mode 100644 README.md.save
 delete mode 100644 app.js
 create mode 100644 client/.dockerignore
 create mode 100644 client/.gitignore
 create mode 100644 client/README.md
 create mode 100644 client/package-lock.json
 create mode 100644 client/package.json
 create mode 100644 client/public/favicon.ico
 create mode 100644 client/public/index.html
 create mode 100644 client/public/logo192.png
 create mode 100644 client/public/logo512.png
 create mode 100644 client/public/manifest.json
 create mode 100644 client/public/robots.txt
 create mode 100644 client/src/App.css
 create mode 100644 client/src/App.js
 create mode 100644 client/src/App.test.js
 create mode 100644 client/src/index.css
 create mode 100644 client/src/index.js
 create mode 100644 client/src/logo.svg
 create mode 100644 client/src/reportWebVitals.js
 create mode 100644 client/src/setupTests.js
 create mode 100644 docker-compose.yml
 delete mode 100644 package.jason
 create mode 100644 server/package-lock.json
 create mode 100644 server/package.json
 create mode 100644 server/server.js
 delete mode 100644 src/server.js
seid@seya:~/spare$ git status
On branch master
nothing to commit, working tree clean

===================================================

✅ Git Push
git push origin main

while being in the master branch now, since the current market trend is 
 to use the is main branch instead of naming it master so change it using this command 
git branch -m master main

also push the new branch to github
git push -u origin main

❌ Step 3: Delete old master branch on remote (important)
git push origin --delete master
it will ask you 
user name : seidGH
password seyabee@hubgit7819

⚙️ Step 4: Set default branch on GitHub

Go to:
👉 GitHub repo → Settings → Branches

Change default branch from master → main


before proceeding to ci-cd file creation, lets one more time test
 the local docker compsoe is running perfectly and all the front end
 and back end docker containers can run sucessfully and website can run locally at localhost:3000

my docker version is older one V1 

so to run docker compose i have to use this command 
docker-compose up --build  

## 🔄 CI CD )
🧪 My first CI pipeline 

Once push is done, we will create:

📁 .github/workflows/ci.yml

It will:

install dependencies
build client
build server
validate Docker setup

This is your first real DevOps automation step 🔥
🧠 What you are building (important)

You are moving from:

💻 manual project setup to=>⚙️ automated CI/CD system



Create workflow folder
From your project root (where docker-compose.yml, client/, server/ exist):
/spare
mkdir -p .github/workflows

then nano .github/workflows/ci.yml


===============================================
this is the multi-service CI pipeline 

name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # ------------------------
  # 1. FRONTEND (React)
  # ------------------------
  frontend:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: client

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: npm run build


  # ------------------------
  # 2. BACKEND (Node/Express)
  # ------------------------
  backend:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: server

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run basic syntax check
        run: node -c server.js || echo "No syntax errors"


===============================================

ci steps explained 

🟢 CI (Continuous Integration)

CI is responsible for:

pulling your code
installing dependencies
running tests
building the project
optionally building Docker image

👉 It answers:

“Is the code correct and safe?”
ci Validates code.

#ISSUE
after i finish the ci.yml file when i try to push
 the ci file to github i faced an issue the pat was not worrect and
so i switched the SSH 
first i checked my current remote mode using this command

git remote -v
and the result is 

https://github.com/seidGH/spare.git

this shows git is using https file transfer and security protocol
is https 
==SSH===========SSH========SSH=========SSH==to push === ci.yml ===========
#Recommended#  Recommended #Recommended way 

2. Switch to SSH   
the command is :-
git remote set-url origin git@github.com:seidGH/spare.git

now the link becomes like this 
seid@seya:~/spare$ git remote -v
origin  git@github.com:seidGH/spare.git (fetch)
origin  git@github.com:seidGH/spare.git (push)

Ensure SSH agent is running
the checking 
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

CLI output 

Agent pid 1319
Identity added: /home/seid/.ssh/id_ed25519 (seidGH@github.com)

Test connection

ssh -T git@github.com

expected result 
Hi seidGH! You've successfully authenticated, but GitHub does not provide shell access.

this means SSH is runnig perfectly
so now we can push our ci.yml via SSH 

 Push again
git push

👉 This time:

No username
No password
No token

It just works.
==============================================================================================



🔵 CD (Continuous Delivery/Deployment)

CD is responsible for:

taking the tested code/artifact
building Docker images (if not done in CI)
pushing images to registry (Docker Hub, ECR, etc.)
deploying to server/cloud

👉 It answers:

“Can we release this to production?”

🚀 CD 
Builds this optimized image
Pushes it to registry
Later → deploys it

===================================================================
CD.yml

name: CD Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      # 1. Get code
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Enable advanced Docker builder (important for multi-stage efficiency)
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # 3. Login to Docker Hub
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # 4. Build & push optimized image
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: seidgh/spare:latest

========================================================================
Full structure of your “spare” project

spare/
├── client/                  # React frontend
├── server/                  # Node backend
├── docker-compose.yml
├── .gitignore
├── README.md
└── .github/
    └── workflows/
        ├── ci.yml
        └── cd.yml

===============================================================================
  GNU nano 7.2        cd.yml
        uses: docker/setup-buildx-action@v3

      # 3. Login to Docker Hub
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # -------------------------
      # FRONTEND IMAGE
      # -------------------------
      - name: Build & Push Frontend
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: seidgh/spare-frontend:latest

      # -------------------------
      # BACKEND IMAGE
      # -------------------------
      - name: Build & Push Backend
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: seidgh/spare-backend:latest

===========================================================






Future improvements include:

* GitHub Actions for CI/CD
* Automated Docker image builds
* Push to container registry
* Deployment to cloud (AWS / Azure / GCP)

---

## 🧠 Key DevOps Concepts Applied

* Containerization
* Multi-stage Docker builds
* Service orchestration
* Environment isolation
* Scalable architecture design

---

## 📸 Application Flow

```
User → Frontend (React) → Backend (API) → Response → UI
```

---

## 📌 Future Enhancements

* Reverse proxy (Nginx)
* Load balancing
* Kubernetes deployment
* Monitoring (Prometheus / Grafana)

---

## 🤝 Contribution

Feel free to fork, clone, and improve the project.

---

## 📄 License

This project is for educational and DevOps learning purposes.

---

## ✨ Author

Built with a strong focus on learning DevOps step-by-step through real implementation.
