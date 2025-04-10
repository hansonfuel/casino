// Add this to all pages
supabase.auth.onAuthStateChange((event, session) => {
	if (window.location.pathname.includes('admin.html')) {
	  if (!session?.user) window.location.href = 'index.html';
	}
  });