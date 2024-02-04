var SerialPort = require("serialport");
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

const port = new SerialPort('COM3',{baudRate: 9600});

app.use(cors());

port.pipe(parser);

let inventory = [];
try {
  const data = fs.readFileSync('inventory.json', 'utf-8');
  inventory = JSON.parse(data);
} catch (error) {
  console.error('Error reading or parsing inventory file:', error);
}


io.on('connection', (socket) => {
    console.log('a user connected');
});

parser.on('data', function(rfid){
  io.emit('inventoryData', inventory);
  // Find the item in the inventory with the matching RFID
  const foundItem = inventory.find(item => item.id === rfid);
  if (foundItem) {
      if (foundItem.quantity > 0) {
          foundItem.quantity -= 1;
          const cart = { id: foundItem.id, description: foundItem.description, quantity: 1, price: foundItem.price };
          io.emit('cart', cart);
      } else {
          console.log('Quantity already at 0 for the item with RFID:', rfid);
      }
  } else {
      console.log('RFID not found in inventory');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});