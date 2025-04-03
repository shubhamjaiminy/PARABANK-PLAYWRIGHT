Para Bank UI & API Automation 🚀
Automated Testing with Playwright & JavaScript

Overview
This repository contains UI and API automation for Para Bank, utilizing Playwright and JavaScript. The automation suite ensures:
✔ Functional accuracy
✔ Regression stability
✔ API reliability

Playwright’s powerful capabilities enable end-to-end (E2E) testing for both UI and API workflows.

Tech Stack

Component	Technology Used
Automation Framework	Playwright
Programming Language	JavaScript
Assertion Library	Playwright Test
API Testing	Playwright's Request Module
Reporting	Playwright HTML Reporter
CI/CD	Jenkins

📌 Project Structure

📦 PARABANK-PLAYWRIGHT  
┣ 📂 node_modules         # Dependencies  
┣ 📂 page-objects         # Page Object Model (POM) for UI interactions  
┃ ┗ 📜 basePage.js       # Base page object  
┣ 📂 playwright-report    # Test execution reports  
┣ 📂 test-results        # Stores test results and artifacts  
┣ 📂 tests               # Test cases for UI automation  
┃ ┗ 📜 parabank.spec.js  # Main test file for UI automation  
┣ 📜 .gitignore          # Files ignored for version control  
┣ 📜 package-lock.json   # Dependency lock file  
┣ 📜 package.json        # Project dependencies and scripts  
┣ 📜 playwright.config.js # Playwright configuration  
┣ 📜 README.md           # Project documentation  

📌 Installation & Setup
1️⃣ Prerequisites
Ensure the following are installed on your system:
✅ Node.js (Latest LTS version)
✅ npm (Node Package Manager)
✅ Playwright Browsers

2️⃣ Clone the Repository
git clone https://github.com/shubhamjaiminy/PARABANK-PLAYWRIGHT
cd para-bank-automation
3️⃣ Install Dependencies
npm install
4️⃣ Install Playwright Browsers
npx playwright install
📌 Running Tests
🔹 Run All Tests
npx playwright test
🔹 Run a Specific Test File
npx playwright test tests/parabank.spec.js
🔹 Run in Headed Mode (For Debugging)
npx playwright test --headed
🔹 Generate & View Test Report
npx playwright test --reporter=html
👉 Open playwright-report/index.html in a browser to view test results.

📌 Test Structure
📂 Page Objects (page-objects/basePage.js)
Encapsulates locators and actions to maintain reusable code.

📂 Test Files (tests/parabank.spec.js)
Contains test cases interacting with the UI.

⚙ Configuration (playwright.config.js)
Stores Playwright settings such as:
✅ Timeouts
✅ Supported browsers
✅ Base URLs

📌 Best Practices Followed
✔ Page Object Model (POM) for maintainability
✔ Assertions for UI validation
✔ Parallel Execution for faster test runs
✔ Supports Headless & Headed Modes
✔ Detailed HTML Reports for debugging

