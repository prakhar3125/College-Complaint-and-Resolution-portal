const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hqkrwernqfaksjeliujv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3J3ZXJucWZha3NqZWxpdWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwOTE4OTMsImV4cCI6MjAzNzY2Nzg5M30.dXKlevMqEiN27tQwduMu_yev-dOwQx7UifhpwsSidDg';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

