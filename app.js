/* ==========================================================================
   ⚡ c37biolink FULL-STACK MASTER CONTROLLER LOGIC ENGINE - PART 1
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
   📸 IN-MEMORY IMAGE COMPRESSOR LOOP & SHOWCASE RENDERER
   ========================================================================== */

// 📷 MONITORS THE VALVE CONTAINER FOR LOCAL PHOTO SELECTION
fileInput.addEventListener("change", (event) => {
    const targetingFileAsset = event.target.files[0];
    if (targetingFileAsset) {
        uploadStatusLabel.textContent = "⚡ Optimizing Photo Footprint...";
        uploadStatusLabel.style.color = "var(--primary-gold)";

        const imageFileLoader = new FileReader();
        imageFileLoader.onload = function(e) {
            const rawTemporaryImageObject = new Image();
            rawTemporaryImageObject.onload = function() {
                // Initialize an in-memory canvas scanner container layout layer
                const hardwareCanvasCompressor = document.createElement("canvas");
                const MAX_PIXEL_BOUNDS = 120; // Tight structural constraint for avatars
                
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
                
                // Compress image to JPEG format with highly optimized quality parameters
                activeAvatarBase64Stream = hardwareCanvasCompressor.toDataURL("image/jpeg", 0.7);
                
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
    // Hydrate preview card content fields surgically character-for-character
    viewName.textContent = userProfile.name;
    viewBio.textContent = userProfile.bio || "";
    viewAvatar.src = userProfile.img || DEFAULT_AVATAR;

    // Clear old residual button nodes inside landing target box deck
    bioLinksTargetDeck.innerHTML = "";

    // Dynamic button generator mapping rails using unified schema keys
    if (userProfile.links && Array.isArray(userProfile.links)) {
        userProfile.links.forEach((linkItem) => {
            const dynamicAnchorElement = document.createElement("a");
            dynamicAnchorElement.href = linkItem.u.startsWith("http") ? linkItem.u : `https://${linkItem.u}`;
            dynamicAnchorElement.target = "_blank"; // Force secure tab separation on click
            dynamicAnchorElement.className = "bio-link-button";
            dynamicAnchorElement.textContent = linkItem.t;
            bioLinksTargetDeck.appendChild(dynamicAnchorElement);
        });
    }

    // Toggle local viewport view states cleanly
    creatorStudioPane.classList.remove("active-view-pane");
    profileShowcasePane.classList.add("active-view-pane");
}
/* ==========================================================================
   ⚡ SERVERLESS ENCRYPTION COMPILER ENGINE (KILLS RECURSIVE RE-LOAD LOOPS)
   ========================================================================== */
compileHubTrigger.addEventListener("click", () => {
    const targetName = nameInput.value.trim();
    const targetBio = bioInput.value.trim();

    // Verify structural constraint: prevent compile if name field is empty
    if (targetName === "") {
        alert("🛡️ Please input a Public Profile Name to compile your hub.");
        return;
    }

    const linksCollectionArray = [];
    
    // Filter rows 1, 2, and 3, pruning away empty input fields safely
    if (l1Title.value.trim() !== "" && l1Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l1Title.value.trim(), u: l1Url.value.trim() });
    }
    if (l2Title.value.trim() !== "" && l2Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l2Title.value.trim(), u: l2Url.value.trim() });
    }
    if (l3Title.value.trim() !== "" && l3Url.value.trim() !== "") {
        linksCollectionArray.push({ t: l3Title.value.trim(), u: l3Url.value.trim() });
    }

    // UNIFIED DATA SCHEMA: Maps character-for-character with reader logic parameters
    const unifiedPayloadObject = {
        name: targetName,
        bio: targetBio,
        img: activeAvatarBase64Stream,
        links: linksCollectionArray
    };

    try {
        const rawJsonString = JSON.stringify(unifiedPayloadObject);
        // Base64 serialization
        const secureBase64HashToken = btoa(rawJsonString);
        const compiledMasterIdentityUrl = `${window.location.origin}${window.location.pathname}#profile=${secureBase64HashToken}`;
        
        const linkOutputDock = document.getElementById("link-output-dock");
        const compiledLinkDisplayField = document.getElementById("compiled-link-display-field");
        const manualCopyValve = document.getElementById("manual-copy-valve");

        // Hydrate and reveal output box layout if elements are present on page
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

        // 🌟 THE SAFETY DISCONNECT LAYER: Prevents infinite loop triggers during compile state shifts
        window.removeEventListener("hashchange", runSystemStateReconciliation);
        
        // Inject hash payload cleanly behind address bar
        window.location.hash = `profile=${secureBase64HashToken}`;
        
        // Instantly switch view states and render showcase profile card natively in memory
        renderProfileCard(unifiedPayloadObject);
        
        // Re-attach routing decoder listener after safe sub-second layout stabilization window
        setTimeout(() => {
            window.addEventListener("hashchange", runSystemStateReconciliation);
        }, 100);

    } catch (err) {
        console.error("COMPILATION HANDSHAKE EXCEPTION:", err);
    }
});
/* ==========================================================================
   🔄 THE URLSearchParams STATE DECODER & FORM REPOPULATION VALVE
   ========================================================================== */

