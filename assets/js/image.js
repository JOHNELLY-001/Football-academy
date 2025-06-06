function formatTimeSince(postedTime) {
    const now = new Date();
    const seconds = Math.floor((now - postedTime) / 1000);
    
    // Time intervals in seconds
    const intervals = {
      year: 31536000,   // 365 days
      month: 2592000,   // 30 days (approx)
      week: 604800,     // 7 days
      day: 86400,       // 24 hrs
      hour: 3600,       // 60 mins
      minute: 60,
      second: 1
    };
  
    // Find the largest matching unit
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-interval, unit);
      }
    }
  
    return "just now";
  }
  
  function updateTimestamps() {
    document.querySelectorAll('.timestamp').forEach(timestamp => {
      const postedTime = new Date(timestamp.getAttribute('data-posted-time'));
      timestamp.textContent = formatTimeSince(postedTime);
    });
  }
  
  // Update every second (for real-time "seconds ago" updates)
  setInterval(updateTimestamps, 1000);
  
  // Initialize on page load
  updateTimestamps();