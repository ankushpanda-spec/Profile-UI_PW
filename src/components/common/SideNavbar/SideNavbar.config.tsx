import { Batches, QuickLearning, ContactUs, PrivacyPolicy, Feeds, Library, Wallet, Upskilling, Vidyapeeth, ReferEarn, TermsConditions, Result, Saarthi, Store, Study, Scholarship, TestSeries } from "@/assets/icons"

export const sideNavbarOptions = [

    {
    customHeader: "Learn Online",
    menuOptions: [
      {
        title: "Study",
        icon: <Study/>,
        url: "/study",
        isActive: true,
        isNew: true,
        badge: "1",
        isEnabled: true,
        configName: 'isStudyPageEnabled', 
      },
      {
        title: "Quick Learning",
        icon: <QuickLearning/>,
        url: '/batches/study/micro-learning',
        isActive: false,
        external: false,
        isNew: false,
        isEnabled: true,
        configName: 'isMicroLearningEnabled',
        badge: "",
      
        },
      {
        title: "Saarthi",
        icon: <Saarthi/>,
        url: '/saarthi',
        isActive: false,
        isEnabled: true,
        configName: 'isSarthiEnabled',
        badge:'',
        isSubmenuOpen : false,
        subMenuOption: [
          {
          title: "Today's Classes",
          url: "/todayclasses",
          isActive: false,
          isNew: false,
          badge: "",
          isEnabled :true,
          },
          {
          title: "Khazana",
          url: "/khazana",
          isActive: false,
          isNew: false, 
          isEnabled :true,
         
         
          },
          {
          title: "Library",
          url: "/library2",
          isActive: false,
          isNew: false, 
          isEnabled :true,
          },
          {
          title: "Announcements",
          url: "/announcements",
          isActive: false,
          isNew: false, 
          isEnabled :true,
          },
        ]
        },
      {
        title: "Library",
        icon: <Library/>,
        url: '/library',
        isActive: false,
        isEnabled: false,
        configName: 'isLibraryEnabled',
        isNew: true,
        badge:'',
        
      },
    ],
  },
  {
    customHeader: "Study Packs",
    menuOptions: [
      {
      title: "Batches",
      icon: <Batches/>,
      url: '/batches',
      isActive: true,
      isEnabled: true,
      configName: 'isBatchPageEnabled',
        
      },
      {
        title: "Test Series",
        icon: <TestSeries/>,
        url: '/test-series',
        isActive: false,
        isEnabled: true,
        configName: 'isTestSeriesEnabled',
        badge: "1",
        
        },
      {
        title: "Scholarship",
        icon: <Scholarship/>,
        url: '/pw-scholarship',
        isActive: false,
        external: false,
        isNew: false,
        isEnabled: true,
        configName: 'isScholarshipEnabled',  
      },
    ],
    },
  {
    customHeader: "Offline",
    menuOptions: [
      {
      title: "Vidyapeeth",
      icon: <Vidyapeeth/>,
      url: "/vidyapeeth",
      isActive: false,
      isNew: false,
       isEnabled: true,
      },
    ],
    },
  {
    customHeader: "Explore PW",
    menuOptions: [
      {
      title: "Upskilling",
      icon: <Upskilling/>,
      url: "/upskilling",
      isActive: false,
      external: true,
      isNew: false,
      isEnabled: true,
      configName: '',
        
        },
        {
      title: "Store",
      icon: <Store/>,
      url: 'https://store.pw.live/authenticate',
      isActive: false,
      isEnabled: true,
      configName: '',
      external: true,
      isNew: false,
      },
      {
      title: "Results",
      icon: <Result/>,
      url: '/results',
      isActive: false,
      isEnabled: true,
      configName: 'isOurResultsEnabled',
      },
      {
      title: "Feeds",
      icon: <Feeds/>,
      url: '/feeds',
      isActive: false,
      isEnabled: true,
      configName: 'isFeedsEnabled',    
      },
    ],
    },
  {
    customHeader: "More",
    menuOptions: [
      {
      title: "Refer & Earn",
      icon: <ReferEarn/>,
      url: '/referral-new',
      isActive: false,
      isEnabled: true,
      configName: 'isReferAndEarnEnabled',

        },
        {
      title: "Wallet",
      icon: <Wallet/>,
      url: '/wallet',
      isActive: false,
      isEnabled: true,
      configName: 'isWalletEnabled',
        
      },
      {
      title: "Contact Us",
      icon: <ContactUs/>,
      url: '/contact-us',
      isActive: false,
      isEnabled: true,
      configName: 'isContactUsEnabled',  
      },
      {
      title: "Terms & Conditions",
      icon: <TermsConditions/>,
      url: '/termsandconditions',
      isActive: false,
      isEnabled: false,
      configName: 'isTandCEnabled',
        
        },
      {
      title: "Privacy Policy",
      icon: <PrivacyPolicy/>,
      url: "/privacypolicy",
      isActive: false,
      isNew: false,
      isEnabled: true,
        
      },
    ],
  },

]