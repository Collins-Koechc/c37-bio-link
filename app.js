/* ==========================================================================
   ⚡ c37biolink MAIN CODE RECONCILIATION LAYER - PART 1
   ========================================================================== */

// Default raw SVG vector circle badge fallback if the user skips uploading an image
const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23090d16' stroke='%23D4AF37' stroke-width='2'/><text x='50' y='55' font-family='sans-serif' font-weight='bold' font-size='18' fill='%23D4AF37' text-anchor='middle'>c37</text></svg>";

// Local global variable holding our compressed in-memory profile photo string row
let activeAvatarBase64Stream = "";

// DOM INTERFACE VIEW PANE VISIBILITY CONTAINERS
const creatorStudioPane = document.getElementById("creator-studio-pane");
const profileShowcasePane = document.getElementById("profile-showcase-pane");
const bioLinksTargetDeck = document.getElementById("bio-links-target-deck");

// Identity Profile Configurations Form Target Inputs
const nameInput = document.getElementById("profile-name-input");
const bioInput = document.getElementById("profile-bio-input");
const fileInput = document.getElementById("avatar-file-input");
const uploadStatusLabel = document.getElementById("upload-status-label");
const importUrlInput = document.getElementById("import-url-input");

// Link Grid Array Input Form Fields (Titles and Target URL Strings)
const l1Title = document.getElementById("l1-title");
const l1Url = document.getElementById("l1-url");
const l2Title = document.getElementById("l2-title");
const l2Url = document.getElementById("l2-url");
const l3Title = document.getElementById("l3-title");
const l3Url = document.getElementById("l3-url");

// Operational Interface Action Button Valves
const compileHubTrigger = document.getElementById("compile-hub-trigger");
const editHubValve = document.getElementById("edit-hub-valve");
const fileUploadTrigger = document.getElementById("file-upload-trigger");
const viewAvatar = document.getElementById("view-avatar");
const viewName = document.getElementById("view-name");
const viewBio = document.getElementById("view-bio");

// Forward custom box click hook natively to hidden file input selector element
fileUploadTrigger.addEventListener("click", () => fileInput.click());
/* ==========================================================================
   📸 PART 2: IN-MEMORY IMAGE CANVAS COMPRESSOR & PROFILE DISPLAY ENGINE
   ========================================================================== */

// Monitors the camera icon row natively to intercept gallery uploads
fileInput.addEventListener("change", (event) => {
    const targetingFileAsset = event.target.files;
    
    if (targetingFileAsset && targetingFileAsset[0]) {
        uploadStatusLabel.textContent = "⚡ Optimizing Photo Footprint...";
        uploadStatusLabel.style.color = "var(--primary-gold)";

        const imageFileLoader = new FileReader();
        imageFileLoader.onload = function(e) {
            const rawTemporaryImageObject = new Image();
            rawTemporaryImageObject.onload = function() {
                const hardwareCanvasCompressor = document.createElement("canvas");
                const MAX_PIXEL_BOUNDS = 120; // Structural size boundary for avatars
                
                let targetWidth = rawTemporaryImageObject.width;
                let targetHeight = rawTemporaryImageObject.height;

                // Scale image preserving proper dimensions aspect ratio natively
                if (targetWidth > targetHeight) {
                    if (targetWidth > MAX_PIXEL_BOUNDS) {
                        targetHeight *= MAX_PIXEL_BOUNDS / targetWidth;
                        targetWidth = MAX_PIXEL_BOUNDS;
                    }
                } else {
                    if (targetHeight > MAX_PIXEL_BOUNDS) {
                        targetWidth *= MAX_PIXEL_BOUNDS / targetHeight;
                        targetHeight = MAX_PIXEL_BOUNDS;
                    }
                }

                hardwareCanvasCompressor.width = targetWidth;
                hardwareCanvasCompressor.height = targetHeight;
                
                const canvasContext2D = hardwareCanvasCompressor.getContext("2d");
                canvasContext2D.drawImage(rawTemporaryImageObject, 0, 0, targetWidth, targetHeight);
                
                // Compresses the profile photo bytes by 90% into a lightweight JPEG text line
                activeAvatarBase64Stream = hardwareCanvasCompressor.toDataURL("image/jpeg", 0.6);
                
                uploadStatusLabel.textContent = "📷 Profile Photo Fully Cached!";
                uploadStatusLabel.style.color = "#ffffff";
            };
            rawTemporaryImageObject.src = e.target.result;
        };
        imageFileLoader.readAsDataURL(targetingFileAsset[0]);
    }
});

