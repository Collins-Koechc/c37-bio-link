/* ==========================================================================
   ⚡ C37 SMARTLABS BIOLINK CONSOLE ENGINE - GLOBAL CONTROL ARCHITECTURE
   ========================================================================== */

// Default raw SVG vector circle fallback string if the user skips uploading an image
const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23090d16' stroke='%23D4AF37' stroke-width='2'/><text x='50' y='55' font-family='sans-serif' font-weight='bold' font-size='18' fill='%23D4AF37' text-anchor='middle'>C37</text></svg>";

// Local in-memory text placeholder stream variable to hold your raw converted file photo base64 characters
let activeAvatarBase64Stream = "";

// 🎯 DOM ELEMENT CONTROL ANCHORS - Surgically matching our exact index field identifiers
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

/* ==========================================================================
   📸 ZERO-FRICTION IN-MEMORY IMAGE ENCRYPTION AND CONVERSION VALVE
   ========================================================================== */

// Intercepts the custom dark-glass action box click event to launch device file picker
fileUploadTrigger.addEventListener("click", () => {
    // Manually forwards the click hook natively to our hidden HTML file element
    fileInput.click();
});

// Monitors the file input valve container for the exact millisecond a file is selected
fileInput.addEventListener("change", (event) => {
    const targetingFileAsset = event.target.files[0];
    
    // Safety verification check: execute only if the target array contains a valid file instance
    if (targetingFileAsset) {
        // Initialize the browser's native client-side file reading engine loop
        const clientSideFileReaderEngine = new FileReader();
        
        // Update dashboard status row text dynamically to show parsing operations are executing
        uploadStatusLabel.textContent = "⚡ Syncing Profile Photo Binary...";
        uploadStatusLabel.style.color = "var(--primary-gold)";

        // Core compilation handshake: executes the instant the image file is fully parsed in memory
        clientSideFileReaderEngine.onload = function(e) {
            // Scrape the raw, compressed Base64 alphanumeric string data straight out of the stream
            activeAvatarBase64Stream = e.target.result;
            
            // Visual confirmation hook: update the label row badge to alert user of successful conversion
            uploadStatusLabel.textContent = "📷 Profile Photo Fully Cached!";
            uploadStatusLabel.style.color = "#ffffff";
            fileUploadTrigger.style.borderColor = "var(--primary-gold)";
        };

        // Convert the user's physical gallery file asset directly into an encoded data URL string loop
        clientSideFileReaderEngine.readAsDataURL(targetingFileAsset);
    }
});
/* ==========================================================================
   ⚡ THE SERVERLESS DATA SERIALIZATION AND COMPILATION MATRIX VALVE
   ========================================================================== */

