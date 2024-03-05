const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const chatTable = process.env.CHAT_TABLE;
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware เพื่อเข้าถึง Connection Pool ในทุกรายการของการจัดการข้อความ
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// ส่งไฟล์ HTML ที่ให้ไปที่ root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('User connected');

  // เพิ่ม Connection Pool เข้าไปใน socket object
  socket.db = pool;

  socket.on('message', (message) => {
    const sql = 'INSERT INTO ?? (message) VALUES (?)';

    // เข้าถึง Connection Pool จาก socket object
    const db = socket.db;

    // Execute query
    db.query(sql, [chatTable, message], (err, results) => {
      if (err) {
        console.error('Error inserting message into MySQL: ' + err.stack);
        return;
      }
      console.log('Message inserted into MySQL');
    });

    // ส่งข้อความที่ได้รับถึงทุกคนในแชท
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ทำให้ Server ทำงานที่พอร์ตที่กำหนด
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