// 🔄 RENDER PROCESSED SHOWCASE PROFILE CARD ENGINE
function renderProfileCard(userProfile) {
    // Populate typography and media placeholders surgically
    viewName.textContent = userProfile.name || "";
    viewBio.textContent = userProfile.bio || "";
    viewAvatar.src = userProfile.img || DEFAULT_AVATAR;

    // Clear any previous button nodes inside the showcase link grid deck
    bioLinksTargetDeck.innerHTML = "";

    // Safely iterate through active destination link parameters
    if (userProfile.links && Array.isArray(userProfile.links)) {
        userProfile.links.forEach((linkItem) => {
            if (linkItem && linkItem.t && linkItem.u) {
                const dynamicAnchorElement = document.createElement("a");
                dynamicAnchorElement.href = linkItem.u.startsWith("http") ? linkItem.u : `https://${linkItem.u}`;
                dynamicAnchorElement.target = "_blank"; // Forces independent mobile browser tabs
                dynamicAnchorElement.className = "bio-link-button";
                dynamicAnchorElement.textContent = linkItem.t;
                
                // Append the fresh button directly to the visible preview canvas layer
                bioLinksTargetDeck.appendChild(dynamicAnchorElement);
            }
        });
    }

    // Toggle view states explicitly via style overrides
    creatorStudioPane.style.display = 'none';
    profileShowcasePane.style.display = 'block';
}
/* ==========================================================================
   ⚡ PART 3: Payload COMPILER ENGINE, GATEWAY ROUTER & LIFECYCLE LISTENERS
   ========================================================================== */

// 🛡️ RECONCILED ROUTER GATEWAY - PARSES URL INBOUND LOGS SAFELY PERMANENTLY
function runSystemStateReconciliation() {
    const activeUrlHashString = window.location.hash;

    // Check if the address bar hash contains your active profile parameter data payload cleanly
    if (activeUrlHashString && activeUrlHashString.includes("profile=")) {
        try {
            // Apply strict substring slicing and URLSearchParams to parse parameters cleanly
            const urlQueryString = activeUrlHashString.substring(1);
            const hashParams = new URLSearchParams(urlQueryString);
            const profileDataRaw = hashParams.get('profile');

            if (profileDataRaw) {
                // Clear percent symbols and unpack text object matrices safely
                const cleanJSONString = decodeURIComponent(atob(profileDataRaw));
                const userProfile = JSON.parse(cleanJSONString);
                
                // Fire your master render engine to draw the card view instantly
                renderProfileCard(userProfile);
                return; // Exit smoothly so no fallback scripts run
            }
        } catch (error) {
            console.error("Profile parsing gateway caught critical failure:", error);
        }
    }
    
    // Default fallback setup: keep showcase hidden, unroll creator studio console form
    creatorStudioPane.style.display = 'block';
    profileShowcasePane.style.display = 'none';
}