// Monitors your gold button row for the exact millisecond the compile trigger fires
compileHubTrigger.addEventListener("click", () => {
    // Scrape values cleanly out of the profile identity forms
    const targetProfileName = nameInput.value.trim();
    const targetProfileBio = bioInput.value.trim();

    // Verify mandatory constraint: prevent compilation if the user typed no profile name
    if (targetProfileName === "") {
        alert("🛡️ C37 Security Notice: Please input a Public Profile Name to compile your hub.");
        return;
    }

    // Build a structured, lightweight local state object array to pack our link entries
    const linkGridsCargoArray = [];

    // Filter Loop 1: Audit Primary Input Box parameters
    if (l1Title.value.trim() !== "" && l1Url.value.trim() !== "") {
        linkGridsCargoArray.push({ t: l1Title.value.trim(), u: l1Url.value.trim() });
    }

    // Filter Loop 2: Audit Secondary Input Box parameters (Pruned safely if empty)
    if (l2Title.value.trim() !== "" && l2Url.value.trim() !== "") {
        linkGridsCargoArray.push({ t: l2Title.value.trim(), u: l2Url.value.trim() });
    }

    // Filter Loop 3: Audit Tertiary Input Box parameters (Pruned safely if empty)
    if (l3Title.value.trim() !== "" && l3Url.value.trim() !== "") {
        linkGridsCargoArray.push({ t: l3Title.value.trim(), u: l3Url.value.trim() });
    }

    // Assemble the complete global state profile package payload
    const sovereignProfileMasterPayload = {
        n: targetProfileName,
        b: targetProfileBio,
        i: activeAvatarBase64Stream, // Encodes our in-memory picture binary string row
        l: linkGridsCargoArray       // Only contains active, filled link objects
    };
    try {
        // Convert our JavaScript object payload cleanly into a raw text string line row
        const unifiedJsonPayloadString = JSON.stringify(sovereignProfileMasterPayload);
        
        // Execute Base64 Binary-to-ASCII Encryption (btoa) to scramble text characters websafely
        const cryptographicBase64HashToken = btoa(unescape(encodeURIComponent(unifiedJsonPayloadString)));
        
        // Construct your permanent, standalone database-free URL link address string
        const compiledMasterIdentityUrl = `${window.location.origin}${window.location.pathname}#profile=${cryptographicBase64HashToken}`;
        
        // 🎯 USER EXPERIENCE UPGRADE: Target our dynamic output dock components
        const linkOutputDock = document.getElementById("link-output-dock");
        const compiledLinkDisplayField = document.getElementById("compiled-link-display-field");
        const manualCopyValve = document.getElementById("manual-copy-valve");

        // Hydrate the visual text area field with their raw live URL link address character-for-character
        compiledLinkDisplayField.value = compiledMasterIdentityUrl;
        
        // Unroll the hidden display box block smoothly onto their screen interface layout
        linkOutputDock.style.display = "block";
        
        // Automatically smoothly glide their viewport display frame straight down to look at the link box
        linkOutputDock.scrollIntoView({ behavior: "smooth" });

        // Wire up our secondary manual copy button to handle clipboard transport hooks cleanly
        manualCopyValve.onclick = function() {
            navigator.clipboard.writeText(compiledMasterIdentityUrl).then(() => {
                // Flash feedback messages to guide user confidence tracking layout logs
                manualCopyValve.textContent = "✅ URL COPIED SUCCESSFULLY!";
                manualCopyValve.style.background = "#ffffff";
                manualCopyValve.style.color = "var(--bg-deep)";
                
                setTimeout(() => {
                    manualCopyValve.textContent = "📋 Copy Link To Clipboard";
                    manualCopyValve.style.background = "var(--primary-gold)";
                    manualCopyValve.style.color = "#020408";
                }, 2500);
            }).catch(() => {
                // Fallback loop: if local browser protocol blocks clipboard API, auto-select text for easy manual copying
                compiledLinkDisplayField.select();
                alert("📋 Please copy the highlighted web address link text string displayed inside the box manually right now!");
            });
        };

        // Update main compile trigger button text parameters safely
        compileHubTrigger.textContent = "✨ Profile Compiled Successfully!";
        setTimeout(() => {
            compileHubTrigger.textContent = "⚡ Compile Enterprise Bio-Link";
        }, 3000);

    } catch (compilationErrorMatrix) {
        console.error("CRITICAL ENCRYPTION HANDSHAKE EXCEPTION:", compilationErrorMatrix);
        alert("🚨 System Layout Error: Failed to scramble data stream packages. Ensure your text characters are standard alphanumeric strings.");
    }

});
/* ==========================================================================
   🔄 THE URL STATE DECODER ENGINE AND SYSTEM RECONCILIATION LAYER
   ========================================================================== */

// Core routing gate: parses the URL address bar data to build or display profiles
function runSystemStateReconciliation() {
    const activeUrlHashString = window.location.hash;

    // Condition A: If the link contains encrypted profile data cargo parameters
    if (activeUrlHashString.startsWith("#profile=")) {
        try {
            // Extract the pure Base64 cryptographic hash token out of the string row
            const targetBase64Token = activeUrlHashString.replace("#profile=", "");
            
            // Execute Base64 ASCII-to-Binary Decryption (atob) to reverse the scramble loop
            const decodedJsonTextStream = decodeURIComponent(escape(atob(targetBase64Token)));
            
            // Unpack the decoded text stream cleanly back into a JavaScript object package
            const profileStateDataPayload = JSON.parse(decodedJsonTextStream);

            // 👤 HYDRATE PREVIEW CARD TYPOGRAPHY AND IMAGE CONTENT MARGINS
            viewName.textContent = profileStateDataPayload.n;
            viewBio.textContent = profileStateDataPayload.b || "";
            
            // Assign converted avatar picture string, falling back to vector SVG if clear
            viewAvatar.src = profileStateDataPayload.i || DEFAULT_AVATAR;

            // Clear old residual button components inside the landing deck target box
            bioLinksTargetDeck.innerHTML = "";

            // Dynamic Button Spawning Loop: map active entries out of the array cargo
            profileStateDataPayload.l.forEach((individualLinkObject) => {
                const dynamicAnchorElement = document.createElement("a");
                dynamicAnchorElement.href = individualLinkObject.u;
                dynamicAnchorElement.target = "_blank"; // Force secure tab separation on click
                dynamicAnchorElement.className = "bio-link-button";
                dynamicAnchorElement.textContent = individualLinkObject.t;
                
                // Drop the compiled gradient button directly onto the showcase deck layout
                bioLinksTargetDeck.appendChild(dynamicAnchorElement);
            });

            // Toggle view visibility state: hide creation form, display premium profile card
            creatorStudioPane.classList.remove("active-view-pane");
            profileShowcasePane.classList.add("active-view-pane");

        } catch (decryptionHandshakeException) {
            console.error("CRITICAL ROUTING DECODER FAILURE:", decryptionHandshakeException);
            alert("🚨 System Warning: Broken profile link signature tracking. Redirecting to your Creator Console cockpit form.");
            window.location.hash = "";
        }

    // Condition B: If the URL is raw, clear out old states and unroll the creation dashboard forms
    } else {
        profileShowcasePane.classList.remove("active-view-pane");
        creatorStudioPane.classList.add("active-view-pane");
    }
}

