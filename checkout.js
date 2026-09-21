// ==========================================================================
// HELL ENERGY // Crate Dispatch Terminal Controller (checkout.js)
// Real-time telemetry manifest, dynamic calculation, freight & dispatch
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements - Order Manifest
  const manifestPackName = document.getElementById("manifestPackName");
  const manifestPackDesc = document.getElementById("manifestPackDesc");
  const manifestPriceDisplay = document.getElementById("manifestPriceDisplay");
  const manifestBaseStrikethrough = document.getElementById("manifestBaseStrikethrough");
  const checkoutQtyMinus = document.getElementById("checkoutQtyMinus");
  const checkoutQtyPlus = document.getElementById("checkoutQtyPlus");
  const checkoutQtyDisplay = document.getElementById("checkoutQtyDisplay");

  // Elements - Pricing Breakdown
  const subtotalPayloadLbl = document.getElementById("subtotalPayloadLbl");
  const summaryPayloadSubtotal = document.getElementById("summaryPayloadSubtotal");
  const summaryFreightCharge = document.getElementById("summaryFreightCharge");
  const summaryFinalTotal = document.getElementById("summaryFinalTotal");
  const btnChargeText = document.getElementById("btnChargeText");

  // Elements - Header Capsule
  const headerCrateLabel = document.getElementById("headerCrateLabel");
  const headerCratePrice = document.getElementById("headerCratePrice");
  const headerCrateBadge = document.getElementById("headerCrateBadge");

  // Elements - Shipping Velocity Options
  const optStandardShipping = document.getElementById("optStandardShipping");
  const optRapidShipping = document.getElementById("optRapidShipping");

  // Elements - Payment Tabs
  const tabCreditCard = document.getElementById("tabCreditCard");
  const tabAppleGoogle = document.getElementById("tabAppleGoogle");
  const tabSolana = document.getElementById("tabSolana");
  const creditCardPanel = document.getElementById("creditCardPanel");
  const appleGooglePanel = document.getElementById("appleGooglePanel");
  const solanaPanel = document.getElementById("solanaPanel");

  // Elements - Promo Code
  const promoCodeInput = document.getElementById("promoCodeInput");
  const promoApplyBtn = document.getElementById("promoApplyBtn");
  const promoFeedbackMsg = document.getElementById("promoFeedbackMsg");

  // Elements - Authorize & Modal
  const authorizeDispatchBtn = document.getElementById("authorizeDispatchBtn");
  const missionRadarModal = document.getElementById("missionRadarModal");
  const modalTrackingId = document.getElementById("modalTrackingId");
  const modalOperativeName = document.getElementById("modalOperativeName");
  const modalPayloadName = document.getElementById("modalPayloadName");
  const modalShippingVelocity = document.getElementById("modalShippingVelocity");
  const modalTotalCharged = document.getElementById("modalTotalCharged");
  const modalReturnHomeBtn = document.getElementById("modalReturnHomeBtn");
  const opName = document.getElementById("opName");

  // Elements - Audio toggle
  const audioToggleBtn = document.getElementById("audioToggleBtn");

  // --------------------------------------------------------------------------
  // 1. Initial State Hydration (from localStorage or defaults)
  // --------------------------------------------------------------------------
  let orderData = {
    id: "24-pack",
    name: "24-Can Party Tray",
    price: 29.99,
    basePrice: 37.99,
    quantity: 1,
    cans: 24
  };

  try {
    const saved = localStorage.getItem("hell_crate_order");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.pack) {
        orderData.id = parsed.pack.id || "24-pack";
        orderData.name = parsed.pack.name || "24-Can Party Tray";
        orderData.price = parseFloat(parsed.pack.price) || 29.99;
        orderData.basePrice = parseFloat(parsed.pack.basePrice) || 37.99;
      }
      if (parsed.quantity) {
        orderData.quantity = parseInt(parsed.quantity, 10) || 1;
      }

      // Can count estimate
      if (orderData.id.includes("6-pack")) orderData.cans = 6;
      else if (orderData.id.includes("48-pack")) orderData.cans = 48;
      else if (orderData.id.includes("single")) orderData.cans = 1;
      else orderData.cans = 24;
    }
  } catch (e) {
    console.warn("Could not read stored crate order:", e);
  }

  let selectedShipping = "standard"; // "standard" or "rapid"
  let shippingCost = 0.00;
  let discountRate = 0.00; // e.g. 0.20 for 20%
  let discountLabel = "";

  // --------------------------------------------------------------------------
  // 2. Render & Recalculate
  // --------------------------------------------------------------------------
  function calculateAndRender() {
    const unitPrice = orderData.price;
    const baseUnitPrice = orderData.basePrice;
    const qty = orderData.quantity;

    const rawSubtotal = unitPrice * qty;
    const discountAmount = rawSubtotal * discountRate;
    const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);

    shippingCost = selectedShipping === "rapid" ? 8.99 : 0.00;
    const grandTotal = finalSubtotal + shippingCost;

    // Update manifest texts
    if (manifestPackName) manifestPackName.textContent = `HELL ENERGY CLASSIC (${orderData.name})`;
    if (manifestPackDesc) {
      manifestPackDesc.textContent = `${orderData.name} • Tutti-Frutti Signature Formula`;
    }
    if (manifestPriceDisplay) manifestPriceDisplay.textContent = `$${unitPrice.toFixed(2)}`;
    if (manifestBaseStrikethrough) {
      manifestBaseStrikethrough.textContent = `$${baseUnitPrice.toFixed(2)}`;
    }
    if (checkoutQtyDisplay) checkoutQtyDisplay.textContent = qty;

    // Update totals
    const totalCans = orderData.cans * qty;
    if (subtotalPayloadLbl) {
      subtotalPayloadLbl.textContent = `Subtotal Payload (${totalCans} Cans${discountLabel ? " • " + discountLabel : ""})`;
    }
    if (summaryPayloadSubtotal) {
      summaryPayloadSubtotal.textContent = `$${finalSubtotal.toFixed(2)}`;
    }

    if (summaryFreightCharge) {
      if (shippingCost === 0) {
        summaryFreightCharge.textContent = "FREE";
        summaryFreightCharge.className = "totals-val green-free";
      } else {
        summaryFreightCharge.textContent = `+$${shippingCost.toFixed(2)}`;
        summaryFreightCharge.className = "totals-val";
      }
    }

    if (summaryFinalTotal) {
      summaryFinalTotal.textContent = `$${grandTotal.toFixed(2)}`;
    }

    if (btnChargeText) {
      btnChargeText.textContent = `AUTHORIZE DISPATCH & CHARGE $${grandTotal.toFixed(2)}`;
    }

    // Header Capsule
    if (headerCrateLabel) {
      headerCrateLabel.textContent = `${qty} CRATE${qty > 1 ? "S" : ""}`;
    }
    if (headerCratePrice) {
      headerCratePrice.textContent = `$${grandTotal.toFixed(2)}`;
    }
    if (headerCrateBadge) {
      headerCrateBadge.textContent = qty;
    }
  }

  calculateAndRender();

  // --------------------------------------------------------------------------
  // 3. Stepper Listeners
  // --------------------------------------------------------------------------
  if (checkoutQtyMinus) {
    checkoutQtyMinus.addEventListener("click", () => {
      if (orderData.quantity > 1) {
        orderData.quantity--;
        calculateAndRender();
      }
    });
  }

  if (checkoutQtyPlus) {
    checkoutQtyPlus.addEventListener("click", () => {
      if (orderData.quantity < 99) {
        orderData.quantity++;
        calculateAndRender();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Shipping Velocity Selector
  // --------------------------------------------------------------------------
  if (optStandardShipping && optRapidShipping) {
    optStandardShipping.addEventListener("click", () => {
      selectedShipping = "standard";
      optStandardShipping.classList.add("selected");
      optRapidShipping.classList.remove("selected");
      calculateAndRender();
    });

    optRapidShipping.addEventListener("click", () => {
      selectedShipping = "rapid";
      optRapidShipping.classList.add("selected");
      optStandardShipping.classList.remove("selected");
      calculateAndRender();
    });
  }

  // --------------------------------------------------------------------------
  // 5. Payment Mode Switcher
  // --------------------------------------------------------------------------
  function switchPaymentTab(activeTab, showPanel) {
    [tabCreditCard, tabAppleGoogle, tabSolana].forEach(t => t && t.classList.remove("active"));
    [creditCardPanel, appleGooglePanel, solanaPanel].forEach(p => p && (p.style.display = "none"));

    if (activeTab) activeTab.classList.add("active");
    if (showPanel) showPanel.style.display = "block";
  }

  if (tabCreditCard) {
    tabCreditCard.addEventListener("click", () => switchPaymentTab(tabCreditCard, creditCardPanel));
  }
  if (tabAppleGoogle) {
    tabAppleGoogle.addEventListener("click", () => switchPaymentTab(tabAppleGoogle, appleGooglePanel));
  }
  if (tabSolana) {
    tabSolana.addEventListener("click", () => switchPaymentTab(tabSolana, solanaPanel));
  }

  // --------------------------------------------------------------------------
  // 6. Promo Code Protocol
  // --------------------------------------------------------------------------
  if (promoApplyBtn && promoCodeInput && promoFeedbackMsg) {
    promoApplyBtn.addEventListener("click", () => {
      const code = promoCodeInput.value.trim().toUpperCase();
      if (!code) {
        promoFeedbackMsg.style.display = "block";
        promoFeedbackMsg.style.color = "#ff6b72";
        promoFeedbackMsg.textContent = "PLEASE ENTER AN OPERATIVE SQUAD CODE";
        return;
      }

      if (code === "RESPAWN" || code === "SQUAD20" || code === "HELL20") {
        discountRate = 0.20;
        discountLabel = "20% SQUAD REBATE";
        promoFeedbackMsg.style.display = "block";
        promoFeedbackMsg.style.color = "#34d399";
        promoFeedbackMsg.textContent = "CLEARANCE CONFIRMED: 20% BUNDLE DISCOUNT APPLIED!";
        calculateAndRender();
      } else if (code === "VIP10") {
        discountRate = 0.10;
        discountLabel = "10% OPERATIVE REBATE";
        promoFeedbackMsg.style.display = "block";
        promoFeedbackMsg.style.color = "#34d399";
        promoFeedbackMsg.textContent = "CLEARANCE CONFIRMED: 10% VIP REBATE APPLIED!";
        calculateAndRender();
      } else {
        promoFeedbackMsg.style.display = "block";
        promoFeedbackMsg.style.color = "#ff6b72";
        promoFeedbackMsg.textContent = "INVALID OR EXPIRED DISPATCH PROTOCOL CODE";
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Authorize Dispatch & Launch Mission Radar Modal
  // --------------------------------------------------------------------------
  if (authorizeDispatchBtn && missionRadarModal) {
    authorizeDispatchBtn.addEventListener("click", () => {
      const recipient = (opName && opName.value.trim()) || "OPERATIVE RECIPIENT";
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const tracking = `#HL-${randomCode}-X${orderData.quantity}`;

      const totalFormatted = summaryFinalTotal ? summaryFinalTotal.textContent : `$${orderData.price.toFixed(2)}`;

      if (modalTrackingId) modalTrackingId.textContent = tracking;
      if (modalOperativeName) modalOperativeName.textContent = recipient;
      if (modalPayloadName) {
        modalPayloadName.textContent = `${orderData.quantity}x ${orderData.name}`;
      }
      if (modalShippingVelocity) {
        modalShippingVelocity.textContent = selectedShipping === "rapid"
          ? "Rapid Nitro Air Cargo (+$8.99)"
          : "Standard Armory Courier (FREE)";
      }
      if (modalTotalCharged) modalTotalCharged.textContent = totalFormatted;

      // Display Radar Modal
      missionRadarModal.style.display = "flex";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (modalReturnHomeBtn) {
    modalReturnHomeBtn.addEventListener("click", () => {
      window.location.href = "index.html#crateSection";
    });
  }

  // Close modal on background click
  if (missionRadarModal) {
    missionRadarModal.addEventListener("click", (e) => {
      if (e.target === missionRadarModal) {
        missionRadarModal.style.display = "none";
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Audio Telemetry Trigger Toggle
  // --------------------------------------------------------------------------
  let isMuted = false;
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      const icon = audioToggleBtn.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = isMuted ? "volume_off" : "volume_up";
      }
    });
  }
});
