import {createClient} from '@supabase/supabase-js'


export const supabaseUrl = 'https://undmawolyisfwazvaslt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZG1hd29seWlzZndhenZhc2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5OTk3NDAsImV4cCI6MjAyMzU3NTc0MH0.MFvNjcry5iFnKCqDojkl7uH-Cv_qZirScFMsoUGTcBc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;