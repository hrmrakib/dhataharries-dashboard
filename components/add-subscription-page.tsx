"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CircleMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddSubscriptionPage() {
  const [packageName, setPackageName] = useState("Basic");
  const [packageAmount, setPackageAmount] = useState("Basic");
  const [packageExpiration, setPackageExpiration] = useState("1 month");

  const [features, setFeatures] = useState([
    { name: "Add Media To Your Profile", value: "Add Media To Your Profile" },
    { name: "Send Private Messages", value: "Send Private Messages" },
    { name: "View Members Profile", value: "View Members Profile" },
    { name: "View Members Directory", value: "View Members Directory" },
  ]);

  const addFeatureField = () => {
    setFeatures([...features, { name: "", value: "" }]);
  };

  const removeFeatureField = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const updateFeatureValue = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].value = value;
    setFeatures(updatedFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
   
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6'>
              <Link
                href='/subscription'
                className='inline-flex items-center text-primary hover:text-[#760c2ace]'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>Add Subscription</span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='package-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Package Name
                </label>
                <Input
                  id='package-name'
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className='w-full'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='package-amount'
                  className='block text-sm font-medium text-gray-700'
                >
                  Package Amount
                </label>
                <Input
                  id='package-amount'
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(e.target.value)}
                  className='w-full'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='package-expiration'
                  className='block text-sm font-medium text-gray-700'
                >
                  Package Expiration
                </label>
                <Input
                  id='package-expiration'
                  value={packageExpiration}
                  onChange={(e) => setPackageExpiration(e.target.value)}
                  className='w-full'
                />
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Package Features
                </label>
                <div className='space-y-3'>
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between border border-gray-200 rounded-md'
                    >
                      <Input
                        value={feature.value}
                        onChange={(e) =>
                          updateFeatureValue(index, e.target.value)
                        }
                        className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Enter feature'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          index === features.length - 1
                            ? addFeatureField()
                            : removeFeatureField(index)
                        }
                        className='flex-shrink-0 p-3 focus:outline-none'
                      >
                        {index === features.length - 1 ? (
                          <div className='text-green-600'>
                            <Plus className='h-6 w-6 rounded-full border-2 border-current' />
                          </div>
                        ) : (
                          <div className='text-amber-400'>
                            <CircleMinus className='h-6 w-6' />
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type='submit'
                className='w-full bg-[#760C2A] hover:bg-[#760c2ad5] text-lg text-white py-2.5 rounded-md'
              >
                Add Subscription
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