// ⚙️ THE SANDBOX EDIT CONTROL VALVE: Pre-fills forms instantly for quick updating logs
editHubValve.addEventListener("click", () => {
    const activeUrlHashString = window.location.hash;

    if (activeUrlHashString.startsWith("#profile=")) {
        try {
            const targetBase64Token = activeUrlHashString.replace("#profile=", "");
            const decodedJsonTextStream = decodeURIComponent(escape(atob(targetBase64Token)));
            const profileStateDataPayload = JSON.parse(decodedJsonTextStream);

            // Populate identity form boxes with existing text parameters automatically
            nameInput.value = profileStateDataPayload.n;
            bioInput.value = profileStateDataPayload.b || "";
            activeAvatarBase64Stream = profileStateDataPayload.i || "";

            // Update photo selector status message to inform user data is ready for modification
            if (activeAvatarBase64Stream !== "") {
                uploadStatusLabel.textContent = "📷 Photo Loaded From Active Link!";
                uploadStatusLabel.style.color = "var(--primary-gold)";
            }

            // Restore links input forms data, pre-filling only if elements are index tracked
            l1Title.value = profileStateDataPayload.l[0] ? profileStateDataPayload.l[0].t : "";
            l1Url.value   = profileStateDataPayload.l[0] ? profileStateDataPayload.l[0].u : "";
            l2Title.value = profileStateDataPayload.l[1] ? profileStateDataPayload.l[1].t : "";
            l2Url.value   = profileStateDataPayload.l[1] ? profileStateDataPayload.l[1].u : "";
            l3Title.value = profileStateDataPayload.l[2] ? profileStateDataPayload.l[2].t : "";
            l3Url.value   = profileStateDataPayload.l[2] ? profileStateDataPayload.l[2].u : "";

            // Fill import url checker bar with current link to ease verification updates
            importUrlInput.value = window.location.href;

            // Instantly route user back to the studio input console card deck view
            profileShowcasePane.classList.remove("active-view-pane");
            creatorStudioPane.classList.add("active-view-pane");

        } catch (formHydrationError) {
            console.error("FORM HYDRATION SYSTEM EXCEPTION:", formHydrationError);
        }
    }
});

// 📥 QUICK IMPORT VALVE MONITOR: Listens to pastes inside your import field box
importUrlInput.addEventListener("input", () => {
    const pasteUrlValueStream = importUrlInput.value.trim();
    
    // Scrape hash parameters safely if the user pastes their full link address string
    if (pasteUrlValueStream.includes("#profile=")) {
        const extractedHashCargoString = pasteUrlValueStream.substring(pasteUrlValueStream.indexOf("#profile="));
        window.location.hash = extractedHashCargoString;
        
        // Trigger verification change and auto-hydrate input rows immediately
        setTimeout(() => {
            editHubValve.click();
            importUrlInput.value = pasteUrlValueStream; // Keep value readable in input field
        }, 100);
    }
});

// 🔌 LIFECYCLE LISTENERS HOOKS: Run state decoders on page entry and window changes
window.addEventListener("hashchange", runSystemStateReconciliation);
window.addEventListener("DOMContentLoaded", runSystemStateReconciliation);



