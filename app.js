/* ==========================================================================
   ⚡ c37biolink ENGINE LOGIC MAINFRAME - PART 1: GLOBAL PLATFORM COCKPIT
   ========================================================================== */

// Default raw SVG vector circle badge fallback if the user skips uploading an image
const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23090d16' stroke='%23D4AF37' stroke-width='2'/><text x='50' y='55' font-family='sans-serif' font-weight='bold' font-size='18' fill='%23D4AF37' text-anchor='middle'>c37</text></svg>";

// Local variable holding our compressed in-memory profile photo string row
let activeAvatarBase64Stream = "";

// 🎯 DOM LAYER CONTROL ANCHORS - Matching your index layout IDs surgically
const creatorStudioPane = document.getElementById("creator-studio-pane");
const profileShowcasePane = document.getElementById("profile-showcase-pane");
const bioLinksTargetDeck = document.getElementById("bio-links-target-deck");

// Identity Profile Configurations Input Form Targets
const nameInput = document.getElementById("profile-name-input");
const bioInput = document.getElementById("profile-bio-input");
const fileInput = document.getElementById("avatar-file-input");
const uploadStatusLabel = document.getElementById("upload-status-label");
const importUrlInput = document.getElementById("import-url-input");

// Link Grid Array Input Form Fields (Titles and Dest URL Strings)
const l1Title = document.getElementById("l1-title");
const l1Url = document.getElementById("l1-url");
const l2Title = document.getElementById("l2-title");
const l2Url = document.getElementById("l2-url");
const l3Title = document.getElementById("l3-title");
const l3Url = document.getElementById("l3-url");

// Action Valves Operations Buttons Triggers
const compileHubTrigger = document.getElementById("compile-hub-trigger");
const editHubValve = document.getElementById("edit-hub-valve");
const fileUploadTrigger = document.getElementById("file-upload-trigger");
const viewAvatar = document.getElementById("view-avatar");
const viewName = document.getElementById("view-name");
const viewBio = document.getElementById("view-bio");

// Forward custom box click hook natively to hidden file element selector row
fileUploadTrigger.addEventListener("click", () => fileInput.click());
/* ==========================================================================
   📸 PART 2: IN-MEMORY IMAGE COMPRESSION VALVE & PROFILE DISPLAY ENGINE
   ========================================================================== */

// 📷 MONITORS THE FILE SELECTION VALVE NATIVELY
fileInput.addEventListener("change", (event) => {
    const targetingFileAsset = event.target.files[0]; // Captures the primary image instance directly
    if (targetingFileAsset) {
        uploadStatusLabel.textContent = "⚡ Optimizing Photo Footprint...";
        uploadStatusLabel.style.color = "var(--primary-gold)";

        const imageFileLoader = new FileReader();
        imageFileLoader.onload = function(e) {
            const rawTemporaryImageObject = new Image();
            rawTemporaryImageObject.onload = function() {
                const hardwareCanvasCompressor = document.createElement("canvas");
                const MAX_PIXEL_BOUNDS = 120; // Locks avatar canvas grid frame size snug to 120px
                
                let targetWidth = rawTemporaryImageObject.width;
                let targetHeight = rawTemporaryImageObject.height;

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
                
                // Downsamples image data stream footprint into a tiny web-safe JPEG string
                activeAvatarBase64Stream = hardwareCanvasCompressor.toDataURL("image/jpeg", 0.6);
                
                uploadStatusLabel.textContent = "📷 Profile Photo Fully Cached!";
                uploadStatusLabel.style.color = "#ffffff";
            };
            rawTemporaryImageObject.src = e.target.result;
        };
        imageFileLoader.readAsDataURL(targetingFileAsset);
    }
});

// 🔄 RENDER PROCESSED SHOWCASE PROFILE CARD ENGINE
function renderProfileCard(userProfile) {
    // Hydrate preview card content typography fields character-for-character
    viewName.textContent = userProfile.name;
    viewBio.textContent = userProfile.bio || "";
    
    // Assign compressed avatar string, falling back to gold-bordered vector SVG if clear
    viewAvatar.src = userProfile.img || DEFAULT_AVATAR;

    // Clear old residual button nodes inside landing target box deck
    bioLinksTargetDeck.innerHTML = "";

    // Dynamic button generator mapping rails using unified schema array properties
    if (userProfile.links && Array.isArray(userProfile.links)) {
        userProfile.links.forEach((linkItem) => {
            const dynamicAnchorElement = document.createElement("a");
            dynamicAnchorElement.href = linkItem.u.startsWith("http") ? linkItem.u : `https://${linkItem.u}`;
            dynamicAnchorElement.target = "_blank"; // Force secure browser tab separation on click
            dynamicAnchorElement.className = "bio-link-button";
            dynamicAnchorElement.textContent = linkItem.t;
            bioLinksTargetDeck.appendChild(dynamicAnchorElement);
        });
    }

    // Toggle local screen visibility view states instantly
    creatorStudioPane.classList.remove("active-view-pane");
    profileShowcasePane.classList.add("active-view-pane");
}
/* ==========================================================================
   ⚡ PART 3: UNBREAKABLE COMPILER ENGINE & URLSearchParams ROUTING GATEWAY
   ========================================================================== */

