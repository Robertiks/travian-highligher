// background.js (service worker)

// basic for now, works once pressed
chrome.runtime.onInstalled.addListener(() => {
    console.log("works");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'highlightAttacks') {
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            function: highlightAttackTables
        }, () => {
            sendResponse({status: 'done'});
        });
        return true;  
    }
});

function highlightAttackTables() {
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

