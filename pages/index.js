// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Insert the email into your Supabase 'waiting_list' table
    const { error } = await supabase.from('waiting_list').insert([{ email }]);
    if (error) {
      // Check for duplicate error (this message may vary, so adjust as necessary)
      if (error.message.includes('duplicate key value')) {
        setMessage('This email is already registered.');
      } else {
        setMessage('There was an error. Please try again.');
      }
      console.error('Supabase error:', error);
    } else {
      setMessage('Thank you for signing up!');
    }

    setEmail('');
    setLoading(false);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The AI Hustle Lab - Launching Soon!</title>
        <link rel="icon" href="/assets/logo.png" type="image/png" />
      </Head>
      <div className="container">
        
        <h1>🧪 Launching Soon!</h1>
        <h2>Get Ready for The AI Hustle Lab</h2>
        <p>
          The AI-powered platform to help you discover, plan, and launch your successful side hustle.
        </p>
        <div className="features">
          <h3>What you'll get:</h3>
          <ul>
            <li>
              <span className="feature-title">✨ Personalized Side Hustle Finder:</span> Discover opportunities
              aligned with your skills and passions using the Ikigai method.
            </li>
            <li>
              <span className="feature-title">📝 AI-Powered Business Plan Generator:</span> Get comprehensive,
              customized business plans with market insights.
            </li>
            <li>
              <span className="feature-title">📊 Intelligent Project Management:</span> Turn your plan into
              actionable tasks and track your progress visually.
            </li>
            <li>
              <span className="feature-title">💰 Premium Financial Forecasting:</span> Make data-driven decisions
              with detailed revenue and expense projections (Premium).
            </li>
            <li>
              <span className="feature-title">✍️ AI Content Creation & Prompt Library:</span> Generate marketing
              copy, social media posts, and more with ease (Pro).
            </li>
          </ul>
        </div>
        <p className="discount-info">
          Sign up now to get notified at launch and receive an exclusive early bird discount!
        </p>
        <form id="notify-form" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Notify Me!'}
          </button>
        </form>
        {message && <p id="confirmation-message" className="confirmation">{message}</p>}
      </div>
    </>
  );
}
