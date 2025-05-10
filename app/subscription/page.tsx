"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubscriptionPage() {
  return (
    <div className='flex min-h-screen bg-gray-50 w-full'>
      <div className=' w-full'>
        {/* <DashboardHeader username="Arjun" /> */}
        <main className='relative w-full p-4 md:p-6'>
          <div className='absolute right-4 mb-6 flex items-center justify-between'>
            <Link href='/subscription/add'>
              <Button className='text-[#FAFAFA] bg-[#20474E] hover:bg-teal-700'>
                <Plus className='mr-2 h-4 w-4' /> Add New Subscription
              </Button>
            </Link>
          </div>

          <div className='max-w-6xl mx-auto flex items-center justify-center'>
            <div className='mt-12 flex flex-col lg:flex-row gap-6'>
              <SubscriptionCard
                id='premium'
                title='Premium'
                price='$125'
                period='yearly'
                features={[
                  "Cancel anytime without a long-term commitment.",
                  "Spread costs across smaller, manageable payments.",
                  "Ideal for testing or temporary projects.",
                  "Easily switch plans as needs change.",
                  "Avoid a big initial payment.",
                ]}
              />

              <SubscriptionCard
                id='basic'
                title='Basic'
                price='$99'
                period='monthly'
                features={[
                  "Pay less per month compared to monthly plans.",
                  "One-time annual payment.",
                  "Exclusive features or often included.",
                  "Ideal for long-term goals and stability.",
                  "Many plans offer enhanced support for annual subscribers. Many plans offer enhanced support for annual subscribers",
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface SubscriptionCardProps {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
}

function SubscriptionCard({
  id,
  title,
  price,
  period,
  features,
}: SubscriptionCardProps) {
  return (
    <Card className='max-w-[450px] overflow-hidden flex flex-col border border-gray-200'>
      <CardHeader className='bg-gray-50 pb-4 pt-6 text-center'>
        <CardTitle className='text-[32px] text-primary'>{title}</CardTitle>
        <div className='mt-2'>
          <span className='text-2xl font-medium text-primary'>{price}</span>
          <span className='text-sm text-primary'>/{period}</span>
        </div>
      </CardHeader>
      <CardContent className='p-6 flex-1'>
        <ul className='space-y-4'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-start'>
              <div className='mr-3 mt-1 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-teal-800 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-3 w-3'
                >
                  <polyline points='20 6 9 17 4 12' />
                </svg>
              </div>
              <span className='text-lg text-primary'>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='p-6 pt-0'>
        <Link href={`/subscription/edit/${id}`} className='w-full'>
          <Button className='w-full text-lg text-[#FAFAFA] bg-[#20474E] hover:bg-teal-700'>
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
