# 📊 Sales Dashboard App

A responsive full-stack web application for viewing and interacting with sales representative data, built with Next.js (frontend) and FastAPI (backend).

![App Preview](https://via.placeholder.com/800x400?text=Sales+Dashboard+Screenshot) <!-- Replace with actual screenshot -->

## 🚀 Features

- View detailed sales rep profiles: role, region, skills, deals, and clients
- Ask questions via a mock AI assistant
- Search & filter reps by name, region, or skill
- Sort reps by number of deals or region
- View summary statistics by region
- Responsive design for all device sizes

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Bootstrap 5

**Backend:**
- FastAPI
- Python 3.10+

**Development:**
- TypeScript (frontend)
- Vercel (deployment ready)
- Uvicorn (ASGI server)

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DeemasDee/sales-dashboard.git
cd sales-dashboard
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Linux/Mac:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

pip install -r requirements.txt
```

Start the API server:
```bash
uvicorn main:app --reload
```
The backend will run at: http://localhost:8000


### 3. Frontend Setup (Next.js)
```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```
The app will be available at: http://localhost:3000



## 🧠 Design Choices
- FastAPI: Chosen for its simplicity and speed in serving structured JSON data
- Next.js: Enables fast development with responsive components and SSR-ready framework
- Bootstrap 5: Provides responsive layouts with minimal custom CSS
- Component Architecture: Modular design for maintainability
- Mock AI Endpoint: Simulates interactivity without external dependencies


## 🔮 Potential Improvements
- Integrate real AI assistant (OpenAI/Gemini API)
- Add authentication & user roles
- Export data to CSV/PDF functionality
- Implement data visualization with Chart.js
- Add dark mode toggle
- Enhanced mobile responsiveness
- Unit/Integration testing

