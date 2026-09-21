// ==========================================================================
// HELL ENERGY // Direct Telemetry Frontend Controller
// Preserving all existing functionality and IDs with enhanced UI interactions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements - Home Navigation & Actions
  const homePage = document.getElementById("homePage");
  const homeBtn = document.getElementById("homeBtn");
  const aboutBtn = document.getElementById("aboutBtn");
  const servicesBtn = document.getElementById("servicesBtn");
  const contactBtn = document.getElementById("contactBtn");
  const headerOrderBtn = document.getElementById("headerOrderBtn");
  const themeToggle = document.getElementById("themeToggle");

  // Elements - Sections
  const homeSection = document.getElementById("homeSection");
  const aboutSection = document.getElementById("aboutSection");
  const servicesSection = document.getElementById("servicesSection");
  const contactSection = document.getElementById("contactSection");
  const crateSection = document.getElementById("crateSection");
  const powerMatrixSection = document.getElementById("powerMatrixSection");

  // Elements - Details Form Modal
  const addDetailsBtn = document.getElementById("addDetailsBtn");
  const detailsForm = document.getElementById("detailsForm");
  const overlay = document.getElementById("overlay");
  const submitDetail = document.getElementById("submitDetails");
  const closeDetailsModal = document.getElementById("closeDetailsModal");
  const cancelDetailsBtn = document.getElementById("cancelDetailsBtn");

  // Modal Inputs & Error Spans
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const pincodeInput = document.getElementById("pincode");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const addressError = document.getElementById("addressError");
  const cityError = document.getElementById("cityError");
  const pincodeError = document.getElementById("pincodeError");

  // Elements - Popup Notification
  const popup = document.getElementById("popup");

  // Elements - Crate Builder & Cart
  const packCards = document.querySelectorAll(".pack-option-card");
  const summaryPackName = document.getElementById("summaryPackName");
  const summaryBasePrice = document.getElementById("summaryBasePrice");
  const summaryDiscount = document.getElementById("summaryDiscount");
  const summaryFinalPrice = document.getElementById("summaryFinalPrice");
  const qtyMinusBtn = document.getElementById("qtyMinusBtn");
  const qtyPlusBtn = document.getElementById("qtyPlusBtn");
  const qtyDisplay = document.getElementById("qtyDisplay");
  const crateCheckoutBtn = document.getElementById("crateCheckoutBtn");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const mobileBarPrice = document.getElementById("mobileBarPrice");
  const mobileAddCrateBtn = document.getElementById("mobileAddCrateBtn");

  // Elements - Mobile Navigation Drawer
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileDrawerOverlay = document.getElementById("mobileDrawerOverlay");
  const mobileDrawerClose = document.getElementById("mobileDrawerClose");
  const mHomeBtn = document.getElementById("mHomeBtn");
  const mAboutBtn = document.getElementById("mAboutBtn");
  const mServicesBtn = document.getElementById("mServicesBtn");
  const mCrateBtn = document.getElementById("mCrateBtn");
  const mMatrixBtn = document.getElementById("mMatrixBtn");
  const mContactBtn = document.getElementById("mContactBtn");
  const mAddDetailsBtn = document.getElementById("mAddDetailsBtn");

  // Hero interactive buttons
  const heroOrderBtn = document.getElementById("heroOrderBtn");
  const exploreMatrixBtn = document.getElementById("exploreMatrixBtn");
  const subscribeBtn = document.getElementById("subscribeBtn");
  const newsletterEmail = document.getElementById("newsletterEmail");

  // State
  let currentPack = {
    id: "24-pack",
    name: "24-Can Party Tray",
    price: 29.99,
    basePrice: 36.99,
    discountText: "-$7.00 (20%)"
  };
  let quantity = 1;
  let cartTotalCount = 1;

  // ==========================================================================
  // 1. POPUP NOTIFICATION (Preserving showPopup logic & types)
  // ==========================================================================
  let popupTimeout = null;
  function showPopup(msg, type) {
    if (popupTimeout) clearTimeout(popupTimeout);

    popup.textContent = msg;
    popup.style.display = "block";

    if (type === "error") {
      popup.style.border = "2px solid #ff1e27";
      popup.style.boxShadow = "0 8px 30px rgba(255, 30, 39, 0.4)";
      popup.style.color = "#ff6b72";
    } else if (type === "success") {
      popup.style.border = "2px solid #10b981";
      popup.style.boxShadow = "0 8px 30px rgba(16, 185, 129, 0.4)";
      popup.style.color = "#34d399";
    } else if (type === "invalid") {
      popup.style.border = "2px solid #3b82f6";
      popup.style.boxShadow = "0 8px 30px rgba(59, 130, 246, 0.4)";
      popup.style.color = "#60a5fa";
    } else {
      popup.style.border = "2px solid var(--border-color)";
      popup.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.5)";
      popup.style.color = "var(--text-primary)";
    }

    popupTimeout = setTimeout(() => {
      popup.style.display = "none";
    }, 3200);
  }

  // ==========================================================================
  // 2. HEADER QUICK ORDER & CART ACTIONS
  // ==========================================================================
  const cartBadgeBtn = document.getElementById("cartBadgeBtn");

  if (headerOrderBtn && crateSection) {
    headerOrderBtn.addEventListener("click", () => {
      crateSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (cartBadgeBtn && crateSection) {
    cartBadgeBtn.addEventListener("click", () => {
      crateSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ==========================================================================
  // 6. THEME TOGGLE (Dark / Light Mode)
  // ==========================================================================
  function syncTheme() {
    if (themeToggle) {
      if (themeToggle.checked) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    }
  }

  // Initialize theme on load
  syncTheme();

  if (themeToggle) {
    themeToggle.addEventListener("change", syncTheme);
  }

  // ==========================================================================
  // 7. NAVIGATION SMOOTH SCROLLING
  // ==========================================================================
  if (homeBtn && homeSection) {
    homeBtn.addEventListener("click", () => {
      homeSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (aboutBtn && aboutSection) {
    aboutBtn.addEventListener("click", () => {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (servicesBtn && servicesSection) {
    servicesBtn.addEventListener("click", () => {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (contactBtn && contactSection) {
    contactBtn.addEventListener("click", () => {
      contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ==========================================================================
  // 7b. MOBILE NAVIGATION DRAWER CONTROLLER
  // ==========================================================================
  function openMobileDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add("active");
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add("active");
    if (mobileMenuToggle) mobileMenuToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove("active");
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove("active");
    if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains("active")) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener("click", closeMobileDrawer);
  }

  if (mobileDrawerOverlay) {
    mobileDrawerOverlay.addEventListener("click", closeMobileDrawer);
  }

  // Mobile drawer links mapping
  const mNavMappings = [
    { btn: mHomeBtn, sec: homeSection },
    { btn: mAboutBtn, sec: aboutSection },
    { btn: mServicesBtn, sec: servicesSection },
    { btn: mCrateBtn, sec: crateSection },
    { btn: mMatrixBtn, sec: powerMatrixSection },
    { btn: mContactBtn, sec: contactSection }
  ];

  mNavMappings.forEach(({ btn, sec }) => {
    if (btn && sec) {
      btn.addEventListener("click", () => {
        closeMobileDrawer();
        sec.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  if (mAddDetailsBtn) {
    mAddDetailsBtn.addEventListener("click", () => {
      closeMobileDrawer();
      openDetailsModal();
    });
  }

  // Hero Quick Actions
  if (heroOrderBtn && crateSection) {
    heroOrderBtn.addEventListener("click", () => {
      crateSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (exploreMatrixBtn && powerMatrixSection) {
    exploreMatrixBtn.addEventListener("click", () => {
      powerMatrixSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ==========================================================================
  // 8. DETAILS FORM MODAL (Preserving addDetailsBtn, modal open/close, validation)
  // ==========================================================================
  function openDetailsModal() {
    if (detailsForm && overlay) {
      detailsForm.style.display = "flex";
      overlay.style.display = "block";
      clearErrors();
    }
  }

  function closeDetailsModalHandler() {
    if (detailsForm && overlay) {
      detailsForm.style.display = "none";
      overlay.style.display = "none";
    }
  }

  if (addDetailsBtn) {
    addDetailsBtn.addEventListener("click", openDetailsModal);
  }

  if (closeDetailsModal) {
    closeDetailsModal.addEventListener("click", closeDetailsModalHandler);
  }

  if (cancelDetailsBtn) {
    cancelDetailsBtn.addEventListener("click", closeDetailsModalHandler);
  }

  if (overlay) {
    overlay.addEventListener("click", closeDetailsModalHandler);
  }

  function clearErrors() {
    if (nameError) nameError.textContent = "";
    if (phoneError) phoneError.textContent = "";
    if (addressError) addressError.textContent = "";
    if (cityError) cityError.textContent = "";
    if (pincodeError) pincodeError.textContent = "";
  }

  if (submitDetail) {
    submitDetail.addEventListener("click", () => {
      clearErrors();

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const address = addressInput ? addressInput.value.trim() : "";
      const city = cityInput ? cityInput.value.trim() : "";
      const pincode = pincodeInput ? pincodeInput.value.trim() : "";

      let isValid = true;

      if (name === "") {
        if (nameError) nameError.textContent = "Please enter operative name";
        isValid = false;
      }

      if (phone === "") {
        if (phoneError) phoneError.textContent = "Please enter tactical phone number";
        isValid = false;
      } else if (phone.length < 7) {
        if (phoneError) phoneError.textContent = "Please enter a valid phone number (min 7 digits)";
        isValid = false;
      }

      if (address === "") {
        if (addressError) addressError.textContent = "Please enter headquarters delivery address";
        isValid = false;
      }

      if (city === "") {
        if (cityError) cityError.textContent = "Please enter city / sector zone";
        isValid = false;
      }

      if (pincode === "") {
        if (pincodeError) pincodeError.textContent = "Please enter postal PIN code";
        isValid = false;
      } else if (pincode.length < 4) {
        if (pincodeError) pincodeError.textContent = "Invalid PIN code (min 4 digits)";
        isValid = false;
      }

      if (isValid) {
        showPopup("Operative profile & address registered successfully!", "success");
        setTimeout(() => {
          closeDetailsModalHandler();
          if (nameInput) nameInput.value = "";
          if (phoneInput) phoneInput.value = "";
          if (addressInput) addressInput.value = "";
          if (cityInput) cityInput.value = "";
          if (pincodeInput) pincodeInput.value = "";
        }, 600);
      } else {
        showPopup("Please resolve required manifest fields.", "error");
      }
    });
  }

  // ==========================================================================
  // 9. CRATE BUILDER & PACK SELECTION (Stitch Feature)
  // ==========================================================================
  const packsData = {
    "single": {
      name: "Single 250ml Can",
      price: 1.99,
      basePrice: 1.99,
      discountText: "$0.00 (Standard)"
    },
    "6-pack": {
      name: "6-Pack Starter Box",
      price: 9.99,
      basePrice: 11.94,
      discountText: "-$1.95 (16%)"
    },
    "24-pack": {
      name: "24-Can Party Tray",
      price: 29.99,
      basePrice: 36.99,
      discountText: "-$7.00 (20%)"
    },
    "48-pack": {
      name: "48-Can Armory Case",
      price: 54.99,
      basePrice: 73.98,
      discountText: "-$18.99 (25%)"
    }
  };

  function updateCrateTelemetry() {
    const totalBase = (currentPack.basePrice * quantity).toFixed(2);
    const totalFinal = (currentPack.price * quantity).toFixed(2);

    if (summaryPackName) summaryPackName.textContent = currentPack.name;
    if (summaryBasePrice) summaryBasePrice.textContent = `$${totalBase}`;
    if (summaryDiscount) summaryDiscount.textContent = currentPack.discountText;
    if (summaryFinalPrice) summaryFinalPrice.textContent = `$${totalFinal}`;
    if (mobileBarPrice) mobileBarPrice.textContent = `$${totalFinal}`;
  }

  packCards.forEach((card) => {
    card.addEventListener("click", () => {
      packCards.forEach((c) => {
        c.classList.remove("active-pack");
        const dot = c.querySelector(".radio-circle");
        if (dot) dot.classList.remove("active");
      });

      card.classList.add("active-pack");
      const activeDot = card.querySelector(".radio-circle");
      if (activeDot) activeDot.classList.add("active");

      const packKey = card.getAttribute("data-pack");
      if (packsData[packKey]) {
        currentPack = { id: packKey, ...packsData[packKey] };
        updateCrateTelemetry();
      }
    });
  });

  // Combat cards trigger pack selection and scroll to crate
  const combatButtons = document.querySelectorAll(".combat-card-btn");
  combatButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const packType = btn.getAttribute("data-pack");
      const targetCard = document.querySelector(`.pack-option-card[data-pack="${packType}"]`);
      if (targetCard) {
        targetCard.click();
      }
      if (crateSection) {
        crateSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Quantity Stepper
  if (qtyMinusBtn && qtyPlusBtn && qtyDisplay) {
    qtyMinusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        updateCrateTelemetry();
      }
    });

    qtyPlusBtn.addEventListener("click", () => {
      if (quantity < 50) {
        quantity++;
        qtyDisplay.textContent = quantity;
        updateCrateTelemetry();
      }
    });
  }

  // Checkout Buttons
  function handleCrateCheckout() {
    cartTotalCount += quantity;
    if (cartCountBadge) cartCountBadge.textContent = cartTotalCount;

    // Save crate order state to localStorage for seamless checkout hydration
    const orderPayload = {
      pack: {
        id: currentPack.id,
        name: currentPack.name,
        price: currentPack.price,
        basePrice: currentPack.basePrice,
        discountText: currentPack.discountText
      },
      quantity: quantity,
      total: (currentPack.price * quantity).toFixed(2)
    };

    try {
      localStorage.setItem("hell_crate_order", JSON.stringify(orderPayload));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    showPopup(`Routing ${quantity}x ${currentPack.name} to Dispatch Terminal...`, "success");

    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 450);
  }

  if (crateCheckoutBtn) {
    crateCheckoutBtn.addEventListener("click", handleCrateCheckout);
  }

  if (mobileAddCrateBtn) {
    mobileAddCrateBtn.addEventListener("click", handleCrateCheckout);
  }

  // Newsletter subscription
  if (subscribeBtn && newsletterEmail) {
    subscribeBtn.addEventListener("click", () => {
      const email = newsletterEmail.value.trim();
      if (email && email.includes("@")) {
        showPopup("Operative subscribed to HELL telemetry leaks!", "success");
        newsletterEmail.value = "";
      } else {
        showPopup("Please enter a valid operative email.", "error");
      }
    });
  }

  // ==========================================================================
  // 10. HERO BACKGROUND VIDEO OPTIMIZATION
  // ==========================================================================
  const heroBgVideo = document.getElementById("heroBgVideo");
  if (heroBgVideo && typeof heroBgVideo.play === "function") {
    heroBgVideo.muted = true;
    const playPromise = heroBgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback until first user gesture
        document.addEventListener("click", () => {
          heroBgVideo.play().catch(() => {});
        }, { once: true });
      });
    }
  }

  // ==========================================================================
  // 11. 3D MOVING CAN ENGINE (Three.js WebGL with Interactive 360° Controls)
  // ==========================================================================
  function init3DCan() {
    const canvas = document.getElementById("can3dCanvas");
    const container = document.getElementById("can3dContainer");
    const fallbackImg = document.getElementById("heroCanImg");

    if (!canvas || !container || typeof THREE === "undefined") {
      if (fallbackImg) fallbackImg.style.display = "block";
      return;
    }

    try {
      const width = container.clientWidth || 340;
      const height = container.clientHeight || 540;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 6.2);

      // 2. Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // 3. Lighting Setup (Fiery Crimson Cyber Accent)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(3, 5, 4);
      scene.add(keyLight);

      // Fiery Crimson Rim Light (left)
      const rimLightLeft = new THREE.PointLight(0xff1e27, 4.2, 12);
      rimLightLeft.position.set(-3.5, 0.5, 2.5);
      scene.add(rimLightLeft);

      // Under-Glow Red Light
      const underGlow = new THREE.PointLight(0xff3344, 2.5, 8);
      underGlow.position.set(0, -3.5, 2);
      scene.add(underGlow);

      // White Specular Backlight
      const backLight = new THREE.DirectionalLight(0xffeedd, 0.8);
      backLight.position.set(-2, 3, -3);
      scene.add(backLight);

      // 4. Can Assembly Group
      const canGroup = new THREE.Group();
      scene.add(canGroup);

      // 5. Textures & Materials
      const textureLoader = new THREE.TextureLoader();
      
      const bodyTexture = textureLoader.load("assets/can_3d_texture.png", () => {
        renderer.render(scene, camera);
      });
      bodyTexture.generateMipmaps = true;
      bodyTexture.minFilter = THREE.LinearMipmapLinearFilter;

      const lidTexture = textureLoader.load("assets/lid_texture.png");

      const canBodyMaterial = new THREE.MeshStandardMaterial({
        map: bodyTexture,
        metalness: 0.55,
        roughness: 0.32
      });

      const silverMetalMaterial = new THREE.MeshStandardMaterial({
        color: 0xd6d8dc,
        metalness: 0.94,
        roughness: 0.18
      });

      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xeaecef,
        metalness: 0.96,
        roughness: 0.12
      });

      const lidMaterial = new THREE.MeshStandardMaterial({
        map: lidTexture,
        metalness: 0.92,
        roughness: 0.22
      });

      // 6. Realistic 250ml Can Geometries
      const canRadius = 0.92;
      const canBodyHeight = 2.75;

      // Can Main Body
      const bodyGeo = new THREE.CylinderGeometry(canRadius, canRadius, canBodyHeight, 64, 1, true);
      const canBodyMesh = new THREE.Mesh(bodyGeo, canBodyMaterial);
      canGroup.add(canBodyMesh);

      // Top Shoulder
      const shoulderGeo = new THREE.CylinderGeometry(0.83, canRadius, 0.22, 64, 1, true);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, silverMetalMaterial);
      shoulderMesh.position.y = canBodyHeight / 2 + 0.11;
      canGroup.add(shoulderMesh);

      // Top Outer Rim (Torus)
      const rimGeo = new THREE.TorusGeometry(0.83, 0.035, 16, 64);
      const rimMesh = new THREE.Mesh(rimGeo, rimMaterial);
      rimMesh.rotation.x = Math.PI / 2;
      rimMesh.position.y = canBodyHeight / 2 + 0.22;
      canGroup.add(rimMesh);

      // Top Lid Plate
      const lidGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.03, 64);
      const lidMesh = new THREE.Mesh(lidGeo, lidMaterial);
      lidMesh.position.y = canBodyHeight / 2 + 0.20;
      canGroup.add(lidMesh);

      // Bottom Tapered Bevel
      const bottomBevelGeo = new THREE.CylinderGeometry(canRadius, 0.80, 0.24, 64, 1, true);
      const bottomBevelMesh = new THREE.Mesh(bottomBevelGeo, silverMetalMaterial);
      bottomBevelMesh.position.y = -(canBodyHeight / 2 + 0.12);
      canGroup.add(bottomBevelMesh);

      // Bottom Base Plate
      const baseGeo = new THREE.CylinderGeometry(0.80, 0.80, 0.03, 64);
      const baseMesh = new THREE.Mesh(baseGeo, silverMetalMaterial);
      baseMesh.position.y = -(canBodyHeight / 2 + 0.24);
      canGroup.add(baseMesh);

      // 7. Ambient Glowing Energy Sparks (3D Particles)
      const particleCount = 45;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSpeeds = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = 1.1 + Math.random() * 0.9;
        particlePositions[i * 3] = Math.cos(theta) * radius;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
        particlePositions[i * 3 + 2] = Math.sin(theta) * radius;
        particleSpeeds[i] = 0.015 + Math.random() * 0.025;
      }

      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0xff3344,
        size: 0.065,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 8. 3D Motion & Interactive States
      let isDragging = false;
      let previousPointerX = 0;
      let previousPointerY = 0;
      let dragVelocityX = 0;
      let dragVelocityY = 0;
      let targetTiltX = 0;
      let targetTiltY = 0;
      let currentTiltX = 0;
      let currentTiltY = 0;
      let lastInteractionTime = Date.now();
      const autoRotateSpeed = 0.009;

      // Mouse Parallax on Hero Section
      const heroSectionEl = document.getElementById("homeSection") || container;
      heroSectionEl.addEventListener("mousemove", (e) => {
        const rect = heroSectionEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltX = -ny * 0.35;
        targetTiltY = nx * 0.45;
      });

      heroSectionEl.addEventListener("mouseleave", () => {
        targetTiltX = 0;
        targetTiltY = 0;
      });

      // Dedicated 3D Can Drag Rotation (Interacting with the can rotates only the can without moving the background page)
      canvas.addEventListener("pointerdown", (e) => {
        isDragging = true;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
        dragVelocityX = 0;
        dragVelocityY = 0;
        lastInteractionTime = Date.now();

        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
      });

      canvas.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;

        dragVelocityX = deltaX * 0.01;
        dragVelocityY = deltaY * 0.007;

        // Smooth 3D rotation: spin horizontally 360 and tilt vertically
        canGroup.rotation.y += dragVelocityX;
        canGroup.rotation.x = Math.max(-0.75, Math.min(0.75, canGroup.rotation.x + dragVelocityY));

        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
        lastInteractionTime = Date.now();
      });

      const onPointerUp = (e) => {
        if (isDragging) {
          isDragging = false;
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch (_) {}
        }
      };

      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);

      // 9. Animation Loop
      let clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Continuous floating bob & subtle roll
        canGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.12;
        canGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.035;

        // Smooth parallax tilt towards cursor
        currentTiltX += (targetTiltX - currentTiltX) * 0.06;
        currentTiltY += (targetTiltY - currentTiltY) * 0.06;

        if (!isDragging) {
          dragVelocityX *= 0.94;
          dragVelocityY *= 0.94;

          canGroup.rotation.y += dragVelocityX;
          canGroup.rotation.x += dragVelocityY;

          // Resume auto-rotation after interaction eases
          if (Date.now() - lastInteractionTime > 1500) {
            canGroup.rotation.y += autoRotateSpeed;
            canGroup.rotation.x += (currentTiltX - canGroup.rotation.x) * 0.04;
          }
        }

        // Animate rising energy sparks
        const posArray = particleGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          posArray[i * 3 + 1] += particleSpeeds[i];
          if (posArray[i * 3 + 1] > 2.5) {
            posArray[i * 3 + 1] = -2.5;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();

      // Window resize handler
      window.addEventListener("resize", () => {
        const newW = container.clientWidth || 340;
        const newH = container.clientHeight || 540;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });

    } catch (err) {
      console.warn("3D WebGL initialization fallback:", err);
      if (fallbackImg) fallbackImg.style.display = "block";
    }
  }

  // ==========================================================================
  // 10. SCROLL SPY & HEADER ELEVATION
  // ==========================================================================
  const mainHeader = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (mainHeader) {
      if (window.scrollY > 20) {
        mainHeader.classList.add("header-scrolled");
      } else {
        mainHeader.classList.remove("header-scrolled");
      }
    }
  }, { passive: true });

  const spySections = [
    { id: "homeSection", btnId: "homeBtn", mBtnId: "mHomeBtn" },
    { id: "powerMatrixSection", btnId: null, mBtnId: "mMatrixBtn" },
    { id: "servicesSection", btnId: "servicesBtn", mBtnId: "mServicesBtn" },
    { id: "crateSection", btnId: null, mBtnId: "mCrateBtn" },
    { id: "aboutSection", btnId: "aboutBtn", mBtnId: "mAboutBtn" },
    { id: "contactSection", btnId: "contactBtn", mBtnId: "mContactBtn" }
  ];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const config = spySections.find((s) => s.id === entry.target.id);
          if (config) {
            document.querySelectorAll(".nav-link").forEach((btn) => btn.classList.remove("active"));
            document.querySelectorAll(".m-nav-link").forEach((btn) => btn.classList.remove("active"));

            if (config.btnId) {
              const el = document.getElementById(config.btnId);
              if (el) el.classList.add("active");
            }
            if (config.mBtnId) {
              const el = document.getElementById(config.mBtnId);
              if (el) el.classList.add("active");
            }
          }
        }
      });
    }, {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    });

    spySections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }

  // Initialize 3D can
  init3DCan();

  // Initial calculation
  updateCrateTelemetry();
});