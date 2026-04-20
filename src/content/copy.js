export const inspectionChecklist = [
  { key: "serviceHistory", label: "Verified service history", detail: "Bills, service stamps, and maintenance records are available." },
  { key: "tires", label: "Tyre wear is even", detail: "Uneven wear can indicate suspension or alignment problems." },
  { key: "paintConsistency", label: "Paint and panel gaps look consistent", detail: "Mismatch can indicate body repair after damage." },
  { key: "engineNoise", label: "Engine starts without unusual noise", detail: "Cold start and idle should sound steady." },
  { key: "suspension", label: "Suspension feels stable", detail: "No excessive bounce, pull, or steering instability." },
  { key: "electronics", label: "Electronics work correctly", detail: "Windows, lights, infotainment, and sensors respond normally." },
  { key: "acPerformance", label: "AC cooling is confirmed", detail: "Cooling should be strong and consistent during inspection." },
  { key: "testDrive", label: "Test drive shows no major red flags", detail: "Braking, clutch, gearbox, and steering feel normal." },
  { key: "accidentSignals", label: "No obvious accident damage signals", detail: "No major weld marks, chassis bends, or repaint clues." },
];

export const recommendationCopy = {
  strongBuy: {
    label: "Buy with confidence",
    tone: "success",
    summary: "The inspection and ownership signals look stable for a first-time buyer.",
  },
  negotiate: {
    label: "Buy only after negotiation",
    tone: "warning",
    summary: "The car is possible, but the price or unresolved checks need negotiation first.",
  },
  walkAway: {
    label: "Do not buy yet",
    tone: "danger",
    summary: "History, condition, or maintenance risk is too uncertain for a first-time buyer.",
  },
};

export const appCopy = {
  brand: {
    name: "CarTrust Advisor",
    shortName: "CT",
    subtitle: "Used-car buyer decision support",
    sidebarSummary:
      "Save car reports, verify condition signals, compare options, and estimate future maintenance before paying.",
  },
  nav: [
    { to: "/dashboard", label: "Buyer dashboard", hint: "Overview" },
    { to: "/cars/new", label: "Car evaluation", hint: "Inspect" },
    { to: "/compare", label: "Compare cars", hint: "Compare" },
    { to: "/profile", label: "Account", hint: "Storage" },
  ],
  shared: {
    loadingApp: "Loading used-car buyer workspace",
    loadingSession: "Restoring secure access",
    signOut: "Sign out",
    searchPlaceholder: "Search brand, model, seller, risk, or notes",
    fallbackBuyerName: "Buyer",
    syncLabels: {
      supabase: "Supabase connected",
      local: "Local browser backup",
    },
    labels: {
      askingPrice: "Asking price",
      trustScore: "Trust score",
      maintenance: "Expected 12-month maintenance",
      fairValue: "Suggested buying value",
      mileage: "Mileage",
      age: "Age",
      previousOwners: "Previous owners",
    },
  },
  landing: {
    kicker: "Problem statement 3",
    headline: "First-time used car buyers cannot easily verify car history, condition, or future maintenance cost.",
    intro:
      "This app turns used-car inspection into a clear decision workflow with car profile pages, verification checklists, maintenance estimation, comparison cards, and a final should-I-buy-this summary.",
    primaryAction: "Start a car evaluation",
    secondaryAction: "Review the workflow",
    featureCards: [
      {
        title: "Car history verification",
        text: "Record seller details, ownership count, service history, and visible repair signals in one report.",
      },
      {
        title: "Condition inspection",
        text: "Use a guided checklist to verify tyres, paint, engine, suspension, electronics, AC, and test-drive results.",
      },
      {
        title: "Future maintenance planning",
        text: "Estimate the first-year maintenance reserve before deciding whether the deal is actually affordable.",
      },
    ],
    problemPanel: {
      title: "Why first-time buyers need this",
      rows: [
        {
          label: "History is unclear",
          text: "Buyers often cannot tell whether a car has genuine service records or hidden accident history.",
        },
        {
          label: "Condition is hard to judge",
          text: "A clean exterior does not confirm engine health, electronics, suspension quality, or AC reliability.",
        },
        {
          label: "Future cost is underestimated",
          text: "The asking price is only the starting point; maintenance after purchase can change the real cost sharply.",
        },
      ],
    },
    workflowTitle: "What the app helps verify",
    workflowCards: [
      {
        title: "Car profile page",
        text: "Store one structured profile per vehicle with price, seller, age, mileage, and notes.",
      },
      {
        title: "Inspection checklist",
        text: "Capture what has been checked and what is still uncertain before purchase.",
      },
      {
        title: "Decision summary",
        text: "Review trust score, maintenance estimate, fair value, and buy-or-not guidance together.",
      },
    ],
  },
  auth: {
    panelKicker: "Secure buyer workspace",
    headline: "Sign in to save car reports, compare options, and keep a record of what each car still needs to prove.",
    intro:
      "Your account stores used-car evaluations so you can return to history checks, condition findings, and maintenance estimates before making a purchase.",
    demoTitle: "Create your account",
    demoText: "Use your own email and password to create a buyer workspace and start saving car reports.",
    supabaseTitle: "Supabase backend",
    supabaseText: "This app is configured for Supabase Auth and Supabase-backed report persistence.",
    backHome: "Back to problem overview",
    confirmationNotice:
      "If email confirmation is enabled in Supabase, verify the account from your email first and then sign in.",
    modes: {
      signin: {
        eyebrow: "Sign in",
        title: "Open your buyer workspace",
        switchLabel: "Create account",
        submit: "Sign in",
      },
      signup: {
        eyebrow: "Create account",
        title: "Create a buyer workspace",
        switchLabel: "I already have an account",
        submit: "Create account",
      },
    },
    labels: {
      name: "Full name",
      email: "Email address",
      password: "Password",
    },
    placeholders: {
      name: "Rizwan Ahmed",
    },
    submitting: "Checking access...",
  },
  dashboard: {
    title: "Buyer dashboard",
    subtitle: "Track every car you inspected and compare history, condition, and maintenance risk before buying.",
    primaryAction: "New car report",
    metrics: {
      savedCars: {
        label: "Saved reports",
        detail: "Cars currently stored in your buyer workspace",
      },
      bestScore: {
        label: "Best trust score",
        detail: "Strongest current option based on the saved reports",
      },
      maintenanceExposure: {
        label: "Maintenance exposure",
        detail: "Combined first-year reserve across all saved cars",
      },
      comparisonReady: {
        label: "Comparison status",
        detail: "At least two reports are ideal for side-by-side comparison",
      },
    },
    loading: "Loading saved car reports",
    comparisonFallback: "Need at least 2 reports",
    listEyebrow: "Saved car reports",
    listTitle: "Vehicles under review",
    compareAction: "Open comparison workspace",
    empty: {
      title: "No car reports saved yet",
      message:
        "Create your first car report to verify seller history, inspection status, and expected maintenance before purchase.",
      action: "Create first report",
    },
    rowLabels: {
      seller: "Seller",
      trustScore: "Trust score",
      price: "Price",
      coverage: "Coverage",
    },
    actions: {
      open: "Open report",
      edit: "Edit report",
      delete: "Delete report",
    },
  },
  form: {
    title: "Car evaluation",
    subtitle: "Record history, visible condition, and maintenance risk before deciding whether the car is worth buying.",
    editTitle: "Edit car report",
    editSubtitle: "Update history, condition findings, and maintenance risk as you learn more about the car.",
    backAction: "Back to dashboard",
    formEyebrow: "Car inspection form",
    formTitle: "Capture the evidence for this car",
    identityTitle: "Vehicle identity and usage",
    ownershipTitle: "Ownership and condition context",
    notesTitle: "Inspection notes",
    notesPlaceholder:
      "Write what the seller showed, what the mechanic noticed, and which points still need proof before purchase.",
    checklistEyebrow: "Inspection checklist",
    checklistTitle: "What has actually been verified",
    helperReady: "Ready to save this car report",
    helperSaving: "Saving this car report",
    submit: "Save car report",
    submitSaving: "Saving report...",
    update: "Update car report",
    updateSaving: "Updating report...",
    requiredError: "Brand, model, and seller name are required before this report can be saved.",
    previewEyebrow: "Decision preview",
    previewTitle: "Should this car stay on your shortlist?",
    negotiationTitle: "Negotiation note",
    negotiationText:
      "Use gaps in service history, unresolved checks, and the difference between asking price and suggested buying value as negotiation points.",
    maintenanceTitle: "Maintenance note",
    maintenanceText:
      "Higher age, mileage, and missing inspection proof increase the reserve you should keep after purchase.",
    fieldLabels: {
      brand: "Brand",
      model: "Model",
      year: "Year",
      age: "Age (years)",
      mileage: "Mileage (km)",
      askingPrice: "Asking price",
      condition: "Overall condition",
      previousOwners: "Previous owners",
      sellerName: "Seller name",
      notes: "Inspection notes",
    },
    placeholders: {
      brand: "Honda",
      model: "City",
      sellerName: "Raj Motors",
    },
    conditionOptions: [
      { value: "excellent", label: "Excellent" },
      { value: "good", label: "Good" },
      { value: "fair", label: "Fair" },
      { value: "risky", label: "Risky" },
    ],
    checklistState: {
      checked: "Verified",
      pending: "Not verified",
    },
    decisionQuestion: "Should I buy this car?",
    coverageLabel: "Verification coverage",
  },
  details: {
    missingTitle: "Car report not found",
    missingMessage: "This saved report may have been deleted or is no longer available in your workspace.",
    missingAction: "Return to dashboard",
    compareAction: "Compare this car",
    editAction: "Edit report",
    deleteAction: "Delete report",
    sellerPrefix: "Seller",
    updatedPrefix: "Updated",
    factsEyebrow: "Car profile",
    factsTitle: "Recorded facts and inspection notes",
    notesTitle: "Inspection notes",
    notesEmpty: "No inspection notes were saved for this car.",
    checklistEyebrow: "Inspection result",
    checklistTitle: "What has been verified so far",
    trustEyebrow: "Buy decision summary",
    trustTitle: "Trust score",
    costEyebrow: "Cost projection",
    costTitle: "Expected financial exposure",
    riskEyebrow: "Verification risk",
    riskTitle: "History and condition flags",
    riskEmpty: "No major risk flags were triggered from the current inspection data.",
    missingChecksTitle: "Still not verified",
    coverageTitle: "Verification coverage",
  },
  compare: {
    title: "Compare cars",
    subtitle: "Check which saved car has stronger history, better condition signals, and lower expected maintenance cost.",
    addAction: "Add another car report",
    empty: {
      title: "No cars ready for comparison",
      message: "Save car reports first so you can compare history signals, inspection results, and maintenance exposure.",
      action: "Create a car report",
    },
    bestEyebrow: "Best current option",
    bestAction: "Open full report",
    bestSummaryPrefix: "Highest trust score in your saved list with an asking price of",
    tableEyebrow: "Comparison workspace",
    tableTitle: "Side-by-side car comparison",
    tableHeaders: ["Car", "Seller", "Asking price", "Trust score", "12-month maintenance", "Decision"],
  },
  account: {
    title: "Account",
    subtitle: "Check where your car reports are stored and whether sync is running in cloud or local mode.",
    profileEyebrow: "Buyer account",
    profileTitle: "Account details",
    storageEyebrow: "Storage status",
    storageTitle: "Where car reports are saved",
    labels: {
      email: "Email address",
      savedReports: "Saved car reports",
      persistence: "Storage mode",
      syncStatus: "Sync status",
    },
    reportCountSuffix: "reports stored for this account.",
    persistenceText: {
      supabase:
        "Authentication is running through Supabase Auth, and car reports are stored in Supabase user metadata for immediate project use.",
      local: "Authentication and saved car reports are currently stored in browser storage until Supabase keys are added.",
    },
    syncText: {
      supabase: "Supabase auth sync is active for this account.",
      local: "This workspace is running in local browser mode.",
    },
    schemaTitle: "Scalable table schema",
    schemaText:
      "A ready-to-run SQL schema is included in supabase/schema.sql if you want to move from auth metadata storage to a dedicated public table.",
    confirmationTitle: "What this page confirms",
    confirmationText:
      "Your saved car reports, account identity, and storage mode are shown here without unrelated project or course text.",
  },
  notFound: {
    title: "Page not found",
    message: "This screen is not part of the used-car buyer workflow.",
    action: "Return to home",
  },
};
