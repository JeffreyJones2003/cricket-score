# 🏏 Live Cricket Score App

**Live Demo:** [https://live-cric-score-app.netlify.app/live-score](https://live-cric-score-app.netlify.app/live-score)


A modern Angular 17 web application that fetches and displays **live cricket scores**, **fixtures**, and **team performance statistics** using the [CricketData.org API](https://cricketdata.org/). The app is mobile-friendly, responsive, and built with reusable components.

---

## 🚀 Features

- ✅ **Live Matches** – See ongoing international cricket matches with team flags and real-time scores.
- 📅 **Fixtures** – Upcoming matches grouped by date, with team logos and venue info.
- 📊 **Team Stats** – Visual charts (Bar/Pie) showing win percentages of ICC teams based on match type (T20, ODI, Test).
- 🔄 **Match Type Filters** – Easily filter fixtures or stats by match format.
- 🎨 Responsive UI with Bootstrap and chart animations.

---

## 🛠️ Tech Stack

| Technology     | Description                        |
|----------------|------------------------------------|
| Angular 17     | Frontend Framework                 |
| TypeScript     | Component logic                    |
| ng2-charts     | Chart.js wrapper for Angular       |
| Bootstrap 5    | Styling and responsive layout      |
| CricketData API| Cricket data source (JSON-based)   |

---

## 🖼️ Screenshots

### 🟢 Live Scores
![Live Score Screenshot](./screenshots/live-score.png)

### 📅 Fixtures Page
![Fixtures Screenshot](./screenshots/fixtures.png)

### 📊 Team Statistics
![Stats Screenshot](./screenshots/team-stats.png)

> *(Include real screenshots from your running app here.)*

---

## 🔧 Setup Instructions

```bash
git clone https://github.com/your-username/live-cricket-score.git
cd live-cricket-score
npm install
ng serve

Visit http://localhost:4200 in your browser.

📦 API Reference
	•	GET /v1/currentMatches – Live match data
	•	GET /v1/players_info?id=... – Player & team stats
	•	GET /v1/match_info?id=... – Full match details

Powered by: CricketData.org

📌 Folder Structure

src/app/
  ├── components/
  │     ├── live-score/
  │     ├── fixtures/
  │     └── team-stats/
  ├── services/
  │     └── cricket.service.ts

💡 Future Enhancements
	•	🧠 NLP-based search for players or teams
 	•	🔔 Notifications for live match updates

👨‍💻 Author

Jeffrey Jones S
📧 jefffj10@gmail.com
🌐 LinkedIn: https://www.linkedin.com/in/jeffrey-jones-s-b2a84524b/
🔗 GitHub:   https://github.com/JeffreyJones2003

📝 License

This project is licensed under the MIT License.