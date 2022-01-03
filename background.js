//background
chrome.contextMenus.create({
  id: 'instagram-downloader',
  title: "Instagram downloader",
  contexts: ["all"],
  "documentUrlPatterns":["https://www.instagram.com/","https://www.instagram.com/*"]
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    let url = tab.url;
    let isInstagram = url.includes("https://www.instagram.com/");
    if (isInstagram) {
      instagramTools(activeInfo.tabId);
    } 
    // else {
    //   chrome.action.setIcon({
    //     path: {
    //       "16" : "./icons/icon16.png",
    //       "32" : "./icons/icon32.png",
    //       "48" : "./icons/icon48.png",
    //       "128" : "./icons/icon128.png"
    //     },
    //     tabId: activeInfo.tabId,
    //   });
    // }
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    let url = change.url;
    let isInstagram = url.includes("https://www.instagram.com/");
    if (isInstagram) {
      instagramTools(tabId);
    } 
    // else {
    //   chrome.action.setIcon({
    //     path: {
    //       "16" : "./icons/icon16.png",
    //       "32" : "./icons/icon32.png",
    //       "48" : "./icons/icon48.png",
    //       "128" : "./icons/icon128.png"
    //     },
    //     tabId: tabId,
    //   });
    // }
  }
});

const instagramTools = (tabId) => {
  chrome.action.setIcon({
    path: {
      "16" : "./icons/icon16-active.png",
      "32" : "./icons/icon32-active.png",
      "48" : "./icons/icon48-active.png",
      "128" : "./icons/icon128-active.png"
    },
    tabId: tabId,
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.sendMessage(
      tab.id,
      "getClickedEl",
      { frameId: info.frameId },
      (data) => {
        let imageSrc = data.value;
        console.log(imageSrc);
      },
    );
  });
};
