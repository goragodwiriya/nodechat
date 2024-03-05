# Node.js Chat

ตัวอย่างการสร้าง Chatroom อย่างง่ายๆด้วย Node.js โดยการใช้ socket.io และมีการบันทึกประวัติการสนทนาลงใน MySQL


## การติดตั้ง

1.  สร้างไฟล์ `.env` จากไฟล์ตัวอย่าง `.env.demo` โดยใส่ข้อมูลการเชื่อมต่อฐานข้อมูลให้ถูกต้อง
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=chatroom
CHAT_TABLE=chat

PORT=3000
```
2.  สร้างฐานข้อมูลตามที่กำหนดโดย `DB_NAME` และนำเข้าข้อมูลจากไฟล์ `chatroom.sql`

3.  ติดตั้ง Node.js และ npm ให้เรียบร้อย

4.  ติดตั้ง node_modules โดยพิมพ์คำสั่ง `npm install`

5.  Run Node โดยพิมพ์คำสั่ง `node app.js`

6.  เปิดบราวเซอร์ ที่ `http://localhost:3000` (ค่าเริ่มต้น)


## หากต้องการสนับสนุนผู้เขียน สามารถบริจาคช่วยเหลือค่า Server ได้ที่

```
ธนาคาร กสิกรไทย สาขากาญจนบุรี
เลขที่บัญชี 221-2-78341-5
ชื่อบัญชี กรกฎ วิริยะ
```