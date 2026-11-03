import { supabase } from '../lib/supabaseClient.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const messageP = document.getElementById('message');

let currentSession = null;

supabase.auth.onAuthStateChange((_event, session) => {
  currentSession = session;
  if (session) {
    authContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
  } else {
    authContainer.classList.remove('hidden');
    dashboardContainer.classList.add('hidden');
  }
});

loginBtn.addEventListener('click', async () => {
  messageP.style.display = 'block';
  messageP.textContent = 'Logging in...';
  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });
  if (error) {
    messageP.textContent = 'Error: ' + error.message;
  } else {
    messageP.textContent = 'Logged in successfully!';
  }
});

signupBtn.addEventListener('click', async () => {
  messageP.style.display = 'block';
  messageP.textContent = 'Signing up...';
  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });
  if (error) {
    messageP.textContent = 'Error: ' + error.message;
  } else {
    messageP.textContent = 'Sign up successful! Check your email for verification.';
  }
});

logoutBtn.addEventListener('click', async () => {
  messageP.style.display = 'block';
  messageP.textContent = 'Logging out...';
  const { error } = await supabase.auth.signOut();
  if (error) {
    messageP.textContent = 'Error logging out: ' + error.message;
  } else {
    messageP.textContent = 'Logged out successfully.';
  }
});

document.getElementById('submit-fit-btn').addEventListener('click', async () => {
  const brandLink = document.getElementById('brand-link').value;
  const itemType = document.getElementById('item-type').value;

  if (!brandLink || !itemType) {
    messageP.style.display = 'block';
    messageP.textContent = 'Please fill in all required fields.';
    return;
  }

  let measurements = {};
  if (itemType === 'shirts') {
    measurements.chest = Number(document.getElementById('chest').value);
    measurements.shoulder = Number(document.getElementById('shoulder').value);
  } else if (itemType === 'pants') {
    measurements.waist = Number(document.getElementById('waist').value);
    measurements.length = Number(document.getElementById('length').value);
  } else if (itemType === 'shoes') {
    measurements.footLength = document.getElementById('foot-length').value;
  }

  messageP.style.display = 'block';
  messageP.textContent = 'Processing your fit...';

  try {
    if (!currentSession) {
      throw new Error('You must be logged in to calculate fit.');
    }

    const res = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentSession.access_token}`
      },
      body: JSON.stringify({
        url: brandLink,
        category: itemType,
        userBody: measurements,
        fitPreference: 'regular'
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to calculate fit');

    messageP.textContent = `Success! Brand: ${data.brand}, Recommended Size: ${data.recommendation.recommendedSize} (Confidence: ${data.recommendation.confidenceScore})`;
  } catch (err) {
    messageP.textContent = 'Error: ' + err.message;
  }
});