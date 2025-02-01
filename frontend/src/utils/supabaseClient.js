
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izxdkewuapfqcowpjnjs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6eGRrZXd1YXBmcWNvd3BqbmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODIzMjUzNSwiZXhwIjoyMDUzODA4NTM1fQ.hl1DSIhUkwkUKtAXDFmmkv5HONJZYTFT4ZPA5y9N42M';
export const supabase = createClient(supabaseUrl, supabaseKey);