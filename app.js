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

/* ==========================================================================
   📷 IN-MEMORY IMAGE CANVAS COMPRESSOR (KILLS BROWSER STRING BLOWOUTS)
   ========================================================================== */
fileInput.addEventListener("change", (event) => {
    const targetingFileAsset = event.target.files[0]; // Surgically targets the primary file token
    
    if (targetingFileAsset) {
        uploadStatusLabel.textContent = "⚡ Optimizing Photo Footprint...";
        uploadStatusLabel.style.color = "var(--primary-gold)";

        const imageFileLoader = new FileReader();
        imageFileLoader.onload = function(e) {
            const rawTemporaryImageObject = new Image();
            rawTemporaryImageObject.onload = function() {
                // Initialize an in-memory canvas container layout layer
                const hardwareCanvasCompressor = document.createElement("canvas");
                const MAX_PIXEL_BOUNDS = 120; // Forces avatar box dimensions snugly to 120px
                
                let targetWidth = rawTemporaryImageObject.width;
                let targetHeight = rawTemporaryImageObject.height;

                // Mathematical scaling proportion logic to preserve image aspect ratio
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
                
                // Squeezes image data footprint by 90% into a lightweight web-safe JPEG string
                activeAvatarBase64Stream = hardwareCanvasCompressor.toDataURL("image/jpeg", 0.7);
                
                uploadStatusLabel.textContent = "📷 Photo Compacted & Cached!";
                uploadStatusLabel.style.color = "#ffffff";
            };
            rawTemporaryImageObject.src = e.target.result;
        };
        imageFileLoader.readAsDataURL(targetingFileAsset);
    }
});

/* ==========================================================================
   ⚡ SERVERLESS DATA SERIALIZATION AND ENCRYPTION COMPILER VALVE
   ========================================================================== */
