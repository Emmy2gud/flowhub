import React, { useState } from 'react';
import  supabase  from "../../lib/supabase-client";
import { useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "../../components/ui/carousel"
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Award,
  Calendar,
  CircleDollarSign,
  Copy,
  Gift,
  Share2,
  Star,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { Input } from '../../components/ui/input';
import FacebookIcon from '@/assets/icons/facebook.svg';
import XIcon from '@/assets/icons/x.svg';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg';
import LinkedlnIcon from '@/assets/icons/linkedln.svg';
import RewardCard from '../../components/RewardCard';

const socials = [{ value: 'Earn Points' }, { value: 'Reedem Rewards' }];
const rewardtabs = [
  { value: 'All Rewards' },
  { value: 'Unlocked' },
  { value: 'locked' },
  { value: 'Coming Soon' },
];
interface Link {
  name: string;
  icon: string;
  url: string;
}
interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  status: string;
  icon: string;
}
const rewards: Reward[] = [
  {
    id: 1,
    title: '$5 Bank Transfer',
    description: 'The $5 equivalent will be transferred to your bank account.',
    points: 5000,
    status: 'locked',
    icon: 'bank',
  },
  {
    id: 2,
    title: '$5 PayPal International',
    description:
      'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
    points: 5000,
    status: 'locked',
    icon: 'paypal',
  },
  {
    id: 3,
    title: '$5 Virtual Visa Card',
    description:
      'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
    points: 5000,
    status: 'locked',
    icon: 'visa',
  },
  {
    id: 4,
    title: '$5 Apple Gift Card',
    description:
      'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more.',
    points: 5000,
    status: 'locked',
    icon: 'gift',
  },
  {
    id: 5,
    title: '$5 Google Play Card',
    description:
      'Use this $5 Google Play Gift Card to purchase apps, games, and more.',
    points: 5000,
    status: 'locked',
    icon: 'gift',
  },
  {
    id: 6,
    title: '$5 Amazon Gift Card',
    description:
      'Get a $5 digital gift card to spend on your favorite platforms.',
    points: 5000,
    status: 'locked',
    icon: 'gift',
  },
  {
    id: 7,
    title: '$10 Amazon Gift Card',
    description:
      'Get a $10 digital gift card to spend on your favorite platforms.',
    points: 10000,
    status: 'locked',
    icon: 'gift',
  },
  {
    id: 8,
    title: 'Free Udemy Course',
    description: 'Coming Soon!',
    points: 0,
    status: 'coming-soon',
    icon: 'stack',
  },
];

const socialLinks: Link[] = [
  {
    name: 'Facebook',
    icon: FacebookIcon,
    url: 'https://www.facebook.com/',
  },
  {
    name: 'X',
    icon: XIcon,
    url: 'https://x.com/',
  },
  {
    name: 'WhatsApp',
    icon: WhatsAppIcon,
    url: 'https://wa.me/',
  },
  {
    name: 'LinkedIn',
    icon: LinkedlnIcon,
    url: 'https://www.linkedin.com/',
  },
];

function DashBoard() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://app.flowahub.com/signup?ref=emma3679';
const [profile, setProfile] = useState<any>(null)
const [loading, setLoading] = useState(true)
const [claimedToday, setClaimedToday] = useState(false)

useEffect(() => {
  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // Try to fetch profile
    let { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // If profile does not exist → create it
    if (!profile) {
      console.log('No profile found, creating one...')
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          points: 25,
          daily_streak: 1,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Profile creation failed:', insertError)
        return
      }

      profile = newProfile
    }

    setProfile(profile)

    const today = new Date().toISOString().slice(0, 10)
    setClaimedToday(profile.last_daily_claim === today)

    setLoading(false)
  }

  fetchProfile()
}, [])

