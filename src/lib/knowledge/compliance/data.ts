/**
 * Compliance & Regulatory Knowledge Base for SMB AI/Automation Implementation
 *
 * Sources (as of March 2026):
 * - GDPR (EU General Data Protection Regulation)
 * - CCPA/CPRA (California Consumer Privacy Act / California Privacy Rights Act)
 * - EU AI Act (phased rollout 2024-2027)
 * - HIPAA / HITECH (US healthcare)
 * - FDA FSMA 204 (food traceability)
 * - PCI DSS 4.0.1 (payment card data)
 * - OSHA / ISO 45001 (workplace safety)
 *
 * Last updated: 2026-03-16
 */

import type { ComplianceProfile } from "./types";

const complianceData: ComplianceProfile = {
  general: {
    gdpr: [
      {
        name: "Lawful Basis for Processing",
        description:
          "Establish and document a lawful basis (consent, legitimate interest, contract, etc.) for every category of personal data processed. GDPR applies to any business processing EU resident data regardless of company size or revenue.",
        severity: "critical",
        typicalCostToComply: "$2,000–$10,000 (legal review + documentation)",
        commonMistakes: [
          "Assuming legitimate interest covers all processing without a balancing test",
          "Not documenting the lawful basis before processing begins",
          "Using consent as the basis when legitimate interest would be more appropriate, making it harder to manage withdrawals",
          "Believing GDPR does not apply because the company is outside the EU",
        ],
        actionableSteps: [
          "Audit all personal data processing activities and list data categories",
          "Map each processing activity to a specific lawful basis under Article 6",
          "Document the balancing test for legitimate interest claims",
          "Create a Record of Processing Activities (ROPA) — required for companies with 250+ employees or if processing is not occasional",
          "Review and update lawful basis annually or when processing changes",
        ],
      },
      {
        name: "Consent Management",
        description:
          "GDPR requires opt-in consent that is freely given, specific, informed, and unambiguous. Consent must be as easy to withdraw as to give. Pre-ticked boxes and bundled consent are invalid.",
        severity: "critical",
        typicalCostToComply:
          "$1,000–$5,000 (consent management platform + implementation)",
        commonMistakes: [
          "Using pre-ticked checkboxes or implied consent mechanisms",
          "Bundling consent with terms of service acceptance",
          "Not providing an equally easy mechanism to withdraw consent",
          "Failing to keep records proving when and how consent was obtained",
          "Not refreshing consent when processing purposes change",
        ],
        actionableSteps: [
          "Implement a Consent Management Platform (CMP) on all digital touchpoints",
          "Ensure consent requests use clear, plain language",
          "Provide granular consent options (separate checkboxes per purpose)",
          "Build a withdrawal mechanism that is as easy as opt-in (one-click)",
          "Log all consent events with timestamp, version, and scope",
        ],
      },
      {
        name: "Right to Erasure and Data Portability",
        description:
          "Data subjects can request deletion of their personal data (right to be forgotten) and receive their data in a structured, machine-readable format. Requests must be fulfilled within 30 days.",
        severity: "critical",
        typicalCostToComply:
          "$3,000–$15,000 (system modifications + process setup)",
        commonMistakes: [
          "No automated mechanism to locate all instances of a person's data across systems",
          "Forgetting to notify third parties who received the data about erasure requests",
          "Not accounting for legal retention obligations that override erasure rights",
          "Providing data in PDF rather than a structured, machine-readable format",
        ],
        actionableSteps: [
          "Build a data subject request (DSR) workflow with intake form and tracking",
          "Create a data map showing where personal data resides across all systems",
          "Implement automated data export in JSON or CSV format",
          "Define retention exceptions (legal holds, regulatory requirements) and document them",
          "Train customer-facing staff on how to handle DSR requests",
        ],
      },
      {
        name: "Data Retention Policies",
        description:
          "Personal data must not be kept longer than necessary for the purpose it was collected. Organizations must define and enforce retention periods for each data category.",
        severity: "important",
        typicalCostToComply:
          "$1,500–$8,000 (policy creation + technical implementation)",
        commonMistakes: [
          "No defined retention periods — data kept indefinitely by default",
          "Retention policy exists on paper but is not technically enforced",
          "Using a single blanket retention period for all data types",
          "Not accounting for backups and archives in retention schedules",
        ],
        actionableSteps: [
          "Define retention periods per data category based on purpose and legal requirements",
          "Implement automated deletion or anonymization triggers",
          "Include backup systems in retention enforcement",
          "Review and update retention schedules annually",
          "Document justification for each retention period",
        ],
      },
      {
        name: "Cross-Border Data Transfers",
        description:
          "Transferring personal data outside the EEA requires adequate safeguards: adequacy decisions, Standard Contractual Clauses (SCCs) with Transfer Impact Assessments (TIAs), or Binding Corporate Rules. Post-Schrems II, SCCs alone are insufficient without evaluating destination country surveillance laws.",
        severity: "critical",
        typicalCostToComply:
          "$3,000–$20,000 (legal assessment + SCC implementation)",
        commonMistakes: [
          "Using US-based SaaS tools without SCCs or assessing US surveillance laws (FISA 702)",
          "Relying solely on the EU-US Data Privacy Framework without monitoring its status",
          "Not conducting Transfer Impact Assessments for each transfer",
          "Forgetting that cloud hosting location determines data transfer jurisdiction",
        ],
        actionableSteps: [
          "Map all international data flows (including cloud services and subprocessors)",
          "Execute updated SCCs (2021 version) for all non-adequate country transfers",
          "Conduct Transfer Impact Assessments for each destination country",
          "Evaluate cloud provider data residency options (EU-only hosting)",
          "Monitor adequacy decisions — the EU-US Data Privacy Framework status can change",
        ],
      },
      {
        name: "CCPA/CPRA Compliance",
        description:
          "Applies to for-profit businesses with $26.6M+ revenue, processing 100K+ California residents' data, or deriving 50%+ revenue from data sales. Requires opt-out rights for data sales/sharing, right to delete, right to know, and right to correct. As of 2026, fines are $2,663/unintentional violation and $7,988/intentional violation. Data breach statutory damages: $107–$799 per consumer per incident.",
        severity: "critical",
        typicalCostToComply:
          "$5,000–$25,000 (privacy program setup + ongoing management)",
        commonMistakes: [
          "Assuming CCPA does not apply because the company is small — the 100K threshold includes website visitors",
          "Not implementing a Do Not Sell My Personal Information link",
          "Failing to respond to consumer requests within 45 days",
          "Not updating privacy policies to meet CCPA-specific disclosure requirements",
          "Ignoring the 2026 ADMT (Automated Decision-Making Technology) regulations effective January 2027",
        ],
        actionableSteps: [
          "Determine if your business meets any of the three CCPA applicability thresholds",
          "Add 'Do Not Sell or Share My Personal Information' link to website",
          "Implement a consumer rights request intake and fulfillment process",
          "Update privacy policy with CCPA-required disclosures (categories collected, purposes, third parties)",
          "Prepare for ADMT regulations: document all automated decision-making systems",
          "Implement reasonable security procedures to defend against breach liability",
        ],
      },
      {
        name: "Data Breach Notification",
        description:
          "GDPR requires notifying the supervisory authority within 72 hours of discovering a breach. Affected individuals must be notified without undue delay if the breach poses high risk to their rights. CCPA grants private right of action for breaches involving unencrypted personal information.",
        severity: "critical",
        typicalCostToComply:
          "$2,000–$10,000 (incident response plan + monitoring tools)",
        commonMistakes: [
          "No incident response plan in place before a breach occurs",
          "Failing to detect breaches promptly due to lack of monitoring",
          "Not documenting all breaches (even minor ones) in a breach register",
          "Exceeding the 72-hour GDPR notification window",
        ],
        actionableSteps: [
          "Create a documented incident response plan with assigned roles",
          "Implement breach detection monitoring (log analysis, intrusion detection)",
          "Maintain a breach register documenting all incidents and response actions",
          "Pre-draft notification templates for regulators and affected individuals",
          "Conduct annual breach response drills",
        ],
      },
    ],
    aiAct: [
      {
        name: "AI System Risk Classification",
        description:
          "The EU AI Act classifies AI into four risk tiers: unacceptable (banned), high-risk (strict obligations), limited risk (transparency obligations), and minimal risk (voluntary codes). SMBs must classify every AI system they develop or deploy. High-risk includes AI used in employment, credit scoring, essential services access, and biometric identification.",
        severity: "critical",
        typicalCostToComply:
          "$3,000–$15,000 (assessment + documentation per system)",
        commonMistakes: [
          "Assuming all business AI is minimal risk — many HR and customer-facing tools are high-risk",
          "Not classifying third-party AI tools used within the business",
          "Confusing the role of deployer vs. provider — both have obligations",
          "Not reassessing risk classification when AI system capabilities change",
        ],
        actionableSteps: [
          "Inventory all AI systems in use (including third-party SaaS with AI features)",
          "Classify each system against Annex III high-risk categories",
          "Document the classification rationale for each system",
          "Identify your role: provider (developer) vs. deployer (user) for each system",
          "Reassess classifications when systems are updated or repurposed",
        ],
      },
      {
        name: "AI Transparency Requirements",
        description:
          "AI systems interacting with people must disclose they are AI (not human). Limited-risk AI (chatbots, deepfakes, emotion recognition) must provide clear transparency notices. High-risk systems require disclosure of AI involvement in decisions.",
        severity: "critical",
        typicalCostToComply:
          "$1,000–$5,000 (UI/UX changes + notice implementation)",
        commonMistakes: [
          "Deploying chatbots without disclosing they are AI-powered",
          "Not informing customers when AI is used in decision-making affecting them",
          "Using AI-generated content without disclosure labels",
          "Burying transparency notices in terms of service instead of presenting them prominently",
        ],
        actionableSteps: [
          "Add clear AI disclosure labels to all customer-facing AI interactions",
          "Implement pre-interaction notices for chatbots and virtual assistants",
          "Label AI-generated content (text, images, recommendations) as such",
          "Include AI involvement disclosure in decision notification letters/emails",
          "Review marketing materials for undisclosed AI-generated content",
        ],
      },
      {
        name: "Automated Decision-Making (GDPR Article 22 + AI Act)",
        description:
          "Individuals have the right not to be subject to solely automated decisions with legal or significant effects. Must provide meaningful human oversight, the right to obtain human intervention, the ability to contest decisions, and meaningful information about the logic involved. CPRA ADMT regulations take effect January 2027.",
        severity: "critical",
        typicalCostToComply:
          "$5,000–$25,000 (system redesign + process implementation)",
        commonMistakes: [
          "Fully automating loan, hiring, or insurance decisions without human review",
          "Human oversight is nominal — reviewer rubber-stamps AI decisions",
          "Not providing individuals with an explanation of the decision logic",
          "No appeal or contest mechanism for automated decisions",
          "Confusing profiling with solely automated decision-making",
        ],
        actionableSteps: [
          "Identify all automated decision-making processes with legal/significant effects",
          "Implement meaningful human-in-the-loop review for high-impact decisions",
          "Build an appeal mechanism allowing individuals to contest automated decisions",
          "Provide plain-language explanations of decision criteria and logic",
          "Conduct Data Protection Impact Assessments (DPIAs) for all ADM systems",
          "Document the role and authority of human reviewers",
        ],
      },
      {
        name: "AI Bias and Fairness",
        description:
          "High-risk AI systems must be designed to minimize bias risks. Training data must be relevant, representative, and free from errors. Systems must be tested for discriminatory outcomes across protected characteristics. The EU AI Act requires data governance measures to detect and address bias.",
        severity: "important",
        typicalCostToComply:
          "$5,000–$30,000 (bias auditing + ongoing monitoring)",
        commonMistakes: [
          "Using biased training data without auditing for representativeness",
          "Testing AI performance only on aggregate metrics, missing subgroup disparities",
          "Not monitoring deployed models for drift and emerging bias over time",
          "Assuming vendor AI tools are bias-free without independent verification",
        ],
        actionableSteps: [
          "Audit training datasets for demographic representativeness",
          "Implement bias testing across protected characteristics before deployment",
          "Set up ongoing monitoring for disparate impact in production decisions",
          "Document bias mitigation measures and testing results",
          "Include fairness metrics in AI system performance reviews",
          "Request bias audit reports from third-party AI vendors",
        ],
      },
      {
        name: "Human Oversight for High-Risk AI",
        description:
          "High-risk AI systems must enable effective human oversight. Assigned individuals must understand system capabilities and limitations, monitor performance, detect anomalies, and be able to override or stop the system. The AI Act requires technical measures enabling human intervention.",
        severity: "critical",
        typicalCostToComply:
          "$3,000–$15,000 (interface design + training + documentation)",
        commonMistakes: [
          "Designating human oversight but not providing tools to actually override the AI",
          "Overseers lack training to understand system outputs and limitations",
          "No kill switch or override mechanism for automated processes",
          "Human oversight is after-the-fact review rather than real-time monitoring",
        ],
        actionableSteps: [
          "Design human override controls into all high-risk AI system interfaces",
          "Train designated overseers on system capabilities, limitations, and error patterns",
          "Implement real-time monitoring dashboards for high-risk AI operations",
          "Create escalation procedures for when AI outputs appear anomalous",
          "Document oversight roles, responsibilities, and authority levels",
          "Test override mechanisms regularly to ensure they function correctly",
        ],
      },
      {
        name: "AI Literacy (EU AI Act Article 4)",
        description:
          "As of February 2025, all organizations deploying AI must ensure sufficient AI literacy among staff who operate or are affected by AI systems. This applies to all risk levels and is one of the first enforceable obligations under the AI Act.",
        severity: "important",
        typicalCostToComply:
          "$1,000–$8,000 (training program development + delivery)",
        commonMistakes: [
          "Treating AI literacy as a one-time training event rather than ongoing education",
          "Only training technical staff while ignoring business users and management",
          "No documentation of who has been trained and on what topics",
          "Generic training not tailored to the specific AI systems the organization uses",
        ],
        actionableSteps: [
          "Assess current AI literacy levels across the organization",
          "Develop role-specific AI training programs (technical, business, management)",
          "Cover AI capabilities, limitations, risks, and ethical considerations",
          "Maintain training records with dates, content, and attendees",
          "Update training when new AI systems are deployed or existing ones change",
          "Include AI literacy in onboarding for new employees",
        ],
      },
      {
        name: "EU AI Act Penalties Awareness",
        description:
          "Non-compliance penalties: up to EUR 35M or 7% of global turnover for prohibited practices; up to EUR 15M or 3% for other violations; up to EUR 7.5M or 1% for providing incorrect information. SMEs receive proportionally lower fines (the lower of the two thresholds applies). Full enforcement from August 2, 2026.",
        severity: "important",
        typicalCostToComply: "$0 (awareness) — $5,000–$20,000 (full readiness)",
        commonMistakes: [
          "Assuming the AI Act does not apply because the business is small",
          "Not tracking the phased enforcement timeline (different dates for different obligations)",
          "Ignoring deployer obligations — thinking only AI developers are regulated",
          "Not budgeting for compliance activities before enforcement begins",
        ],
        actionableSteps: [
          "Map your organization's obligations against the enforcement timeline",
          "Budget for compliance activities before August 2026 enforcement date",
          "Consult legal counsel on specific obligations for your AI use cases",
          "Monitor EU AI Office guidance and Codes of Practice for SME-specific provisions",
          "Join industry associations for shared compliance resources and guidance",
        ],
      },
    ],
    dataProtection: [
      {
        name: "Data Protection Impact Assessment (DPIA)",
        description:
          "Required under GDPR when processing is likely to result in high risk to individuals' rights and freedoms. Mandatory for systematic profiling, large-scale processing of sensitive data, and public monitoring. Becoming a standard gating step for AI deployment.",
        severity: "critical",
        typicalCostToComply: "$3,000–$12,000 per assessment",
        commonMistakes: [
          "Not conducting DPIAs for AI systems that profile or score individuals",
          "Treating DPIA as a one-time exercise rather than updating it when processing changes",
          "Conducting DPIAs after deployment rather than before",
          "Not consulting the Data Protection Officer (DPO) or affected individuals",
        ],
        actionableSteps: [
          "Create a DPIA template aligned with your supervisory authority's guidance",
          "Screen all new processing activities (especially AI) against DPIA triggers",
          "Conduct DPIAs before deploying new AI systems or major changes",
          "Include risk mitigation measures and residual risk assessment",
          "Review and update DPIAs when processing changes materially",
        ],
      },
      {
        name: "Data Processing Agreements (DPAs)",
        description:
          "Required whenever personal data is shared with processors (vendors, cloud providers, AI tool providers). Must include processing scope, security measures, sub-processor controls, breach notification obligations, and audit rights. CCPA requires similar service provider agreements.",
        severity: "critical",
        typicalCostToComply:
          "$1,000–$5,000 (legal templates + vendor management)",
        commonMistakes: [
          "Using AI SaaS tools without a signed DPA in place",
          "Not verifying subprocessor chains (your vendor's vendors)",
          "DPAs that are outdated and do not reflect current processing activities",
          "No audit rights included in vendor agreements",
        ],
        actionableSteps: [
          "Inventory all vendors and processors who access personal data",
          "Execute DPAs with all data processors before sharing data",
          "Include AI-specific clauses: model training restrictions, output data handling",
          "Require vendors to notify you of subprocessor changes",
          "Review DPAs annually and when vendor relationships change",
        ],
      },
      {
        name: "Privacy by Design and Default",
        description:
          "GDPR Article 25 requires data protection to be integrated into system design from the outset. Default settings must be the most privacy-protective. Applies to all new systems, including AI implementations.",
        severity: "important",
        typicalCostToComply:
          "$2,000–$10,000 (integrated into development process)",
        commonMistakes: [
          "Bolting privacy controls onto systems after they are built",
          "Default settings collect maximum data rather than minimum necessary",
          "No privacy review step in the software development lifecycle",
          "Treating privacy by design as a documentation exercise rather than technical implementation",
        ],
        actionableSteps: [
          "Add a privacy review checkpoint to your AI project methodology",
          "Apply data minimization: collect only what is necessary for the stated purpose",
          "Set defaults to most privacy-protective settings (opt-out rather than opt-in for data collection)",
          "Implement pseudonymization or anonymization where possible",
          "Document privacy-by-design decisions in technical specifications",
        ],
      },
      {
        name: "Data Security (Technical and Organizational Measures)",
        description:
          "GDPR Article 32 requires implementing appropriate security measures: encryption, pseudonymization, resilience, recovery capability, and regular testing. Reasonable security is also the primary defense against CCPA breach liability. PCI DSS 4.0.1 applies if handling payment card data.",
        severity: "critical",
        typicalCostToComply:
          "$5,000–$30,000 (security tooling + policies + training)",
        commonMistakes: [
          "No encryption for data at rest and in transit",
          "Weak access controls — too many employees with unnecessary data access",
          "No regular security testing or vulnerability assessments",
          "Not including AI model access and API keys in security controls",
        ],
        actionableSteps: [
          "Implement encryption at rest and in transit for all personal data",
          "Apply principle of least privilege for data access controls",
          "Conduct annual penetration testing and vulnerability assessments",
          "Secure AI API keys, model endpoints, and training data repositories",
          "Implement multi-factor authentication for systems handling personal data",
          "If handling payment data, ensure PCI DSS 4.0.1 compliance (mandatory since March 2025)",
        ],
      },
    ],
  },
  byIndustry: {
    retail: {
      industry: "Retail",
      keyRegulations: [
        "GDPR / CCPA-CPRA (customer data)",
        "PCI DSS 4.0.1 (payment card data — mandatory since March 2025)",
        "EU AI Act (AI-powered pricing, recommendations, chatbots)",
        "FTC Act Section 5 (unfair or deceptive practices, including AI shopping assistants)",
        "Consumer protection laws (warranty claims via AI assistants, dynamic pricing transparency)",
        "ePrivacy Directive / state cookie laws",
        "ADA / WCAG (digital accessibility for AI-powered interfaces)",
      ],
      dataHandlingRequirements: [
        "Payment card data must be encrypted and handled per PCI DSS 4.0.1 — organizations choose implementation pathway",
        "Customer purchase history and preferences subject to data minimization and retention limits",
        "Marketing personalization requires consent (GDPR) or opt-out mechanism (CCPA)",
        "AI shopping assistants must not make false product representations — potential warranty liability",
        "Dynamic pricing algorithms must be transparent and non-discriminatory",
        "Loyalty program data processing requires clear lawful basis and purpose limitation",
      ],
      aiRestrictions: [
        "AI chatbots must disclose they are not human (EU AI Act transparency)",
        "AI-driven dynamic pricing must not discriminate based on protected characteristics",
        "AI product recommendations using profiling may trigger GDPR Article 22 rights",
        "AI shopping assistants creating warranty implications need legal review",
        "Emotion recognition in physical stores is a prohibited AI practice under the EU AI Act",
      ],
      commonGaps: [
        "PCI DSS 4.0.1 new requirements not yet implemented (customized approach flexibility misunderstood)",
        "AI chatbot deployed without transparency disclosure",
        "Customer analytics/profiling without DPIA",
        "Cookie consent banners not compliant with latest regulations",
        "No CCPA opt-out mechanism for data sharing with marketing partners",
        "AI-powered pricing algorithms not audited for discriminatory outcomes",
      ],
      certifications: [
        "PCI DSS 4.0.1 (mandatory for card payments — SAQ or ROC depending on volume)",
        "SOC 2 Type II (for e-commerce platforms handling customer data)",
        "ISO 27001 (information security — recommended)",
        "Cyber Essentials / Cyber Essentials Plus (UK-focused)",
      ],
    },
    manufacturing: {
      industry: "Manufacturing",
      keyRegulations: [
        "GDPR / CCPA (employee and customer data)",
        "EU AI Act (AI in quality control, predictive maintenance, worker safety)",
        "OSHA workplace safety regulations (expanding enforcement in 2026)",
        "ISO 45001 (occupational health and safety management — integrating AI/automation)",
        "ISO 9001 (quality management — AI in quality control must be validated)",
        "EU Machinery Regulation 2023/1230 (replaces Machinery Directive for AI-enabled machinery)",
        "REACH / RoHS (chemical and environmental compliance for AI-optimized processes)",
        "Export control regulations (AI technology transfer restrictions)",
      ],
      dataHandlingRequirements: [
        "Employee monitoring data (wearables, cameras) requires consent and DPIA",
        "IoT sensor data linked to identifiable workers is personal data under GDPR",
        "Quality control AI processing product images with embedded metadata may capture personal data",
        "Predictive maintenance data from employee-operated machinery may be considered monitoring",
        "Supply chain data sharing requires DPAs with all partners",
      ],
      aiRestrictions: [
        "AI safety systems must have human override capability (EU AI Act + OSHA)",
        "Worker scoring/ranking by AI is high-risk under the EU AI Act Annex III",
        "AI-driven production decisions affecting worker safety require meaningful human oversight",
        "Automated quality control systems must be validated against ISO 9001 requirements",
        "AI-enabled machinery must comply with EU Machinery Regulation cybersecurity requirements",
      ],
      commonGaps: [
        "IoT sensor data from shop floor not classified as personal data when it should be",
        "No DPIA for AI-powered employee productivity monitoring",
        "AI safety systems without documented human override procedures",
        "Predictive maintenance AI sharing data with vendors without DPA",
        "OSHA compliance not updated for AI/robotic safety integration",
        "ISO certifications not updated to cover AI-augmented processes",
      ],
      certifications: [
        "ISO 9001 (quality management — mandatory for many supply chains)",
        "ISO 45001 (occupational health and safety — increasingly requires AI safety provisions)",
        "ISO 27001 (information security — recommended for smart manufacturing)",
        "CE marking (for AI-enabled products sold in EU)",
        "Industry-specific certifications (automotive: IATF 16949; aerospace: AS9100)",
      ],
    },
    services: {
      industry: "Professional Services",
      keyRegulations: [
        "GDPR / CCPA-CPRA (client and employee data)",
        "EU AI Act (AI in client-facing services, automated reports, chatbots)",
        "Professional licensing regulations (sector-specific — legal, accounting, consulting)",
        "Anti-Money Laundering (AML) regulations (for financial advisory and accounting)",
        "SOX compliance (if serving publicly traded companies)",
        "Sector-specific confidentiality obligations (attorney-client privilege, etc.)",
      ],
      dataHandlingRequirements: [
        "Client data often includes sensitive categories requiring enhanced protection",
        "Professional confidentiality obligations may exceed GDPR minimums",
        "AI tools processing client data may create new confidentiality risks (data leakage to AI providers)",
        "Cross-border data transfers common in international service firms",
        "Data retention governed by both regulation and professional standards",
      ],
      aiRestrictions: [
        "AI-generated professional advice may create liability issues",
        "Using AI for client profiling or risk scoring is high-risk under EU AI Act",
        "AI tools must not compromise professional confidentiality (e.g., sending client data to third-party LLMs)",
        "Automated client communications must be reviewed for accuracy and professional standards",
        "AI-assisted due diligence must maintain audit trail and human verification",
      ],
      commonGaps: [
        "Staff using public AI tools (ChatGPT, etc.) with client data — no usage policy",
        "No DPA with AI tool providers processing client data",
        "AI-generated reports sent to clients without human review",
        "Professional indemnity insurance not updated to cover AI-related errors",
        "Cross-border data transfers via cloud AI tools not assessed",
      ],
      certifications: [
        "SOC 2 Type II (increasingly required by enterprise clients)",
        "ISO 27001 (information security management)",
        "Sector-specific accreditations (legal: Lexcel; accounting: ISAE 3402)",
        "Cyber Essentials (UK) / NIST CSF (US) — baseline cybersecurity",
      ],
    },
    tech: {
      industry: "Technology / SaaS",
      keyRegulations: [
        "GDPR / CCPA-CPRA (user data, behavioral analytics)",
        "EU AI Act (obligations as AI providers, not just deployers)",
        "EU Digital Services Act (for platforms with content moderation AI)",
        "EU Digital Markets Act (for larger platforms)",
        "ePrivacy Directive (cookies, tracking, electronic communications)",
        "COPPA (if products are used by children)",
        "State-level AI laws (Colorado AI Act, NYC Local Law 144 for hiring AI)",
        "Export control regulations (AI technology exports)",
      ],
      dataHandlingRequirements: [
        "User behavioral data and analytics subject to consent requirements",
        "AI model training on user data requires lawful basis and transparency",
        "Telemetry and usage data may be personal data if linked to users",
        "API integrations creating data flows require DPAs and transfer assessments",
        "Open-source AI models still require compliance when deployed commercially",
      ],
      aiRestrictions: [
        "As AI providers (not just deployers), tech SMBs have enhanced obligations under the EU AI Act",
        "High-risk AI systems require conformity assessments, technical documentation, and post-market monitoring",
        "General-purpose AI models (GPAI) have separate obligations since August 2025",
        "AI used in content moderation requires transparency reporting (Digital Services Act)",
        "Automated hiring/HR AI tools must comply with NYC LL144 and similar local laws",
      ],
      commonGaps: [
        "Building AI products without classifying risk level under the EU AI Act",
        "No technical documentation meeting EU AI Act requirements for high-risk systems",
        "Training AI on user data without updating privacy policy or obtaining consent",
        "Missing GPAI compliance obligations (model cards, technical documentation)",
        "Security vulnerabilities in AI APIs and model endpoints",
        "No post-market monitoring plan for deployed AI systems",
      ],
      certifications: [
        "SOC 2 Type II (table stakes for B2B SaaS)",
        "ISO 27001 (information security — increasingly required by enterprise customers)",
        "ISO 42001 (AI management system — new standard for AI governance)",
        "GDPR adequacy / EU representative appointment (if non-EU company serving EU users)",
        "CSA STAR (cloud security for cloud-based products)",
      ],
    },
    healthcare: {
      industry: "Healthcare",
      keyRegulations: [
        "HIPAA Privacy Rule and Security Rule (foundational for all PHI handling)",
        "HITECH Act (enhanced enforcement and breach notification)",
        "GDPR (for EU patients/operations)",
        "EU AI Act (AI in healthcare is high-risk — Annex III)",
        "FDA regulations — 21 CFR Part 11 (electronic records), QSR (AI as medical device)",
        "FDA AI/ML Action Plan (Software as a Medical Device framework)",
        "EU Medical Device Regulation (EU MDR) for AI-enabled health devices",
        "State health data privacy laws (Washington My Health My Data Act, etc.)",
        "FHIR/SMART interoperability standards (integration requirements for certified systems)",
      ],
      dataHandlingRequirements: [
        "All AI vendors accessing PHI must sign a Business Associate Agreement (BAA)",
        "PHI must be encrypted at rest and in transit — minimum AES-256",
        "Minimum necessary standard: AI systems should only access PHI required for their function",
        "Audit logs must track all access to PHI, including by AI systems",
        "De-identification under HIPAA Safe Harbor or Expert Determination before using data for AI training",
        "Patient consent required for uses beyond treatment, payment, and healthcare operations",
      ],
      aiRestrictions: [
        "AI diagnostic tools may be regulated as Software as a Medical Device (SaMD) by FDA",
        "Clinical decision support AI must meet FDA 2026 CDS Guidance — emphasis on transparency of inputs, logic, and recommendations",
        "AI must not replace clinical judgment — human oversight mandatory for clinical decisions",
        "AI systems affecting patient care are high-risk under EU AI Act — full compliance required by August 2026",
        "Algorithmic bias in clinical AI must be tested across demographic groups",
        "AI-generated clinical documentation must be reviewed by licensed professionals",
      ],
      commonGaps: [
        "AI tools deployed without signed BAAs — treating AI vendors as non-business-associates",
        "No DPIA/risk assessment for AI systems processing PHI",
        "AI clinical tools not registered or assessed under FDA SaMD framework",
        "Insufficient audit trails for AI access to patient records",
        "AI training data not properly de-identified under HIPAA standards",
        "Staff using consumer AI tools (ChatGPT) with patient information",
      ],
      certifications: [
        "HIPAA compliance attestation (annual risk assessment required)",
        "HITRUST CSF (comprehensive healthcare security framework)",
        "SOC 2 Type II (for health tech vendors)",
        "FDA 510(k) or De Novo classification (for AI medical devices)",
        "EU MDR CE marking (for AI health devices in EU market)",
        "ONC Health IT Certification (for certified EHR technology with AI features)",
      ],
    },
    food: {
      industry: "Food & Beverage",
      keyRegulations: [
        "FDA FSMA (Food Safety Modernization Act) — all seven foundational rules",
        "FSMA Rule 204 — Food Traceability Rule (compliance deadline extended to July 2028, but preparation needed now)",
        "HACCP (Hazard Analysis Critical Control Points)",
        "GDPR / CCPA (customer data from D2C, loyalty programs, online ordering)",
        "EU AI Act (AI in food safety monitoring, quality control, supply chain)",
        "FDA 21 CFR Part 117 (Current Good Manufacturing Practices)",
        "EU Food Information Regulation (labeling including AI-generated recommendations)",
        "Local health department regulations (vary by jurisdiction)",
      ],
      dataHandlingRequirements: [
        "FSMA 204 requires Key Data Elements (KDEs) for each Critical Tracking Event (CTE) — receiving, transformation, creation, shipping",
        "Traceability records must be maintained for foods on the Food Traceability List (cheeses, eggs, fruits/vegetables, seafood, ready-to-eat salads)",
        "Customer allergen data from ordering systems is health-related personal data — enhanced protection required",
        "Supplier data sharing for traceability requires data processing agreements",
        "IoT sensor data (temperature, humidity) linked to employees may be personal data",
      ],
      aiRestrictions: [
        "AI food safety monitoring systems must have human oversight — cannot be sole decision-maker for safety determinations",
        "AI-powered allergen detection must be validated and cannot replace mandatory labeling",
        "AI quality control decisions affecting food safety are high-risk under EU AI Act",
        "Automated supply chain decisions must maintain full audit trail for FDA inspections",
        "AI demand forecasting affecting food waste must comply with local sustainability regulations",
      ],
      commonGaps: [
        "Not preparing for FSMA 204 traceability requirements despite 2028 deadline",
        "HACCP plans not updated to include AI-powered monitoring systems",
        "Customer allergen data from apps/online ordering not properly protected",
        "AI quality control systems without validation against food safety standards",
        "No DPA with AI/tech vendors accessing supply chain data",
        "Temperature monitoring IoT data not included in data protection assessments",
      ],
      certifications: [
        "FSMA compliance (mandatory for most food facilities)",
        "HACCP certification (mandatory for many food categories)",
        "SQF (Safe Quality Food) / BRC Global Standard / FSSC 22000 (GFSI-recognized schemes)",
        "ISO 22000 (food safety management system)",
        "Organic / Non-GMO / other specialty certifications (as applicable)",
        "PCI DSS 4.0.1 (if processing payments in food retail/restaurant)",
      ],
    },
    construction: {
      industry: "Construction",
      keyRegulations: [
        "OSHA workplace safety regulations (expanded inspections and enforcement in 2026)",
        "OSHA Heat Illness Prevention Standard (new — requires rest, shade, hydration, acclimatization)",
        "ISO 45001 (occupational health and safety — now integrating AI and robotics)",
        "GDPR / CCPA (worker data, client data, subcontractor data)",
        "EU AI Act (AI in worker safety monitoring, project management, site surveillance)",
        "EU Machinery Regulation 2023/1230 (AI-enabled construction equipment)",
        "Environmental regulations (AI-optimized processes must still meet environmental standards)",
        "PPE regulations (revised January 2025 — all PPE must properly fit each worker)",
        "Building codes and permits (jurisdiction-specific)",
      ],
      dataHandlingRequirements: [
        "Worker monitoring via AI cameras, wearables, or drones requires consent and DPIA",
        "Biometric data from site access systems is sensitive data under GDPR — explicit consent required",
        "Subcontractor personal data processing requires DPAs",
        "Drone surveillance footage may capture personal data of workers and public — proportionality required",
        "GPS tracking of vehicles and equipment linked to workers is personal data",
      ],
      aiRestrictions: [
        "AI safety monitoring must supplement, not replace, human safety officers",
        "Real-time biometric identification on construction sites is restricted under EU AI Act",
        "AI-powered worker productivity scoring is high-risk under EU AI Act Annex III",
        "Autonomous construction equipment requires human override and safety shutdown capability",
        "AI-generated safety reports must be reviewed by qualified safety professionals",
      ],
      commonGaps: [
        "Worker surveillance via AI cameras deployed without DPIA or consent",
        "OSHA compliance not updated for AI-assisted and robotic equipment",
        "No human override documented for AI safety monitoring systems",
        "Subcontractor data flows not covered by DPAs",
        "AI predictive safety tools not validated against actual incident data",
        "Drone usage policies do not address personal data capture",
      ],
      certifications: [
        "OSHA compliance (mandatory — increased inspections in 2026)",
        "ISO 45001 (occupational health and safety — competitive advantage and increasingly expected)",
        "ISO 9001 (quality management for construction processes)",
        "NEBOSH / IOSH qualifications (for safety professionals overseeing AI systems)",
        "SSIP (Safety Schemes in Procurement) or equivalent prequalification",
        "Cyber Essentials (for firms handling digital project data and BIM models)",
      ],
    },
  },
  aiImplementationChecklist: {
    preImplementation: [
      "CRITICAL: Classify the AI system under EU AI Act risk categories (unacceptable, high, limited, minimal)",
      "CRITICAL: Determine your role — AI provider (developer) vs. deployer (user) — obligations differ significantly",
      "CRITICAL: Conduct a Data Protection Impact Assessment (DPIA) for any AI processing personal data",
      "CRITICAL: Identify if the AI makes or assists with decisions that have legal or significant effects on individuals",
      "IMPORTANT: Audit the training data for bias, representativeness, and lawful acquisition",
      "IMPORTANT: Review all vendor/AI provider contracts for DPAs, BAAs (healthcare), and AI-specific clauses",
      "IMPORTANT: Map all data flows — what personal data enters the AI, where it is processed, who has access",
      "IMPORTANT: Verify cross-border data transfer safeguards if AI processing occurs outside your jurisdiction",
      "IMPORTANT: Check industry-specific regulations (HIPAA, PCI DSS, FSMA, OSHA) for AI-specific requirements",
      "RECOMMENDED: Engage legal counsel experienced in AI regulation for high-risk implementations",
      "RECOMMENDED: Conduct a privacy-by-design review of the AI system architecture",
      "RECOMMENDED: Assess cybersecurity risks specific to the AI system (model poisoning, adversarial attacks, data exfiltration)",
    ],
    duringImplementation: [
      "CRITICAL: Implement transparency notices — disclose AI involvement to affected individuals",
      "CRITICAL: Build human oversight mechanisms (override controls, escalation paths, kill switches) for high-risk AI",
      "CRITICAL: Configure data minimization — AI should only access personal data necessary for its function",
      "CRITICAL: Implement access controls and audit logging for all AI system interactions with personal data",
      "IMPORTANT: Set up consent collection if relying on consent as the lawful basis for AI processing",
      "IMPORTANT: Create data subject request workflows — how will erasure/portability requests affect the AI system?",
      "IMPORTANT: Document the AI system thoroughly: purpose, data inputs, logic, outputs, limitations, known risks",
      "IMPORTANT: Implement bias testing across protected characteristics before go-live",
      "IMPORTANT: Establish data retention rules specific to AI — training data, logs, model versions",
      "RECOMMENDED: Set up A/B testing or shadow mode before full deployment to identify issues",
      "RECOMMENDED: Create user-facing documentation explaining how the AI works and what data it uses",
      "RECOMMENDED: Plan the model update process — how will retraining affect compliance?",
    ],
    ongoingMonitoring: [
      "CRITICAL: Monitor AI outputs for bias, drift, and accuracy degradation on a regular schedule",
      "CRITICAL: Process data subject requests (erasure, access, portability) including AI-held data within required timeframes",
      "CRITICAL: Maintain incident response readiness for AI-specific incidents (data leaks, biased decisions, system failures)",
      "CRITICAL: Keep all AI system documentation current — update when systems, data, or purposes change",
      "IMPORTANT: Conduct periodic DPIA reviews (at least annually or when processing changes materially)",
      "IMPORTANT: Audit vendor compliance — verify AI providers maintain their compliance commitments",
      "IMPORTANT: Review and update AI training programs for staff (EU AI Act AI literacy requirement)",
      "IMPORTANT: Track regulatory changes — EU AI Act enforcement dates, new state AI laws, sector guidance",
      "IMPORTANT: Perform annual penetration testing and security assessments on AI systems",
      "RECOMMENDED: Benchmark AI performance against fairness metrics across demographic groups quarterly",
      "RECOMMENDED: Review and optimize consent rates and consumer rights request fulfillment times",
      "RECOMMENDED: Participate in industry working groups for AI compliance best practices and shared resources",
    ],
  },
};

export default complianceData;
