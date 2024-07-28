const express = require('express');
const bodyParser = require('body-parser');
const supabase = require('./supabaseClient');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Ensure you have a 'public' folder for static files
app.use(bodyParser.json());

app.post('/api/submit', async (req, res) => {
    
    const { name, registration_number, block_room_number, email, Complaint_Type, message } = req.body;

    // Log the received form data
    console.log('Form data received:', { name, registration_number, block_room_number, email, Complaint_Type, message });

    try {
        const { data, error } = await supabase
            .from('prakhar') // Updated table name
            .insert([{ 
                name, 
                registration_number, 
                block_room_number, 
                email, 
                complaint_type: Complaint_Type, // Ensure this matches the Supabase column name
                message 
            }]);

        // Check for and log any errors
        if (error) {
            console.error('Supabase insert error:', error.message);
            console.error('Detailed error:', error);
            res.status(500).send('Error submitting your complaint');
            return;
        }

        console.log('Data successfully inserted:', data);
        res.status(200).send('Thank you! Your submission has been received!');
    } catch (err) {
        console.error('Unexpected error:', err.message);
        console.error('Detailed error:', err);
        res.status(500).send('Unexpected error submitting your complaint');
    }
});
app.post('/api/fetch-complaints', async (req, res) => {
  const { registration_number, email } = req.body;

  try {
      const { data, error } = await supabase
          .from('prakhar')
          .select('name, complaint_type, message, created_at')
          .eq('registration_number', registration_number)
          .eq('email', email);

      if (error) {
          console.error('Error fetching data from Supabase:', error);
          res.status(500).json({ error: 'Error fetching data' });
          return;
      }

      res.json(data);
  } catch (error) {
      console.error('Error in the server route:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});