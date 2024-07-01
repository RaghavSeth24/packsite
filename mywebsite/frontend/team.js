// team.js

document.addEventListener('DOMContentLoaded', function() {
    const teamMembersContainer = document.getElementById('teamMembers');

    fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/players')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.sports && data.sports.length > 0) {
                const draftPicks = data.sports[0].leagues[0].draft;

                draftPicks.forEach(pick => {
                    const pickElement = document.createElement('div');
                    pickElement.classList.add('team-member');
                    pickElement.innerHTML = `
                        <h3>${pick.round.text} - Pick ${pick.pick.text}</h3>
                        <p>${pick.player.displayName}</p>
                    `;
                    teamMembersContainer.appendChild(pickElement);
                });
            } else {
                teamMembersContainer.innerHTML = '<p>No draft picks found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            teamMembersContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});
