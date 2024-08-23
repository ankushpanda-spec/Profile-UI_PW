import { Batches } from "@/assets/icons"
import { QuickLearning } from "@/assets/icons"
import { ContactUs } from "@/assets/icons"
import { PrivacyPolicy } from "@/assets/icons"
import { Feeds } from "@/assets/icons"
import { Library } from "@/assets/icons"
import { Wallet } from "@/assets/icons"
import { Upskilling } from "@/assets/icons"
import { Vidyapeeth } from "@/assets/icons"
import { ReferEarn } from "@/assets/icons"
import { TermsConditions } from "@/assets/icons"
import { Result } from "@/assets/icons"
import { Saarthi } from "@/assets/icons"
import { Store } from "@/assets/icons"
import { Study } from "@/assets/icons"
import { Scholarship } from "@/assets/icons"
import { TestSeries } from "@/assets/icons"






export const sideNavbarOptions = [

    {
    customHeader: "Learn Online",
    menuOptions: [
      {
        title: "Study",
        icon: <Study/>,
        url: "/study",
        isActive: false,
        isNew: true,
        badgeNo: 1,
      },
      {
        title: "Quick Learning",
        icon: <QuickLearning/>,
        url: "/study",
        isActive: false,
        isNew: true,
         badgeNo: null,
        },
      {
        title: "Saarthi",
        icon: <Saarthi/>,
        url: "/study",
        isActive: false,
        isNew: true,
         badgeNo: null,
        },
      {
        title: "Library",
        icon: <Library/>,
        url: "/study",
        isActive: false,
        isNew: true,
         badgeNo: null,
      },
    ],
  },
  {
    customHeader: "Study Packs",
    menuOptions: [
      {
       title: "Batches",
        icon: <Batches/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
      },
      {
        title: "Test Series",
        icon: <TestSeries/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
        },
      {
        title: "Scholarship",
        icon: <Scholarship/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
      },
    ],
    },
  {
    customHeader: "Offline",
    menuOptions: [
      {
       title: "Vidyapeeth",
        icon: <Vidyapeeth/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
      },
    ],
    },
  {
    customHeader: "Explore PW",
    menuOptions: [
      {
       title: "Upskilling",
        icon: <Upskilling/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
        },
        {
       title: "Store",
        icon: <Store/>,
        url: "/study",
        isActive: false,
          isNew: false,
         badgeNo: null,
        },
         {
       title: "Results",
        icon: <Result/>,
        url: "/study",
        isActive: false,
           isNew: false,
         badgeNo: null,
        },
          {
       title: "Feeds",
        icon: <Feeds/>,
        url: "/study",
        isActive: false,
            isNew: false,
         badgeNo: null,
      },
    ],
    },
   {
    customHeader: "More",
    menuOptions: [
      {
       title: "Refer & Earn",
        icon: <ReferEarn/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
        },
        {
       title: "Wallet",
        icon: <Wallet/>,
        url: "/study",
        isActive: false,
          isNew: false,
         badgeNo: null,
        },
         {
       title: "Contact Us",
        icon: <ContactUs/>,
        url: "/study",
        isActive: false,
           isNew: false,
         badgeNo: null,
        },
          {
       title: "Terms & Conditions",
        icon: <TermsConditions/>,
        url: "/study",
        isActive: false,
            isNew: false,
         badgeNo: null,
        },
          {
       title: "Privacy Policy",
        icon: <PrivacyPolicy/>,
        url: "/study",
        isActive: false,
        isNew: false,
         badgeNo: null,
      },
    ],
  },

]