// 🛡️ RECONCILED ROUTER GATEWAY WITH SECURE URL SEARCH PARAMETERS LOOKUPS
function runSystemStateReconciliation() {
    // 1. Locate window.location.hash and strip the leading '#' marker
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const profileDataRaw = hashParams.get('profile');

    if (profileDataRaw) {
        try {
            // 2. Clean up browser percent-encoding (%7B, %22, %3D) and decode Base64
            const cleanJSONString = decodeURIComponent(atob(profileDataRaw));
            
            // 3. Safely parse the clean object string array
            const userProfile = JSON.parse(cleanJSONString);
            
            // 4. Render the profile view using our unified function anchor
            renderProfileCard(userProfile);
            
        } catch (error) {
            console.error("Profile decryption failed:", error);
            // Graceful error callback: clear corrupted state and stay inside creation forms cockpit
            window.location.hash = "";
            profileShowcasePane.classList.remove("active-view-pane");
            creatorStudioPane.classList.add("active-view-pane");
        }
    } else {
        profileShowcasePane.classList.remove("active-view-pane");
        creatorStudioPane.classList.add("active-view-pane");
    }
}

// ⚙️ THE SANDBOX EDIT CONTROL VALVE: Pre-fills forms instantly for quick updating logs
editHubValve.addEventListener("click", () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const profileDataRaw = hashParams.get('profile');

    if (profileDataRaw) {
        try {
            const cleanJSONString = decodeURIComponent(atob(profileDataRaw));
            const decodedPayloadObject = JSON.parse(cleanJSONString);

            // Populate identity form boxes with existing text parameters automatically
            nameInput.value = decodedPayloadObject.name || "";
            bioInput.value = decodedPayloadObject.bio || "";
            activeAvatarBase64Stream = decodedPayloadObject.img || "";

            if (activeAvatarBase64Stream !== "") {
                uploadStatusLabel.textContent = "📷 Photo Extracted From Hash URL!";
                uploadStatusLabel.style.color = "var(--primary-gold)";
            }

            // 🎯 FIXED ARRAY INDEX ROWS: Surgically extracting using clean array tracking gates
            const activeLinksArray = decodedPayloadObject.links || [];

            // Hydrate Button 1 inputs safely using explicit index row 0 parameters
            if (activeLinksArray[0]) {
                l1Title.value = activeLinksArray[0].t || "";
                l1Url.value   = activeLinksArray[0].u || "";
            } else {
                l1Title.value = ""; l1Url.value = "";
            }

            // Hydrate Button 2 inputs safely using explicit index row 1 parameters
            if (activeLinksArray[1]) {
                l2Title.value = activeLinksArray[1].t || "";
                l2Url.value   = activeLinksArray[1].u || "";
            } else {
                l2Title.value = ""; l2Url.value = "";
            }

            // Hydrate Button 3 inputs safely using explicit index row 2 parameters
            if (activeLinksArray[2]) {
                l3Title.value = activeLinksArray[2].t || "";
                l3Url.value   = activeLinksArray[2].u || "";
            } else {
                l3Title.value = ""; l3Url.value = "";
            }

            // Fill import url checker bar with current link to ease verification updates
            importUrlInput.value = window.location.href;

            // Instantly transition screen visibility pane state to display creation form cockpit
            profileShowcasePane.classList.remove("active-view-pane");
            creatorStudioPane.classList.add("active-view-pane");

        } catch (formHydrationError) {
            console.error("FORM RE-POPULATION EXCEPTION:", formHydrationError);
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

// 🔌 LIFECYCLE LISTENERS HOOKS: Run state decoders on page entry and window changes
window.addEventListener("hashchange", runSystemStateReconciliation);
window.addEventListener("DOMContentLoaded", runSystemStateReconciliation);