// ⚡ IMMUTABLE COMPILER TRIGGER VALVE - IMMUNE TO BROWSER ENCODING BOTTLENECKS
compileHubTrigger.addEventListener("click", () => {
    const targetName = nameInput.value ? nameInput.value.trim() : "";
    const targetBio = bioInput.value ? bioInput.value.trim() : "";

    if (targetName === "") {
        alert("🛡️ Security Notice: Please input a Public Profile Name to compile your hub.");
        return;
    }

    const linksCollectionArray = [];
    
    // Scrape form data values cleanly, ignoring empty input rows safely
    if (l1Title && l1Title.value.trim() !== "" && l1Url && l1Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l1Title.value.trim(), u: l1Url.value.trim() });
    }
    if (l2Title && l2Title.value.trim() !== "" && l2Url && l2Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l2Title.value.trim(), u: l2Url.value.trim() });
    }
    if (l3Title && l3Title.value.trim() !== "" && l3Url && l3Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l3Title.value.trim(), u: l3Url.value.trim() });
    }

    const unifiedPayloadObject = {
        name: targetName,
        bio: targetBio,
        img: activeAvatarBase64Stream || "",
        links: linksCollectionArray
    };

    try {
        const rawJsonString = JSON.stringify(unifiedPayloadObject);
        // Pure web-safe ASCII encryption token matrix using btoa and unescape wrappers
        const secureBase64HashToken = btoa(unescape(encodeURIComponent(rawJsonString)));
        const compiledMasterIdentityUrl = `${window.location.origin}${window.location.pathname}#profile=${secureBase64HashToken}`;
        
        const linkOutputDock = document.getElementById("link-output-dock");
        const compiledLinkDisplayField = document.getElementById("compiled-link-display-field");
        const manualCopyValve = document.getElementById("manual-copy-valve");

        // Hydrate and display the visual URL link container box layout on your screen
        if (linkOutputDock && compiledLinkDisplayField && manualCopyValve) {
            compiledLinkDisplayField.value = compiledMasterIdentityUrl;
            linkOutputDock.style.display = "block";
            linkOutputDock.scrollIntoView({ behavior: "smooth" });

            manualCopyValve.onclick = function() {
                navigator.clipboard.writeText(compiledMasterIdentityUrl).then(() => {
                    manualCopyValve.textContent = "✅ COPIED TO CLIPBOARD!";
                    setTimeout(() => { manualCopyValve.textContent = "📋 Copy Link To Clipboard"; }, 2500);
                }).catch(() => {
                    compiledLinkDisplayField.select();
                });
            };
        }

        // Temporarily clear active state tracking gates to bypass infinite reload logs
        window.removeEventListener("hashchange", runSystemStateReconciliation);
        
        window.location.hash = `profile=${secureBase64HashToken}`;
        renderProfileCard(unifiedPayloadObject);
        
        setTimeout(() => {
            window.addEventListener("hashchange", runSystemStateReconciliation);
        }, 100);

    } catch (err) {
        console.error("COMPILATION HANDSHAKE CRITICAL EXCEPTION:", err);
    }
});

// ⚙️ THE Sandbox EDIT CONTROL VALVE: Pre-fills forms instantly for quick updating logs
editHubValve.addEventListener("click", () => {
    const activeUrlHashString = window.location.hash;
    if (activeUrlHashString && activeUrlHashString.includes("profile=")) {
        try {
            const urlQueryString = activeUrlHashString.substring(1);
            const hashParams = new URLSearchParams(urlQueryString);
            const profileDataRaw = hashParams.get('profile');

            if (profileDataRaw) {
                const cleanJSONString = decodeURIComponent(unescape(atob(profileDataRaw)));
                const decodedPayloadObject = JSON.parse(cleanJSONString);

                nameInput.value = decodedPayloadObject.name || "";
                bioInput.value = decodedPayloadObject.bio || "";
                activeAvatarBase64Stream = decodedPayloadObject.img || "";

                if (activeAvatarBase64Stream !== "") {
                    uploadStatusLabel.textContent = "📷 Photo Extracted From Hash URL!";
                    uploadStatusLabel.style.color = "var(--primary-gold)";
                }

                const activeLinksArray = decodedPayloadObject.links || [];
                
                // Hydrate individual button fields cleanly by analyzing lengths safely
                l1Title.value = activeLinksArray[0] ? activeLinksArray[0].t : "";
                l1Url.value   = activeLinksArray[0] ? activeLinksArray[0].u : "";
                l2Title.value = activeLinksArray[1] ? activeLinksArray[1].t : "";
                l2Url.value   = activeLinksArray[1] ? activeLinksArray[1].u : "";
                l3Title.value = activeLinksArray[2] ? activeLinksArray[2].t : "";
                l3Url.value   = activeLinksArray[2] ? activeLinksArray[2].u : "";

                importUrlInput.value = window.location.href;

                creatorStudioPane.style.display = 'block';
                profileShowcasePane.style.display = 'none';
            }
        } catch (e) {
            console.error("FORM RE-POPULATION EXCEPTION:", e);
        }
    }
});

// Import checker field link stream monitor
importUrlInput.addEventListener("input", () => {
    const pasteUrlValueStream = importUrlInput.value.trim();
    if (pasteUrlValueStream.includes("profile=")) {
        const extractedHashCargoString = pasteUrlValueStream.substring(pasteUrlValueStream.indexOf("profile="));
        window.location.hash = extractedHashCargoString;
        setTimeout(() => { editHubValve.click(); importUrlInput.value = pasteUrlValueStream; }, 100);
    }
});

// 🔌 LIFECYCLE LISTENERS HOOKS: Turn on your background decoding listeners on page entry
window.addEventListener("hashchange", runSystemStateReconciliation);
window.addEventListener("load", runSystemStateReconciliation);
