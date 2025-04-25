
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRole) {
      throw new Error('Required environment variables are not set');
    }

    // Use service role for admin privileges to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    // Query for upcoming webinars that need reminders
    const { data: upcomingWebinars, error: fetchError } = await supabase
      .from('webinars')
      .select(`
        id, 
        title,
        description,
        instructor,
        start_time,
        zoom_link,
        meeting_id,
        meeting_password,
        webinar_registrations (
          id,
          user_id
        )
      `)
      .gte('start_time', new Date(Date.now() + 15 * 60000).toISOString()) // 15 minutes from now
      .lte('start_time', new Date(Date.now() + 30 * 60000).toISOString()) // 30 minutes from now
      .filter('webinar_registrations.reminder_sent', 'eq', false);

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${upcomingWebinars?.length || 0} webinars needing reminders`);

    // Process each webinar and send reminders
    const reminderPromises = [];
    
    if (upcomingWebinars) {
      for (const webinar of upcomingWebinars) {
        if (!webinar.webinar_registrations || webinar.webinar_registrations.length === 0) {
          continue;
        }

        // For each registration
        for (const registration of webinar.webinar_registrations) {
          // Get user email
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id, email')
            .eq('id', registration.user_id)
            .single();
          
          if (userError || !userData) {
            console.error(`Error fetching user data for ${registration.user_id}:`, userError);
            continue;
          }

          // Mark reminder as sent
          const { error: updateError } = await supabase
            .from('webinar_registrations')
            .update({ reminder_sent: true })
            .eq('id', registration.id);

          if (updateError) {
            console.error(`Error updating reminder status:`, updateError);
          }

          // In a real implementation, you would integrate with an email service here
          console.log(`Sending reminder for "${webinar.title}" to user ${userData.id}`);
          
          // For demo purposes, we're just logging instead of sending actual emails
          // You'd typically use a service like Resend, SendGrid, etc.
          const emailBody = {
            webinarTitle: webinar.title,
            startTime: webinar.start_time,
            zoomLink: webinar.zoom_link,
            meetingId: webinar.meeting_id,
            meetingPassword: webinar.meeting_password,
            instructorName: webinar.instructor
          };
          
          console.log(`Email would contain:`, JSON.stringify(emailBody));
        }
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${upcomingWebinars?.length || 0} webinars for reminders` 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );

  } catch (error) {
    console.error('Error processing webinar reminders:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
