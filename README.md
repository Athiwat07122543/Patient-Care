# Patient Care

This project is a real-time patient information input and monitoring system designed for healthcare staff to track patient data instantly as it is being entered.

The system consists of two main interfaces:
- **Patient Form** – A responsive form for patients to enter their personal and medical-related information.
- **Staff View** – A real-time dashboard that allows staff to monitor patient input instantly.

Data between both interfaces is synchronized in real-time using Socket.io (WebSockets). When a patient types or updates any field, the staff view updates immediately without the need for a page refresh.

## Tech Stack
- Frontend: Next.js, Tailwind CSS, React-Toastify
- Backend: Node.js, Express, Socket.io
- Hosting: Render
- Programing Language: TypeScript

## Image
**Patient Form**
<br>
<img src="https://uppic.cloud/ib/cUcOOwhUW0lNeMv_1764777150.png" alt="Patient Form" width="400"/>

**Staff View**
<br>
<img src="https://uppic.cloud/ib/tz0hXBserukac01_1764777209.png" alt="Patient Form" width="800"/>

## Live Demo
[**Patient Form**](https://patient-care-g4nv.onrender.com)
<br>
[**Staff View**](https://patient-care-g4nv.onrender.com/staff)
## Installation

**Backend**
```sh
cd server
npm install
```
create .env file and setting

```
URL=(Frontend_URL)
```
example
<br>
URL=http://localhost:3000

and run
```sh
npm start
```

**Frontend**
```sh
cd server
npm install
```
create .env file and setting

```
NEXT_PUBLIC_URL=(Backend_URL)
```
example
<br>
NEXT_PUBLIC_URL=http://localhost:3001

and run server
```sh
npm start
```
