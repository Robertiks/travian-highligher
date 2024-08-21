document.getElementById('highlightButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: highlightAttackTables
        });
    });
});

function highlightAttackTables() {
    // raid and attack
    const tables = document.querySelectorAll("table.troop_details.inRaid, table.troop_details.inAttack");

    tables.forEach((table) => {
        const markAttackElement = table.querySelector("img.markAttack0");

        if (markAttackElement) {
            const roleTd = table.querySelector("td.role");
            const troopHeadlineTd = table.querySelector("td.troopHeadline");

            if (roleTd) {
                roleTd.style.backgroundColor = "red";
            }
            if (troopHeadlineTd) {
                troopHeadlineTd.style.backgroundColor = "red";
            }
        }
    });
}
