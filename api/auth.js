import { supabase } from '../lib/supabaseClient.js';

const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const messageP = document.getElementById('message');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const logoutBtn = document.getElementById('logout-btn');

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    authContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
  } else {
    authContainer.classList.remove('hidden');
    dashboardContainer.classList.add('hidden');
  }
});

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  messageP.textContent = 'Logging in...';
  
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    messageP.textContent = 'Error: ' + error.message;
  } else {
    messageP.textContent = 'Logged in successfully!';
  }
});

signupBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  messageP.textContent = 'Signing up...';
  
  const { error } = await supabase.auth.signUp({ email, password });
  
  if (error) {
    messageP.textContent = 'Error: ' + error.message;
  } else {
    messageP.textContent = 'Sign up successful! Check your email for verification.';
  }
});

logoutBtn.addEventListener('click', async () => {
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
  const messageP = document.getElementById('message');
  
  if (!brandLink || !itemType) {
    messageP.textContent = 'Please fill in all required fields.';
    return;
  }

  let measurements = {};
  if (itemType === 'shirts') {
    measurements.chest = document.getElementById('chest').value;
    measurements.shoulder = document.getElementById('shoulder').value;
  } else if (itemType === 'pants') {
    measurements.waist = document.getElementById('waist').value;
    measurements.length = document.getElementById('length').value;
  } else if (itemType === 'shoes') {
    measurements.footLength = document.getElementById('foot-length').value;
  }

  messageP.textContent = 'Processing your fit...';
  
  // Here you will integrate your sizing logic or API
  console.log('Sending data:', { brandLink, itemType, measurements });
  
  // Simulated success message
  messageP.textContent = 'Fit analysis complete! Check console for details.';
});