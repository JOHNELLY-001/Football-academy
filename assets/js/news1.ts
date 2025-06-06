//  function updateTimeAgo() {
//             const timeElements = document.querySelectorAll('.time-ago');
//             const now = new Date();

//             timeElements.forEach(element => {
//                 const postedTime = new Date(element.dataset.posted);
//                 const seconds = Math.floor((now - postedTime) / 1000);

//                 const intervals = {
//                     year: 31536000,
//                     month: 2592000,
//                     week: 604800,
//                     day: 86400,
//                     hour: 3600,
//                     minute: 60
//                 };

//                 let counter;
//                 for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//                     counter = Math.floor(seconds / secondsInUnit);
//                     if (counter >= 1) {
//                         const unitDisplay = counter === 1 ? unit : unit + 's';
//                         element.textContent = `${counter} ${unit} ago`;
//                         return;
//                     }
//                 }
//                 element.textContent = `${Math.floor(seconds)} sec ago`;
//             });
//         }

//         // Initial update
//         updateTimeAgo();
//         // Update every 30 seconds
//         setInterval(updateTimeAgo, 30000);

//         // Add image hover effect
//         document.querySelectorAll('.card-image').forEach(img => {
//             img.addEventListener('mouseover', () => {
//                 img.style.transform = 'scale(1.03)';
//             });
//             img.addEventListener('mouseout', () => {
//                 img.style.transform = 'scale(1)';
//             });
//         });