const handleDailyClaim = async () => {
  if (!profile || claimedToday) return

  const today = new Date().toISOString().slice(0, 10)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from('profiles')
    .update({
      points: profile.points + 5,
      daily_streak: profile.daily_streak + 1,
      last_daily_claim: today,
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  setProfile(data)
  setClaimedToday(true)
}


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      {' '}
      <Tabs defaultValue="Earn Points" className="w-full">
        <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-2">
          {socials.map((social) => (
            <TabsTrigger
              key={social.value}
              value={social.value}
              className="
    w-[150px] h-[50px]
    md:w-[50px] md:h-[50px]
    lg:w-[150px] lg:h-[52px]
    bg-transparent
    font-normal
    text-sm
    rounded-none
border-0
    data-[state=active]:rounded-t-lg
    data-[state=active]:bg-violet-100
     data-[state=active]:text-violet-500
    data-[state=active]:border-b-2
    data-[state=active]:border-violet-500
  "
            >
              {social.value}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={'Earn Points'}>
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2 pt-4">
            <div className="w-1 h-6 bg-violet-500 rounded-sm" />
            Your Rewards Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <Card className="w-full max-w-sm p-0 h-70">
              <CardHeader className="bg-violet-50 py-3 rounded-t-lg">
                <CardTitle className="flex gap-2 text-sm font-medium items-center">
                  <Award className="w-4 h-4 text-violet-600" />
                  Points Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl text-violet-600 font-bold">  {profile?.points ?? 0}</span>
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                    <CircleDollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Progress to $5 Gift Card</p>
                    <span className="font-medium">10/5000</span>
                  </div>
                  <Progress value= {profile?.points ?? 0}className="h-2 " />
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    🚀 Just getting started — keep earning points!
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-sm p-0 h-70">
              <CardHeader className="bg-blue-50 py-3 rounded-t-lg">
                <CardTitle className="flex gap-2 text-sm font-medium items-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Daily Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-violet-600">
                    2 days
                  </span>
                </div>
               <div className="flex gap-2 mb-4">
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isToday = index === today;
    const isPast = index < today;
    
    return (
      <div
        key={day + index}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium ${
          isToday
            ? 'bg-violet-600 text-white'
            : isPast
              ? 'bg-gray-200 text-gray-600'
              : 'bg-gray-100 text-gray-400'
        }`}
      >
        {day.charAt(0)}
      </div>
    );
  })}
</div>
                <div className="text-xs text-blue-600 mb-3">
                  Check in daily to to earn +5 points
                </div>
            <Button
  variant="outline"
  className="w-full rounded-full bg-violet-600 text-white"
  disabled={claimedToday}
  onClick={handleDailyClaim}
>
  <Zap className="w-4 h-4 mr-2" />
  {claimedToday ? 'Claimed Today' : 'Claim +5 Points'}
</Button>

              </CardContent>
            </Card>
            <Card className="w-full max-w-sm p-0 h-70">
              <CardHeader className=" bg-linear-to-br from-violet-500 to-purple-600 rounded-t-lg text-white p-2 h-25">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-medium mb-1 bg-violet-400 px-2 py-0.5 rounded inline-block">
                      Featured
                    </div>
                    <CardTitle className="text-lg font-bold mt-2">
                      Top Tool Spotlight
                    </CardTitle>
                    <p className="text-sm font-medium mt-1">Reclaim</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-violet-400 rounded-full"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 w-full ">
                <div className="flex gap-2 mb-3">
                  <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Automate and Optimize Your Schedule
                    </p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Reclaim is an AI-powered calendar assistant that
                      automatically schedules your tasks, meetings, and breaks
                      to boost productivity. Free to try — earn Flowla Points
                      when you sign up!
                    </p>
                  </div>
                </div>
                <CardFooter className="flex justify-between  p-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    className=" bg-violet-600 text-white hover:bg-gray-100 rounded-full"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign up
                  </Button>
                  <Button
                    size="sm"
                    className=" bg-linear-to-br from-violet-600 to-pink-500 rounded-t-lg text-white rounded-full"
                  >
                    <Gift className="w-4 h-4 mr-1" />
                    Claim 50 pts
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
          <section>
            <h2 className="text-lg font-medium mb-6 mt-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-violet-500 rounded-sm" />
              Earn More Points
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="w-full max-w-sm p-0">
                <CardHeader className="bg-violet-50 py-3 px-3  rounded-t-lg">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Star className="w-5 h-5 text-violet-600" />
                    Refer and win 10,000 points!
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 ">
                  <p className="text-xs  mb-4">
                    Invite 3 friends by Nov 20 and earn a chance to be one of 5
                    winners of 10,000 points. Friends must complete onboarding
                    to qualify.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full max-w-sm p-0 h-35">
                <CardHeader className="bg-violet-50 py-3 px-3 rounded-t-lg">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-violet-600" />
                    <div className="text-xs">
                      <h1>Share Your Stack</h1>
                      <p className="text-gray-500 font-medium">Earn +25 pts</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 ">
                  <div className="flex justify-between">
                    <p className="text-sm  mb-4">Share your tool stack</p>
                    <Button className=" bg-violet-600 hover:bg-violet-700 rounded-full">
                      <Share2 className="w-5 h-5" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          <section className=" w-full">
            <h2 className="text-lg font-medium mb-6 mt-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-violet-500 rounded-sm" />
              Refer & Earn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
              <Card className="w-full py-4  bg-violet-50 col-span-2">
                <CardContent className="px-3 text-base flex items-center gap-4">
                  <Users className="w-5 h-5 text-violet-600" />
                  <div className="text-xs">
                    <h1>Share Your Stack</h1>
                    <p className="text-gray-500 font-medium">Earn +25 pts</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center text-violet-500">
                <span className="font-semibold text-lg">0</span>
                <p>Referrals</p>
              </div>
              <div className="text-center text-violet-500">
                <span className="font-semibold text-lg">0</span>
                <p>Points Earned</p>
              </div>
              <div className="col-span-2 space-y-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">
                    Your personal referral link:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="flex-1 bg-gray-50 border-gray-200"
                    />
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="px-4 border-violet-200 hover:bg-violet-50"
                    >
                      <Copy className="w-4 h-4 text-violet-600" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 mt-1">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <footer className="pt-4">
            <div className="flex gap-3 justify-center">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-10 w-10 hover:opacity-80 transition"
                  />
                </a>
              ))}
            </div>
          </footer>
        </TabsContent>
        <TabsContent value={'Reedem Rewards'}>
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2 pt-4">
            <div className="w-1 h-6 bg-violet-500 rounded-sm" />
            Redeem Your Points
          </h2>
          <Tabs defaultValue="All Rewards" className="w-full">
           <TabsList className="flex bg-transparent gap-2">
  <Carousel
    opts={{
      align: "start",
    }}
    className="w-full"
  >
    <CarouselContent>
      {rewardtabs.map((reward) => (
        <CarouselItem
          key={reward.value}
          className="
            basis-1/2
            md:basis-1/2
            lg:basis-1/4
            flex justify-center
          "
        >
          <TabsTrigger
            value={reward.value}
            className="
              text-gray-500
              w-[150px] h-[50px]
              md:w-[140px]
              lg:w-[150px]
              p-6
              bg-transparent
              font-normal
              rounded-none
              border-0
              flex items-center gap-2
              data-[state=active]:rounded-t-lg
              data-[state=active]:bg-violet-100
              data-[state=active]:text-violet-500
              data-[state=active]:border-b-2
              data-[state=active]:border-violet-500
            "
          >
            {reward.value}
            <div className="w-5 h-5 bg-violet-400 rounded-full text-xs flex items-center justify-center">
              8
            </div>
          </TabsTrigger>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</TabsList>

            {rewardtabs.map((reward, id) => (
              <TabsContent value={reward.value}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {rewards.map((reward) => (
                    <RewardCard key={id} reward={reward} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>{' '}
    </div>
  );
}

export default DashBoard;
