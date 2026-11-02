export const homepage = {
  brandName: "Nexcent",
  auth: {
    loginLabel: "Login",
    loginHref: "#login",
    signupLabel: "Sign up",
    signupHref: "#signup"
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Service", href: "#services" },
    { label: "Feature", href: "#features" },
    { label: "Product", href: "#product" },
    { label: "Testimonial", href: "#testimonials" },
    { label: "FAQ", href: "#faq" }
  ],
  hero: {
    slides: [0, 1, 2].map((slide) => ({
      id: `hero-${slide + 1}`,
      titleLines: ["Lessons and insights", "from 8 years"],
      description: "Where to grow your business as a photographer: site or social media?",
      buttonLabel: "Register",
      buttonHref: "#contact",
      imageUrl: "/assets/img/placeholder.svg",
      imageAlt: "Nexcent illustration"
    }))
  },
  clients: {
    heading: "Our Clients",
    subheading: "We have been working with some Fortune 500+ clients",
    logos: [
      { name: "Client 1", imageUrl: "/assets/clients/client-1.svg" },
      { name: "Client 2", imageUrl: "/assets/clients/client-2.svg" },
      { name: "Client 3", imageUrl: "/assets/clients/client-3.svg" },
      { name: "Logo Ipsum", imageUrl: "/assets/clients/client-4.svg" },
      { name: "Client 5", imageUrl: "/assets/clients/client-5.svg" },
      { name: "Client 6", imageUrl: "/assets/clients/client-6.svg" },
      { name: "Client 3", imageUrl: "/assets/clients/client-3.svg" }
    ]
  },
  audienceSection: {
    heading: "Manage your entire community in a single system",
    subheading: "Who is Nexcent suitable for?"
  },
  audiences: [
    {
      id: "membership-organisations",
      title: "Membership Organisations",
      description: "Our membership management software provides full automation of membership renewals and payments.",
      iconUrl: "/assets/icons/people-1.svg"
    },
    {
      id: "national-associations",
      title: "National Associations",
      description: "Our membership management software provides full automation of membership renewals and payments.",
      iconUrl: "/assets/icons/building.svg"
    },
    {
      id: "clubs-and-groups",
      title: "Clubs And Groups",
      description: "Our membership management software provides full automation of membership renewals and payments.",
      iconUrl: "/assets/icons/hands.svg"
    }
  ],
  featureSections: [
    {
      id: "pixelgrade",
      title: "The unseen of spending three years at Pixelgrade",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.",
      imageUrl: "/assets/img/feature-pixelgrade.png",
      imageAlt: "Two people reviewing a membership interface",
      buttonLabel: "Learn More",
      buttonHref: "#learn-more-pixelgrade"
    }
  ],
  statsSection: {
    headingLines: ["Helping a local", "business reinvent itself"],
    subheading: "We reached here with our hard work and dedication"
  },
  stats: [
    { id: "members", value: "2,245,341", label: "Members", iconUrl: "/assets/icons/people-2.png" },
    { id: "clubs", value: "46,328", label: "Clubs", iconUrl: "/assets/icons/hands-2.png" },
    { id: "event-bookings", value: "828,867", label: "Event Bookings", iconUrl: "/assets/icons/event.svg" },
    { id: "payments", value: "1,926,436", label: "Payments", iconUrl: "/assets/icons/payment.svg" }
  ],
  secondaryFeature: {
    title: "How to design your site footer like we did",
    description: "Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.",
    imageUrl: "/assets/img/feature-footer.png",
    imageAlt: "Member interacting with a mobile membership interface",
    buttonLabel: "Learn More",
    buttonHref: "#learn-more-footer"
  },
  testimonial: {
    quote: "Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.",
    name: "Tim Smith",
    organization: "British Dragon Boat Racing Association",
    imageUrl: "/assets/img/testimonial.jpg",
    imageAlt: "Customer brand mark",
    clientsHeading: "Meet all customers",
    clientsHref: "#clients"
  },
  blogSection: {
    heading: "Caring is the new marketing",
    description: "The Nexcent blog is the best place to read about the latest membership insights, trends and more. See who's joining the community, read about how our community are increasing their membership income and lot's more."
  },
  articles: [
    {
      id: "streamlined-safeguarding-oneren",
      title: "Creating Streamlined Safeguarding Processes with OneRen",
      imageUrl: "/assets/img/article-1.jpg",
      imageAlt: "A member using a laptop at home",
      href: "#article-streamlined-safeguarding"
    },
    {
      id: "safeguarding-responsibilities",
      title: "What are your safeguarding responsibilities and how can you manage them?",
      imageUrl: "/assets/img/article-2.jpg",
      imageAlt: "A laptop on a desk",
      href: "#article-safeguarding-responsibilities"
    },
    {
      id: "triathlon-australia-membership",
      title: "Revamping the Membership Model with Triathlon Australia",
      imageUrl: "/assets/img/article-3.jpg",
      imageAlt: "A workspace with a laptop",
      href: "#article-triathlon-australia"
    }
  ],
  finalCta: {
    heading: "Pellentesque suscipit fringilla libero eu.",
    buttonLabel: "Get a Demo",
    buttonHref: "#contact"
  },
  socialLinks: [
    { name: "Instagram", href: "https://www.instagram.com/", iconUrl: "/assets/social/instagram.svg" },
    { name: "Dribbble", href: "https://dribbble.com/", iconUrl: "/assets/social/dribbble.svg" },
    { name: "Twitter", href: "https://x.com/", iconUrl: "/assets/social/twitter.svg" },
    { name: "YouTube", href: "https://www.youtube.com/", iconUrl: "/assets/social/youtube.svg" }
  ],
  footer: {
    copyrightLines: ["Copyright © 2020 Nexcent ltd.", "All rights reserved"],
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About us", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Contact us", href: "#contact" },
          { label: "Pricing", href: "#pricing" },
          { label: "Testimonials", href: "#testimonials" }
        ]
      },
      {
        heading: "Support",
        links: [
          { label: "Help center", href: "#help" },
          { label: "Terms of service", href: "#terms" },
          { label: "Legal", href: "#legal" },
          { label: "Privacy policy", href: "#privacy" },
          { label: "Status", href: "#status" }
        ]
      }
    ],
    newsletter: {
      heading: "Stay up to date",
      placeholder: "Your email address",
      buttonLabel: "Subscribe"
    }
  }
};
