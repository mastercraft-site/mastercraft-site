export const SITE_ORIGIN = 'https://www.mastercraftautony.com';

export const pages = [
  {
    path: '/', kind: 'home', lastmod: '2026-10-29',
    title: 'Collision & Auto Repair in Long Island City, NY | MasterCraft',
    description: 'Collision and frame repair, insurance claim help, diagnostics and color-match paint in Long Island City, NY. MasterCraft is open daily, 6 AM to midnight.',
  },
  {
    path: '/collision-repair/', kind: 'service', lastmod: '2026-10-29', label: 'Collision Repair',
    title: 'Collision & Frame Repair in Long Island City | MasterCraft',
    description: 'Collision, structural and full-frame repair in Long Island City, Queens. Learn about computerized frame measuring, repair planning and insurance coordination.',
    heading: 'Collision & Frame Repair In Long Island City',
    intro: 'A collision can affect more than the panels you can see. At MasterCraft in Long Island City, Queens, collision repair includes evaluating body damage and structural alignment before planning the work.',
    image: '/images/959694.jpg', imageAlt: 'Black Audi before and after front-end collision repair',
    sections: [
      { heading: 'Frame measuring and structural alignment', text: 'Computerized frame measuring helps identify alignment problems after a collision. Factory-spec structural realignment addresses the vehicle structure rather than only the appearance of damaged panels.' },
      { heading: 'Full-frame and body repair', text: 'The repair plan depends on the damage to the individual vehicle. We handle full-frame collision repair and precision body work, with paint and finishing work coordinated as part of the restoration.' },
      { heading: 'Starting your repair', text: 'Send photos of the damage, your vehicle details, and your contact information. Photos help start the conversation; an in-person inspection may be needed to establish the full repair scope.' },
    ],
    points: ['Computerized frame measuring', 'Factory-spec structural realignment', 'Full-frame collision repair', 'Body work and paint coordination'],
    related: ['/insurance-claims/', '/body-paint/', '/faq/'],
  },
  {
    path: '/insurance-claims/', kind: 'service', lastmod: '2026-10-29', label: 'Insurance Claims',
    title: 'Auto Insurance Claim Help in Long Island City | MasterCraft',
    description: 'Get help with collision insurance claims in Long Island City, Queens. MasterCraft works with adjusters, repair supplements and claim paperwork.',
    heading: 'Insurance Claim Help In Long Island City',
    intro: 'Repairing your car should not leave you managing every conversation alone. Our Long Island City, Queens shop works with insurance adjusters and handles repair-related supplements and paperwork.',
    image: '/images/Before-After-Jeep.webp', imageAlt: 'White Jeep rear-end damage before repair and its restored rear bodywork',
    sections: [
      { heading: 'Working with your adjuster', text: 'We discuss the repair work with your adjuster and help coordinate the claim-related information needed for the repair. Share your insurer and claim information when you contact the shop.' },
      { heading: 'Handling repair supplements', text: 'Additional damage can become apparent as a repair is evaluated. A supplement documents changes to the repair scope for the insurer to review; it is not a guarantee of additional coverage or payment.' },
      { heading: 'What to have ready', text: 'Your vehicle details, damage photos, insurance company, and available claim information help us start. Coverage, deductibles, and approvals depend on your policy and insurer, so confirm those details with your insurance company.' },
    ],
    points: ['Communication with adjusters', 'Repair supplement coordination', 'Help with claim paperwork', 'Progress updates'],
    related: ['/collision-repair/', '/reviews/', '/faq/'],
  },
  {
    path: '/mechanical-repair/', kind: 'service', lastmod: '2026-10-29', label: 'Mechanical Repair',
    title: 'Mechanical Repair & Diagnostics in Long Island City | MasterCraft',
    description: 'Engine, transmission, brake and diagnostic services in Long Island City, Queens. Tell MasterCraft about warning lights, unusual noises or maintenance needs.',
    heading: 'Mechanical Repair & Diagnostics In Long Island City',
    intro: 'MasterCraft brings mechanical repair and collision work together at our Long Island City, Queens location. Contact us about engine or transmission concerns, brakes, warning lights, or factory maintenance.',
    image: '/images/hero-storefront.webp', imageAlt: 'MasterCraft Auto Repair & Collision shop in Long Island City, Queens',
    sections: [
      { heading: 'Engine and transmission concerns', text: 'Describe what the vehicle is doing, when the issue happens, and whether warning lights are present. Those details provide a useful starting point for diagnostics rather than guessing which part needs replacement.' },
      { heading: 'Brake service and diagnostics', text: 'Changes in braking feel, vibration, or unusual noises deserve attention. Contact the shop to discuss brake service and the inspection your vehicle needs; if the vehicle feels unsafe to drive, do not continue driving it.' },
      { heading: 'Factory maintenance', text: 'Maintenance needs depend on the vehicle and its service history. Bring the make, model, year, and details of recent work so we can discuss the appropriate factory maintenance with you.' },
    ],
    points: ['Engine diagnostics', 'Transmission concerns', 'Brake service', 'Factory maintenance'],
    related: ['/collision-repair/', '/about/', '/faq/'],
  },
  {
    path: '/body-paint/', kind: 'service', lastmod: '2026-10-29', label: 'Body & Paint',
    title: 'Auto Body & Color-Match Paint in Long Island City | MasterCraft',
    description: 'Precision body work, color-matched paint and clear coat finishing in Long Island City, Queens. See repair examples and request an estimate from MasterCraft.',
    heading: 'Auto Body & Paint In Long Island City',
    intro: 'Body repair and paint finishing work together to restore a vehicle after damage. Our Long Island City, Queens shop handles precision body work, color-matched painting, and clear coat finishing.',
    image: '/images/GetLibraryImage.jpeg', imageAlt: 'Gray Acura before and after front bumper and body restoration',
    sections: [
      { heading: 'Precision body work', text: 'Damaged panels and bumpers need a repair plan suited to their condition. We evaluate the body damage and discuss the work required before coordinating the finishing stages.' },
      { heading: 'Color-matched painting', text: 'Matching a repaired area to the rest of the vehicle is an important part of the finish. Color-matched precision painting is part of our body and paint service, whether the work follows a collision or another body repair.' },
      { heading: 'Clear coat finishing', text: 'Clear coat is part of the final paint finish. Tell us which areas were damaged and share photographs so we can discuss the repair and finishing work your vehicle needs.' },
    ],
    points: ['Precision body work', 'Color-matched paint', 'Clear coat finishing', 'Collision restoration'],
    related: ['/collision-repair/', '/insurance-claims/', '/reviews/'],
  },
  {
    path: '/reviews/', kind: 'reviews', lastmod: '2026-10-29', label: 'Reviews',
    title: 'Customer Reviews in Long Island City | MasterCraft Auto Repair',
    description: 'Read MasterCraft customer reviews for collision repair and insurance claim help in Long Island City, Queens. Visit our Google listing or leave a review.',
    heading: 'Customer Reviews From Long Island City Drivers',
    intro: 'Read customer feedback about repair work and insurance claim help at MasterCraft in Long Island City, Queens. The original Google listing is linked below for complete reviews and current reviewer information.',
    related: ['/collision-repair/', '/insurance-claims/', '/about/'],
  },
  {
    path: '/about/', kind: 'about', lastmod: '2026-10-29', label: 'About',
    title: 'About Syed Bukhari & MasterCraft | Long Island City Auto Repair',
    description: 'Meet MasterCraft owner Syed Bukhari and learn about his 30+ years in collision and mechanical repair at our Long Island City, Queens shop.',
    heading: 'About MasterCraft In Long Island City',
    intro: 'MasterCraft Auto Repair & Collision is based at 38-21 23rd Street in Long Island City, Queens. Owner Syed Bukhari brings over 30 years of experience in collision and mechanical repair to the shop.',
    sections: [
      { heading: 'Personal attention from estimate to inspection', text: 'Our work brings collision restoration, mechanical repairs, body and paint, and insurance claim coordination together at one location. Syed takes a personal look at the work, from the first estimate to the final inspection.' },
      { heading: 'Experience and technician qualifications', text: 'The shop has certified technicians. Ask us about the current technician qualifications relevant to your vehicle and repair when discussing the work with our team.' },
      { heading: 'Visit the shop', text: 'We are open daily from 6 AM to midnight. Drivers visiting from Queens, Brooklyn, or elsewhere in New York City can call to discuss their vehicle and arrange a visit to our Long Island City location.' },
    ],
    related: ['/collision-repair/', '/mechanical-repair/', '/faq/'],
  },
  {
    path: '/faq/', kind: 'faq', lastmod: '2026-10-29', label: 'FAQ',
    title: 'Auto Repair & Collision FAQs in Long Island City | MasterCraft',
    description: 'Answers about collision repair timing, insurance, supplements, warranty questions and rental arrangements at MasterCraft in Long Island City, Queens.',
    heading: 'Auto Repair & Collision FAQs',
    intro: 'Answers about estimates, insurance claims, and visiting our Long Island City, Queens repair shop. Call us to discuss your specific vehicle or claim.',
    questions: [
      { question: 'How long does collision repair take in NYC?', answer: 'Timing depends on the damage, repair scope, parts availability, and any insurance approvals. Contact our Long Island City shop to discuss the expected timeline for your vehicle rather than relying on a general estimate.' },
      { question: 'Will my insurance company pay for repair at your shop?', answer: 'Payment depends on your policy, deductible, covered damage, and insurer approval. We work with adjusters and handle repair paperwork, but cannot promise that an insurer will pay for every repair item.' },
      { question: 'Do you work with my insurance company?', answer: 'We coordinate repair work with insurance adjusters and help with claim paperwork. Tell us your insurance company and share any available claim information so we can discuss your specific claim with you.' },
      { question: 'What is a supplement, and do I need one?', answer: 'A supplement documents additional or changed repair work for your insurer to review, such as damage identified during evaluation. Whether one is needed depends on your repair scope; it does not guarantee additional coverage or payment.' },
      { question: 'Do you offer a warranty on repairs and paint?', answer: 'Call us to confirm the warranty terms for your specific repair or paint work before authorizing it. Ask for any coverage, time or mileage limits, and exclusions in writing.' },
      { question: 'Do you offer a rental car during repairs?', answer: 'Call us before your repair to ask about rental or alternative transportation arrangements. If you are using insurance, ask your insurer whether your policy includes rental reimbursement and what limits apply.' },
      { question: 'Where is MasterCraft, and what are your hours?', answer: 'We are at 38-21 23rd Street, Long Island City, NY 11101, in Queens. The shop is open every day from 6 AM to 12 AM, midnight.' },
      { question: 'How do I request an estimate and send damage photos?', answer: 'Use the estimate form to send your contact information, vehicle details, and a description of the problem, or call (718) 578-4563. You can attach up to 10 JPG, PNG, or WebP photos, no larger than 10 MB each; an in-person inspection may be needed to establish the full repair scope.' },
    ],
    related: ['/insurance-claims/', '/mechanical-repair/', '/about/'],
  },
];

export function getPage(pathname = '/') {
  const normalized = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  return pages.find((page) => page.path.replace(/\/$/, '') === normalized || (page.path === '/' && normalized === '/'));
}