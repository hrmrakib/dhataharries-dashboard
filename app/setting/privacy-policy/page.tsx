"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-primary hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>Privacy Policy</span>
              </Link>
              <Link
                href='/setting/privacy-policy/edit'
                className='inline-flex items-center text-primary hover:text-teal-700 border border-[#20474E] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold'>Edit</span>
              </Link>
            </div>

            <div className='prose prose-sm max-w-none'>
              <h2 className='text-xl font-semibold mb-4'>Privacy Policy</h2>

              <p className='mb-4'>
                At DesignDoc, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, and protect your personal
                information.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                1. Information We Collect
              </h3>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, subscribe to a plan, or contact customer
                support. This may include your name, email address, payment
                information, and any other information you choose to provide.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                2. How We Use Your Information
              </h3>
              <p>We use the information we collect to:</p>
              <ul className='list-disc pl-5 mb-4'>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send technical notices, updates, and administrative messages
                </li>
                <li>Respond to your comments, questions, and requests</li>
                <li>
                  Communicate with you about products, services, and events
                </li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                3. Sharing of Information
              </h3>
              <p>We may share your information with:</p>
              <ul className='list-disc pl-5 mb-4'>
                <li>Service providers who perform services on our behalf</li>
                <li>
                  Third parties if we believe disclosure is necessary to comply
                  with applicable laws or legal processes
                </li>
                <li>
                  Other users, if you choose to make certain information public
                </li>
              </ul>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                4. Data Security
              </h3>
              <p>
                We take reasonable measures to help protect your personal
                information from loss, theft, misuse, and unauthorized access,
                disclosure, alteration, and destruction.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>5. Your Choices</h3>
              <p>
                You can access, update, or delete your account information at
                any time by logging into your account settings. You may also opt
                out of receiving promotional communications from us by following
                the instructions in those communications.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>6. Cookies</h3>
              <p>
                We use cookies and similar technologies to collect information
                about your browsing activities and to distinguish you from other
                users of our website.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                7. Changes to This Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>

              <p className='mt-6 text-sm text-gray-500'>
                Last updated: May 8, 2023
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
