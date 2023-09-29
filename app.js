const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000; // You can change this to any port you prefer

app.use(express.json());
app.use(cors({optionsSuccessStatus: 200}));

// Enable CORS for all routes (allow all origins)
app.use(cors());

// Define the timestamp route

app.get('/', (req, res)=>{
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString()
    })
  })

app.get('/api/:date_string?', (req, res) => {
    const { date_string } = req.params;
  
    let date;
  
    if (!date_string) {
      date = new Date();
    } else {
      date = isNaN(date_string)
        ? new Date(date_string)
        : new Date(parseInt(date_string, 10));
  
      // Check if the provided date is valid
      if (isNaN(date.getTime())) {
        res.json({ error: 'Invalid Date' });
        return;
      }
    }
  
    // Format the UTC date string in the specified format
    const utcDateString = date.toUTCString();
  
    res.json({
      unix: date.getTime(), // Unix timestamp in milliseconds
      utc: utcDateString,
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });