export const industryConfigs = {
  construction: {
    id: "construction",
    name: "Metro Rail Infrastructure Consortium",
    subName: "Chennai Metro Rail Phase II (CMRL Line 4)",
    industryType: "Civil Infrastructure & Heavy Engineering",
    icon: "Building2",
    themeColor: "teal",
    worker: {
      name: "AKSHAVI K",
      tamilName: "அக்ஷவி கே.",
      code: "CMRL-W-4089",
      designation: "Lead Rigging & Scaffolding Specialist",
      tamilDesignation: "முதன்மை சாரக்கட்டு & பொருத்த நிபுணர்",
      department: "Substructure & Elevated Pier Division",
      site: "Pier 4 — West Scaffolding Face, Level 3",
      avatarInitials: "AK",
      phone: "+91 98401 ••••7",
      joinDate: "15 Jan 2024",
      payScale: {
        basicRatePerDay: 750,
        standardShiftHours: 8,
        overtimeMultiplier: 2.0, // Double rate for heavy construction
        hazardAllowancePerDay: 150,
        foodTravelPerDay: 100,
        epfRate: 0.12,
        esiRate: 0.0075,
        profTaxMonthly: 200,
      },
      skills: [
        { name: "Certified Working at Heights (Level 3)", issuer: "National Safety Council (NSC)", verified: true, date: "Aug 2025" },
        { name: "Scaffolding Inspector & Erector (OSHA 1926)", issuer: "L&T Training Academy", verified: true, date: "Nov 2025" },
        { name: "Confined Space & Deep Shaft Protocol", issuer: "CMRL Safety Directorate", verified: true, date: "Feb 2026" },
        { name: "First Aid & CPR First Responder", issuer: "St. John Ambulance India", verified: true, date: "May 2026" }
      ]
    },
    supervisors: [
      { id: "sup1", name: "Senthil Murugan", role: "Chief Safety Engineer (Statutory)", phone: "+91 94440 12345" },
      { id: "sup2", name: "Kavitha Rajan", role: "Site Operations Superintendent", phone: "+91 98400 67890" },
      { id: "sup3", name: "Ravi Kumar", role: "Structural Quality & Audit Officer", phone: "+91 97910 54321" },
    ],
    sites: [
      "Pier 4 — West Scaffolding Face, Level 3 (Beacon #902)",
      "Underground Shaft Box B2 — Guindy Junction (Beacon #411)",
      "Casting Yard East — Girder Launching Pad (Beacon #105)",
      "Rebar Fabrication Yard & High-Bay Shed 2 (Beacon #208)",
      "Pier 12 — Medavakkam Elevated Viaduct (Beacon #874)"
    ],
    categories: [
      { id: "safety", label: "Safety Hazard", tamilLabel: "பாதுகாப்பு அபாயம்", icon: "AlertTriangle", subtext: "Scaffolding, electrical faults, crane blindspots, extreme heat" },
      { id: "unfair", label: "Unfair Treatment", tamilLabel: "நியாயமற்ற நடத்தை", icon: "UserX", subtext: "Harassment, threats, verbal abuse, contractor retaliation" },
      { id: "wage", label: "Wage & Overtime", tamilLabel: "ஊதியம் & கூடுதல் நேரம்", icon: "Banknote", subtext: "Unrecorded hours, delayed payment, unlawful deductions" },
      { id: "water", label: "Drinking Water & Amenities", tamilLabel: "குடிநீர் & சுகாதாரம்", icon: "Droplets", subtext: "Unsanitary washrooms, dry water tanks, rest sheds" }
    ],
    initialReports: [
      {
        id: "rep-001",
        refCode: "FS-2026-8812",
        pin: "839204",
        category: "safety",
        title: "Loose coupler clamp & tilted scaffold plank on Pier 4",
        location: "Pier 4 — West Scaffolding Face, Level 3",
        severity: "urgent",
        tier: "anonymous",
        status: "under_review",
        createdAt: "2026-10-27T08:15:00Z",
        reporter: "Anonymous Shield (Protected)",
        voiceNote: { hasAudio: true, duration: "0:38" },
        images: ["/scaffold_defect.jpg", "/wiring_hazard.jpg"],
        assignedTo: "Senthil Murugan (Chief Safety Engineer)",
        description: "Level 3 west catwalk clamp is fractured. 2 wooden planks slipped during morning concrete bucket lift. Severe fall risk for ironworkers.",
        publicUpdates: [
          { time: "08:30 AM", note: "Report verified under TN Labor Act Sec 17. Dispatched to Chief Safety Engineer." },
          { time: "09:45 AM", note: "Urgent red-tagging initiated on Pier 4 access ladder. Crew rerouted." }
        ],
        internalNotes: "Contractor M/s Apex Infra warned for substandard coupler bolt grade 4.6 instead of 8.8."
      },
      {
        id: "rep-002",
        refCode: "FS-2026-8794",
        pin: "441923",
        category: "water",
        title: "Drinking water dispenser dry in 38°C midday heat",
        location: "Rebar Fabrication Yard & High-Bay Shed 2",
        severity: "moderate",
        tier: "confidential",
        status: "resolved",
        createdAt: "2026-10-26T13:45:00Z",
        reporter: "Muthu Vel (Bar Bender)",
        voiceNote: { hasAudio: false, duration: "0:00" },
        images: [],
        assignedTo: "Kavitha Rajan (Site Operations)",
        description: "Drinking water dispenser dry since 11:30 AM. Workers having to walk 500m under sun to admin porta-cabin.",
        publicUpdates: [
          { time: "Yesterday, 02:30 PM", note: "Water tanker vendor refilled primary 2000L tank. Dispenser sanitized." },
          { time: "Yesterday, 04:00 PM", note: "Verified by Yard Supervisor. Water available." }
        ],
        internalNotes: "Subcontractor penalized ₹2,000 for supply disruption."
      },
      {
        id: "rep-003",
        refCode: "FS-2026-8740",
        pin: "192805",
        category: "wage",
        title: "Overtime hours missing from biometric sheet for Friday night pour",
        location: "Underground Shaft Box B2 — Guindy Junction",
        severity: "moderate",
        tier: "anonymous",
        status: "action_in_progress",
        createdAt: "2026-10-25T17:10:00Z",
        reporter: "Anonymous Shield (Protected)",
        voiceNote: { hasAudio: true, duration: "0:25" },
        images: [],
        assignedTo: "Ravi Kumar (Audit Officer)",
        description: "Worked 3.5 hours beyond standard shift during tunnel grout injection. Contractor muster register only shows standard 8 hours.",
        publicUpdates: [
          { time: "26 Oct, 10:00 AM", note: "Shaft entrance biometric logs cross-referenced with concrete delivery transit challans." },
          { time: "26 Oct, 03:30 PM", note: "Wage disparity confirmed; 3.5 hrs approved at double overtime rate." }
        ],
        internalNotes: "Contractor payroll adjustment form submitted to HR Accounts."
      }
    ],
    fatigueAlerts: [
      {
        id: "fat-001",
        workerCode: "CMRL-W-3820",
        workerName: "K. Velan (Crane Operator)",
        ruleType: "Continuous Working Hours > 10.5h",
        severity: "urgent",
        description: "Logged 11.2 continuous hours on 120-ton crawler crane without mandatory 45-min interval. Immediate risk of micro-sleep and lifting collision.",
        triggeredAt: "2026-10-27T09:40:00Z",
        acknowledged: false,
        recommendedAction: "Relieve operator immediately. Assign relief crew and enforce 12-hour rest window before next shift."
      },
      {
        id: "fat-002",
        workerCode: "CMRL-W-4089",
        workerName: "AKSHAVI K (Scaffolder)",
        ruleType: "Unclosed Check-out / Implausible Shift",
        severity: "moderate",
        description: "Missing check-out punch on Friday Oct 24. Auto-flagged for supervisory attendance reconciliation.",
        triggeredAt: "2026-10-25T01:00:00Z",
        acknowledged: true,
        acknowledgedBy: "Kavitha Rajan",
        recommendedAction: "Verify physical gate pass and adjust shift punch."
      },
      {
        id: "fat-003",
        workerCode: "CMRL-W-2901",
        workerName: "D. Selvaraj (Welder)",
        ruleType: "Insufficient Rest Interval (< 8 Hours)",
        severity: "urgent",
        description: "Clocked out yesterday at 23:45 and clocked back in at 06:15 (only 6.5 hours off-site). Violation of Factories Safety Schedule III.",
        triggeredAt: "2026-10-27T06:20:00Z",
        acknowledged: false,
        recommendedAction: "Pull worker off hot-works line for mandatory rest break."
      }
    ],
    attendanceHistory: [
      { date: "2026-10-27", day: "Today (Tuesday)", checkIn: "07:05 AM", checkOut: null, scheduled: "07:00 - 15:30 (8.0h)", durationHours: 3.8, overtimeHours: 0, status: "Present (In Progress)", flagged: false },
      { date: "2026-10-26", day: "Monday", checkIn: "06:58 AM", checkOut: "17:40 PM", scheduled: "07:00 - 15:30 (8.0h)", durationHours: 10.7, overtimeHours: 2.7, status: "Overtime Flagged for Review", flagged: true },
      { date: "2026-10-25", day: "Sunday", checkIn: "-", checkOut: "-", scheduled: "Weekly Off", durationHours: 0, overtimeHours: 0, status: "Rest Day", flagged: false },
      { date: "2026-10-24", day: "Saturday", checkIn: "07:02 AM", checkOut: "18:30 PM", scheduled: "07:00 - 15:30 (8.0h)", durationHours: 11.5, overtimeHours: 3.5, status: "Overtime Approved (2.0x)", flagged: false },
      { date: "2026-10-23", day: "Friday", checkIn: "07:15 AM", checkOut: "15:45 PM", scheduled: "07:00 - 15:30 (8.0h)", durationHours: 8.5, overtimeHours: 0.5, status: "Present", flagged: false },
      { date: "2026-10-22", day: "Thursday", checkIn: "07:00 AM", checkOut: "15:30 PM", scheduled: "07:00 - 15:30 (8.0h)", durationHours: 8.0, overtimeHours: 0, status: "Present", flagged: false },
      { date: "2026-10-21", day: "Wednesday", checkIn: "07:10 AM", checkOut: "15:35 PM", scheduled: "07:00 - 15:30 (8.0h)", durationHours: 8.0, overtimeHours: 0, status: "Present", flagged: false },
    ]
  },

  university: {
    id: "university",
    name: "SRM Institute of Science & Technology",
    subName: "Campus Facilities, Safety & Maintenance Directorate",
    industryType: "Higher Education & Campus Workforce",
    icon: "GraduationCap",
    themeColor: "indigo",
    worker: {
      name: "Priya S.",
      tamilName: "பிரியா எஸ்.",
      code: "SRM-FAC-1104",
      designation: "Senior Facilities Housekeeping & Hygiene Lead",
      tamilDesignation: "முதன்மை வளாக சுகாதார & தூய்மை பொறுப்பாளர்",
      department: "Campus Facilities & Environmental Health",
      site: "Central Library — Floor 3 Stack & Reading Hall",
      avatarInitials: "PS",
      phone: "+91 97103 ••••2",
      joinDate: "04 Aug 2023",
      payScale: {
        basicRatePerDay: 680,
        standardShiftHours: 8,
        overtimeMultiplier: 1.5,
        hazardAllowancePerDay: 120,
        foodTravelPerDay: 80,
        epfRate: 0.12,
        esiRate: 0.0075,
        profTaxMonthly: 150,
      },
      skills: [
        { name: "Biohazard & Chemical Spill Protocol", issuer: "Institutional Biosafety Committee", verified: true, date: "Sep 2025" },
        { name: "Campus Fire Safety & Evacuation Marshal", issuer: "Tamil Nadu Fire & Rescue Services", verified: true, date: "Jan 2026" },
        { name: "Ergonomics & Sanitation Hygiene ISO 14001", issuer: "SRM Quality Cell", verified: true, date: "Apr 2026" }
      ]
    },
    supervisors: [
      { id: "supU1", name: "Dr. Ramanathan K.", role: "Director of Campus Facilities", phone: "+91 98410 22334" },
      { id: "supU2", name: "Meenakshi Sundaram", role: "Superintending Maintenance Engineer", phone: "+91 94441 55667" },
      { id: "supU3", name: "K. Saravanan", role: "Head of Campus Security & Labor Welfare", phone: "+91 97900 88990" },
    ],
    sites: [
      "Central Library — Floor 3 Stack & Reading Hall (Beacon #304)",
      "Tech Park Hostels — Block C Electrical Substation (Beacon #512)",
      "Main University Auditorium & HVAC Utility Duct (Beacon #118)",
      "Biomedical Research Center — Chemical Store & Waste Yard (Beacon #740)",
      "University Health Center & Nursing Wing (Beacon #402)"
    ],
    categories: [
      { id: "safety", label: "Electrical & Facilities Hazard", tamilLabel: "மின்சாரம் & வளாக அபாயம்", icon: "AlertTriangle", subtext: "Live wiring, broken lifts, chemical wash spills, broken glass" },
      { id: "unfair", label: "Workplace Treatment & Harassment", tamilLabel: "பணியிட நடத்தை & துன்புறுத்தல்", icon: "UserX", subtext: "Contractor exploitation, verbal abuse, withheld PPE gear" },
      { id: "wage", label: "Contractor Wages & Overtime", tamilLabel: "ஒப்பந்த சம்பளம் & கூடுதல் நேரம்", icon: "Banknote", subtext: "Delayed third-party payments, unpaid night festival duty" },
      { id: "water", label: "Staff Sanitation & Rest Spaces", tamilLabel: "பணியாளர் சுகாதாரம் & ஓய்வறை", icon: "Droplets", subtext: "Broken staff washrooms, non-potable taps, locked lockers" }
    ],
    initialReports: [
      {
        id: "rep-u01",
        refCode: "FS-2026-9041",
        pin: "752118",
        category: "safety",
        title: "Exposed 440V wiring dangling near Hostel Block C water cooler",
        location: "Tech Park Hostels — Block C Electrical Substation",
        severity: "urgent",
        tier: "anonymous",
        status: "assigned",
        createdAt: "2026-10-27T07:40:00Z",
        reporter: "Anonymous Shield (Protected)",
        voiceNote: { hasAudio: true, duration: "0:42" },
        images: ["/wiring_hazard.jpg"],
        assignedTo: "Meenakshi Sundaram (Maintenance Engineer)",
        description: "Water cooler pipe is leaking directly onto unshielded conduit wires near the laundry entrance. High shock risk for cleaning staff and students.",
        publicUpdates: [
          { time: "08:05 AM", note: "Substation feeder isolated. Maintenance electrical crew dispatched with industrial conduit casing." }
        ],
        internalNotes: "Contractor technician bypassed junction box during weekend AC servicing. Violation notice issued."
      },
      {
        id: "rep-u02",
        refCode: "FS-2026-8995",
        pin: "630412",
        category: "unfair",
        title: "Third-party agency withholding safety boots and charging ₹500 fee",
        location: "Central Library — Floor 3 Stack & Reading Hall",
        severity: "moderate",
        tier: "confidential",
        status: "under_review",
        createdAt: "2026-10-26T14:10:00Z",
        reporter: "Lakshmi M. (Housekeeping Attendant)",
        voiceNote: { hasAudio: false, duration: "0:00" },
        images: [],
        assignedTo: "K. Saravanan (Labor Welfare)",
        description: "Outsourced manpower contractor supervisor demanded cash payment from 4 housekeeping women to release standard safety rubber boots.",
        publicUpdates: [
          { time: "Yesterday, 04:00 PM", note: "Campus Labor Welfare Ombudsperson summoned vendor agency management for compliance audit." }
        ],
        internalNotes: "Agency contract Clause 14 clearly mandates free PPE supply. Show-cause notice drafted."
      }
    ],
    fatigueAlerts: [
      {
        id: "fat-u01",
        workerCode: "SRM-SEC-209",
        workerName: "R. Mani (Night Security Guard)",
        ruleType: "Continuous 12-Hour Shifts > 4 Days",
        severity: "urgent",
        description: "Assigned 4 consecutive 12-hour night guard shifts (18:00 - 06:00) during campus festival. Risk of extreme fatigue and impaired emergency response.",
        triggeredAt: "2026-10-27T06:05:00Z",
        acknowledged: false,
        recommendedAction: "Mandatory replacement by day relief squad. Enforce 24-hour restorative rest period."
      },
      {
        id: "fat-u02",
        workerCode: "SRM-FAC-1104",
        workerName: "Priya S. (Housekeeping Lead)",
        ruleType: "Convocation Deep-Cleaning Shift Exceeded 10h",
        severity: "moderate",
        description: "Logged 10.4 hours on Sunday Oct 25 for auditorium sanitization.",
        triggeredAt: "2026-10-25T20:30:00Z",
        acknowledged: true,
        acknowledgedBy: "Dr. Ramanathan K.",
        recommendedAction: "Approved compensatory time-off (comp-off) voucher."
      }
    ],
    attendanceHistory: [
      { date: "2026-10-27", day: "Today (Tuesday)", checkIn: "07:55 AM", checkOut: null, scheduled: "08:00 - 16:30 (8.0h)", durationHours: 2.9, overtimeHours: 0, status: "Present (In Progress)", flagged: false },
      { date: "2026-10-26", day: "Monday", checkIn: "07:50 AM", checkOut: "17:00 PM", scheduled: "08:00 - 16:30 (8.0h)", durationHours: 9.1, overtimeHours: 1.1, status: "Overtime Approved (1.5x)", flagged: false },
      { date: "2026-10-25", day: "Sunday", checkIn: "08:00 AM", checkOut: "18:25 PM", scheduled: "Special Convocation Duty", durationHours: 10.4, overtimeHours: 2.4, status: "Overtime Flagged for Review", flagged: true },
      { date: "2026-10-24", day: "Saturday", checkIn: "08:00 AM", checkOut: "16:30 PM", scheduled: "08:00 - 16:30 (8.0h)", durationHours: 8.0, overtimeHours: 0, status: "Present", flagged: false },
      { date: "2026-10-23", day: "Friday", checkIn: "07:58 AM", checkOut: "16:30 PM", scheduled: "08:00 - 16:30 (8.0h)", durationHours: 8.0, overtimeHours: 0, status: "Present", flagged: false },
      { date: "2026-10-22", day: "Thursday", checkIn: "07:55 AM", checkOut: "16:35 PM", scheduled: "08:00 - 16:30 (8.0h)", durationHours: 8.0, overtimeHours: 0, status: "Present", flagged: false },
      { date: "2026-10-21", day: "Wednesday", checkIn: "-", checkOut: "-", scheduled: "Weekly Off", durationHours: 0, overtimeHours: 0, status: "Rest Day", flagged: false },
    ]
  }
};