compileHubTrigger.addEventListener("click", () => {
    // Scrape values cleanly out of the active input forms
    const targetName = nameInput.value.trim();
    const targetBio = bioInput.value.trim();

    // Verify structural constraint: prevent compile if name field is empty
    if (targetName === "") {
        alert("🛡️ C37 Security Notice: Please input a Public Profile Name to compile your hub.");
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

    // UNIFIED STRUCTURAL SCHEMA: Key names mapped character-for-character with viewer logic
    const unifiedPayloadObject = {
        name: targetName,
        bio: targetBio,
        img: activeAvatarBase64Stream,
        links: linksCollectionArray
    };

    try {
        const rawJsonString = JSON.stringify(unifiedPayloadObject);
        
        // Web-safe URI component mapping to protect symbols and special characters from corruption
        const secureBase64HashToken = btoa(encodeURIComponent(rawJsonString));
        
        // Construct your permanent standalone URL hash link address string
        const compiledMasterIdentityUrl = `${window.location.origin}${window.location.pathname}#profile=${secureBase64HashToken}`;
        
        // Capture output elements dynamically from the active index DOM tree
        const linkOutputDock = document.getElementById("link-output-dock");
        const compiledLinkDisplayField = document.getElementById("compiled-link-display-field");
        const manualCopyValve = document.getElementById("manual-copy-valve");

        // Inject compiled string directly into read-only terminal display box
        compiledLinkDisplayField.value = compiledMasterIdentityUrl;
        
        // Turn on visibility block and smoothly glide viewport down to reveal output dock
        linkOutputDock.style.display = "block";
        linkOutputDock.scrollIntoView({ behavior: "smooth" });

        // Bind interactive copy button event actions cleanly
        manualCopyValve.onclick = function() {
            navigator.clipboard.writeText(compiledMasterIdentityUrl).then(() => {
                // Instantly notify user of successful asset tracking delivery via text flash
                manualCopyValve.textContent = "✅ COPIED TO CLIPBOARD!";
                setTimeout(() => { manualCopyValve.textContent = "📋 Copy Link To Clipboard"; }, 2500);
            }).catch(() => {
                // Fallback loop: auto-select text layout parameters if clipboard permission is blocked local
                compiledLinkDisplayField.select();
                alert("Please copy the highlighted web address link manually right now inside the box container!");
            });
        };

        // Update branch hash parameters instantly to trigger reactive rendering changes live
        window.location.hash = `profile=${secureBase64HashToken}`;

    } catch (err) {
        console.error("COMPILATION HANDSHAKE CRITICAL ERROR:", err);
        alert("🚨 System Layout Error: Data stream corruption detected during serialization processing loops.");
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
            
            // Execute Base64 ASCII-to-Binary Decryption (atob) and reverse URI encoding
            const decodedJsonTextStream = decodeURIComponent(atob(targetBase64Token));
            
            // Unpack the decoded text stream cleanly back into a JavaScript object package
            const decodedPayloadObject = JSON.parse(decodedJsonTextStream);

            // 👤 HYDRATE PREVIEW CARD TYPOGRAPHY AND IMAGE CONTENT MARGINS
            viewName.textContent = decodedPayloadObject.name;
            viewBio.textContent = decodedPayloadObject.bio || "";
            
            // Assign converted avatar picture string, falling back to vector SVG if clear
            viewAvatar.src = decodedPayloadObject.img || DEFAULT_AVATAR;

            // Clear old residual button components inside the landing deck target box
            bioLinksTargetDeck.innerHTML = "";

            // Dynamic Button Spawning Loop: map active entries out of the array cargo
            decodedPayloadObject.links.forEach((linkItem) => {
                const dynamicAnchorElement = document.createElement("a");
                // Safety protocol: ensure links feature protocol anchors to prevent local path breaking
                dynamicAnchorElement.href = linkItem.u.startsWith("http") ? linkItem.u : `https://${linkItem.u}`;
                dynamicAnchorElement.target = "_blank"; // Force secure tab separation on click
                dynamicAnchorElement.className = "bio-link-button";
                dynamicAnchorElement.textContent = linkItem.t;
                
                // Drop the compiled gradient button directly onto the showcase deck layout
                bioLinksTargetDeck.appendChild(dynamicAnchorElement);
            });

            // Toggle view visibility state: hide creation form, display premium profile card
            creatorStudioPane.classList.remove("active-view-pane");
            profileShowcasePane.classList.add("active-view-pane");

        } catch (decryptionException) {
            console.error("ROUTING DECODER CRITICAL FAILURE:", decryptionException);
            alert("🚨 System Warning: Invalid or corrupted profile link format. Restoring Creator Console workspace.");
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
            const decodedJsonTextStream = decodeURIComponent(atob(targetBase64Token));
            const decodedPayloadObject = JSON.parse(decodedJsonTextStream);

            // Populate identity form boxes with existing text parameters automatically
            nameInput.value = decodedPayloadObject.name;
            bioInput.value = decodedPayloadObject.bio || "";
            activeAvatarBase64Stream = decodedPayloadObject.img || "";

            // Update photo selector status message to inform user data is ready for modification
            if (activeAvatarBase64Stream !== "") {
                uploadStatusLabel.textContent = "📷 Photo Extracted From Hash URL!";
                uploadStatusLabel.style.color = "var(--primary-gold)";
            }

            // Restore links input forms data, checking indexing boundaries carefully
            l1Title.value = decodedPayloadObject.links && decodedPayloadObject.links[0] ? decodedPayloadObject.links[0].t : "";
            l1Url.value   = decodedPayloadObject.links && decodedPayloadObject.links[0] ? decodedPayloadObject.links[0].u : "";
            l2Title.value = decodedPayloadObject.links && decodedPayloadObject.links[1] ? decodedPayloadObject.links[1].t : "";
            l2Url.value   = decodedPayloadObject.links && decodedPayloadObject.links[1] ? decodedPayloadObject.links[1].u : "";
            l3Title.value = decodedPayloadObject.links && decodedPayloadObject.links[2] ? decodedPayloadObject.links[2].t : "";
            l3Url.value   = decodedPayloadObject.links && decodedPayloadObject.links[2] ? decodedPayloadObject.links[2].u : "";

            // Fill import url checker bar with current link to ease verification updates
            importUrlInput.value = window.location.href;

            // Instantly route user back to the studio input console card deck view
            profileShowcasePane.classList.remove("active-view-pane");
            creatorStudioPane.classList.add("active-view-pane");

        } catch (formHydrationError) {
            console.error("FORM RE-POPULATION SYSTEM EXCEPTION:", formHydrationError);
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