// 🛡️ RECONCILED ROUTER GATEWAY WITH SECURE STATE DECODING LOOKUPS
function runSystemStateReconciliation() {
    const activeUrlHashString = window.location.hash;

    if (activeUrlHashString.includes("profile=")) {
        try {
            const hashParams = new URLSearchParams(activeUrlHashString.substring(1));
            const profileDataRaw = hashParams.get('profile');

            if (profileDataRaw) {
                // 🚀 THE BREAKTHROUGH UPGRADE: Pristine URI decoding restores our clean JSON text array instantly
                const cleanJSONString = decodeURIComponent(profileDataRaw);
                const userProfile = JSON.parse(cleanJSONString);
                renderProfileCard(userProfile);
            }
        } catch (error) {
            console.error("Profile decoding failed:", error);
            window.location.hash = "";
            profileShowcasePane.classList.remove("active-view-pane");
            creatorStudioPane.classList.add("active-view-pane");
        }
    } else {
        profileShowcasePane.classList.remove("active-view-pane");
        creatorStudioPane.classList.add("active-view-pane");
    }
}

// ⚡ SERVERLESS COMPILER ENGINE (UNCRACKED ENCODE VARIANT)
compileHubTrigger.addEventListener("click", () => {
    const targetName = nameInput.value.trim();
    const targetBio = bioInput.value.trim();

    if (targetName === "") {
        alert("🛡️ Please input a Public Profile Name to compile your hub.");
        return;
    }

    const linksCollectionArray = [];
    if (l1Title.value.trim() !== "" && l1Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l1Title.value.trim(), u: l1Url.value.trim() });
    }
    if (l2Title.value.trim() !== "" && l2Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l2Title.value.trim(), u: l2Url.value.trim() });
    }
    if (l3Title.value.trim() !== "" && l3Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l3Title.value.trim(), u: l3Url.value.trim() });
    }

    const unifiedPayloadObject = {
        name: targetName,
        bio: targetBio,
        img: activeAvatarBase64Stream,
        links: linksCollectionArray
    };

    try {
        const rawJsonString = JSON.stringify(unifiedPayloadObject);
        
        // 🚀 BYPASSES BTOA AND PERCENT-ENCODING LIMITATIONS FOREVER!
        const secureEncodedToken = encodeURIComponent(rawJsonString);
        const compiledMasterIdentityUrl = `${window.location.origin}${window.location.pathname}#profile=${secureEncodedToken}`;
        
        const linkOutputDock = document.getElementById("link-output-dock");
        const compiledLinkDisplayField = document.getElementById("compiled-link-display-field");
        const manualCopyValve = document.getElementById("manual-copy-valve");

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

        window.removeEventListener("hashchange", runSystemStateReconciliation);
        window.location.hash = `profile=${secureEncodedToken}`;
        renderProfileCard(unifiedPayloadObject);
        
        setTimeout(() => {
            window.addEventListener("hashchange", runSystemStateReconciliation);
        }, 100);

    } catch (err) {
        console.error("COMPILATION HANDSHAKE EXCEPTION:", err);
    }
});

// ⚙️ THE Sandbox EDIT CONTROL VALVE: Pre-fills forms instantly for quick updating logs
editHubValve.addEventListener("click", () => {
    const activeUrlHashString = window.location.hash;
    if (activeUrlHashString.includes("profile=")) {
        try {
            const hashParams = new URLSearchParams(activeUrlHashString.substring(1));
            const profileDataRaw = hashParams.get('profile');

            if (profileDataRaw) {
                const cleanJSONString = decodeURIComponent(profileDataRaw);
                const decodedPayloadObject = JSON.parse(cleanJSONString);

                nameInput.value = decodedPayloadObject.name || "";
                bioInput.value = decodedPayloadObject.bio || "";
                activeAvatarBase64Stream = decodedPayloadObject.img || "";

                if (activeAvatarBase64Stream !== "") {
                    uploadStatusLabel.textContent = "📷 Photo Extracted From Hash URL!";
                    uploadStatusLabel.style.color = "var(--primary-gold)";
                }

                const activeLinksArray = decodedPayloadObject.links || [];
                l1Title.value = activeLinksArray[0] ? activeLinksArray[0].t : "";
                l1Url.value   = activeLinksArray[0] ? activeLinksArray[0].u : "";
                l2Title.value = activeLinksArray[1] ? activeLinksArray[1].t : "";
                l2Url.value   = activeLinksArray[1] ? activeLinksArray[1].u : "";
                l3Title.value = activeLinksArray[2] ? activeLinksArray[2].t : "";
                l3Url.value   = activeLinksArray[2] ? activeLinksArray[2].u : "";

                importUrlInput.value = window.location.href;

                profileShowcasePane.classList.remove("active-view-pane");
                creatorStudioPane.classList.add("active-view-pane");
            }
        } catch (e) {
            console.error("FORM RE-POPULATION EXCEPTION:", e);
        }
    }
});

// Import field link stream monitor
importUrlInput.addEventListener("input", () => {
    const pasteUrlValueStream = importUrlInput.value.trim();
    if (pasteUrlValueStream.includes("profile=")) {
        const extractedHashCargoString = pasteUrlValueStream.substring(pasteUrlValueStream.indexOf("profile="));
        window.location.hash = extractedHashCargoString;
        setTimeout(() => { editHubValve.click(); importUrlInput.value = pasteUrlValueStream; }, 100);
    }
});

// LIFECYCLE LISTENERS HOOKED AT RUNTIME ENTRY
window.addEventListener("hashchange", runSystemStateReconciliation);
window.addEventListener("DOMContentLoaded", runSystemStateReconciliation);
