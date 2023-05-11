import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://etucmasyqhmiotidgxwb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dWNtYXN5cWhtaW90aWRneHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMDYxNzAsImV4cCI6MTk5ODY4MjE3MH0.vWhSmJ2dARPQohRwnFw58kVFhgaGu7etohL_DCJqkxI'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase