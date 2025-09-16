import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSchema() {
  try {
    console.log('🚀 Starting database schema execution...');
    console.log(`📡 Connecting to: ${supabaseUrl}`);
    
    // Read the schema file
    const schemaPath = join(__dirname, 'supabase_schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Schema file loaded successfully');
    console.log(`📏 Schema size: ${(schemaSql.length / 1024).toFixed(2)} KB`);
    
    // Split the schema into individual statements
    const statements = schemaSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📊 Found ${statements.length} SQL statements to execute`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.length === 0) continue;
      
      try {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        
        // Use the RPC function to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement + ';'
        });
        
        if (error) {
          throw error;
        }
        
        successCount++;
        console.log(`✅ Statement ${i + 1} executed successfully`);
        
      } catch (error) {
        errorCount++;
        const errorMsg = `Statement ${i + 1}: ${error.message}`;
        errors.push(errorMsg);
        console.log(`❌ ${errorMsg}`);
        
        // For certain errors, we can continue (like "already exists")
        if (error.message.includes('already exists') || 
            error.message.includes('does not exist') ||
            error.message.includes('permission denied')) {
          console.log(`⚠️  Continuing despite error (likely safe to ignore)`);
        }
      }
    }
    
    console.log('\n🎯 Schema Execution Summary:');
    console.log(`✅ Successful statements: ${successCount}`);
    console.log(`❌ Failed statements: ${errorCount}`);
    
    if (errors.length > 0) {
      console.log('\n📋 Errors encountered:');
      errors.forEach(error => console.log(`   • ${error}`));
    }
    
    // Test the database by checking if tables exist
    console.log('\n🔍 Verifying database setup...');
    
    const tables = [
      'profiles',
      'learning_modules', 
      'user_module_progress',
      'emergency_drills',
      'user_drill_participation',
      'community_posts',
      'community_replies',
      'resources',
      'user_achievements',
      'user_sessions'
    ];
    
    for (const tableName of tables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${tableName}' - ${error.message}`);
        } else {
          console.log(`✅ Table '${tableName}' - accessible`);
        }
      } catch (error) {
        console.log(`❌ Table '${tableName}' - ${error.message}`);
      }
    }
    
    console.log('\n🎉 Database schema execution completed!');
    console.log('📱 You can now run the application and test user data persistence.');
    
  } catch (error) {
    console.error('💥 Fatal error during schema execution:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution if RPC doesn't work
async function executeSchemaAlternative() {
  try {
    console.log('🔄 Trying alternative execution method...');
    
    // Read the schema file
    const schemaPath = join(__dirname, 'supabase_schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');
    
    // Use Supabase's SQL execution
    const { data, error } = await supabase
      .from('pg_stat_activity') // This is just to test connection
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Connection test failed:', error.message);
      console.log('\n📖 Manual execution required:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the schema from supabase_schema.sql');
      console.log('4. Execute the script');
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log('\n📝 Schema ready for execution');
    console.log('📄 Schema content preview:');
    console.log(schemaSql.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Main execution
console.log('🏗️  Surakshi Bharat Database Schema Executor');
console.log('=' .repeat(50));

executeSchema().catch(error => {
  console.log('\n🔄 Primary method failed, trying alternative...');
  executeSchemaAlternative();
});