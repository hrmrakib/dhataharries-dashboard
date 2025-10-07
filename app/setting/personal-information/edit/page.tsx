"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loading from "@/components/loading/Loading";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/feature/settingAPI";
import { useRouter } from "next/navigation";

export default function PersonalInformationEditPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
  });

  const [profileImage, setProfileImage] = useState<File | string>("/admin.jpg");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data, isLoading } = useGetProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // ✅ Load profile info from API
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data?.data?.full_name || "",
        email: data?.data?.email || "",
        phone: data?.data?.mobile_no || "",
        countryCode: data?.data?.countryCode || "",
      });
      setProfileImage(data?.data?.profile_pic || "/admin.jpg");
    }
  }, [data?.data]);

  // ✅ Handle text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Open file picker
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("full_name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("mobile_no", formData.phone);

    if (profileImage instanceof File) {
      formDataToSubmit.append("profile_pic", profileImage);
    }

    try {
      await updateProfile(formDataToSubmit).unwrap();
      router.push("/setting/personal-information");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (isLoading) return <Loading />;

  const apiUrl = "https://api.enitiative.org";

  const displayImage =
    imagePreview ||
    (typeof profileImage === "string"
      ? profileImage.startsWith("http")
        ? profileImage
        : `${apiUrl}${profileImage}`
      : "/admin.jpg");

  return (
    <div className='flex min-h-screen bg-[#FFFFFF]'>
      <div className='flex-1 w-full'>
        <main className='bg-[#FAFAFA] w-full p-4 md:p-6'>
          <div className='mx-auto max-w-5xl'>
            {/* Header */}
            <div className='mb-6 flex items-center'>
              <Link
                href='/setting/personal-information'
                className='inline-flex items-center text-primary hover:text-[#00796B]'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl font-semibold'>
                  Personal Information Edit
                </span>
              </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='flex flex-col md:flex-row gap-10'>
                {/* Profile Image Section */}
                <div className='w-full md:w-64 flex flex-col items-center border border-gray-300 rounded-md p-6 shadow-sm bg-white'>
                  <div
                    className='relative mb-4 cursor-pointer group'
                    onClick={handleImageClick}
                  >
                    <div className='w-32 h-32 rounded-full overflow-hidden relative'>
                      <Image
                        src={displayImage}
                        alt='Profile'
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='absolute bottom-1 right-1 bg-white p-1.5 rounded-full border border-gray-300 shadow-sm group-hover:bg-gray-100 transition'>
                      <Camera className='h-5 w-5 text-gray-600' />
                    </div>
                    <input
                      type='file'
                      ref={fileInputRef}
                      className='hidden'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  </div>
                  <span className='text-sm text-gray-500'>Profile</span>
                  <span className='font-medium text-gray-800 text-center mt-1'>
                    {formData?.name || "Admin"}
                  </span>
                </div>

                {/* Form Fields */}
                <div className='flex-1 space-y-5'>
                  <div>
                    <Label
                      htmlFor='name'
                      className='text-lg font-medium text-gray-700'
                    >
                      Name
                    </Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full text-lg border-gray-300'
                      placeholder='Enter your name'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='email'
                      className='text-lg font-medium text-gray-700'
                    >
                      Email
                    </Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full text-lg border-gray-300'
                      placeholder='Enter your email'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='phone'
                      className='text-lg font-medium text-gray-700'
                    >
                      Phone Number
                    </Label>
                    <PhoneInput
                      country={"us"}
                      value={formData.phone}
                      onChange={(phone) => setFormData({ ...formData, phone })}
                      inputClass='!w-full !h-11 !text-base !border !border-gray-300 !rounded-md !pl-12 !pr-3 !text-gray-700'
                      buttonClass='!border-gray-300'
                      placeholder='Enter phone number'
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className='flex justify-end'>
                <Button
                  type='submit'
                  className='bg-[#760C2A] hover:bg-[#5E0921] text-white px-6 py-2 rounded-md'
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowLeft, Camera } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import Loading from "@/components/loading/Loading";
// import {
//   useGetProfileQuery,
//   useUpdateProfileMutation,
// } from "@/redux/feature/settingAPI";
// import { useRouter } from "next/navigation";

// export default function PersonalInformationEditPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     countryCode: "",
//   });

//   const [profileImage, setProfileImage] = useState<File | string>("/admin.jpg");
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const { data, isLoading } = useGetProfileQuery({});
//   const [updateProfile] = useUpdateProfileMutation();

//   console.log(data?.data);

//   useEffect(() => {
//     if (data?.data) {
//       setFormData({
//         name: data?.data?.full_name || "",
//         email: data?.data?.email || "",
//         phone: data?.data?.mobile_no || "",
//         countryCode: data?.data?.countryCode || "",
//       });
//       setProfileImage(data?.data?.profile_pic || "/admin.jpg");
//     }
//   }, [data?.data]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("full_name", formData?.name);
//     formDataToSubmit.append("email", formData?.email);
//     formDataToSubmit.append("mobile_no", formData?.phone);

//     if (profileImage instanceof File) {
//       formDataToSubmit.append("profile_pic", profileImage);
//     }

//     const res = await updateProfile(formDataToSubmit);

//     router.push("/setting/personal-information");
//   };

//   if (isLoading) return <Loading />;

//   const displayImage =
//     imagePreview ||
//     (typeof profileImage === "string"
//       ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`
//       : "/admin.jpg");

//   return (
//     <div className='flex min-h-screen bg-[#FFFFFF]'>
//       <div className='flex-1 w-full'>
//         <main className='bg-[#FAFAFA] w-full p-4 md:p-6'>
//           <div className='mx-auto'>
//             <div className='mb-6'>
//               <Link
//                 href='/setting/personal-information'
//                 className='inline-flex items-center text-primary hover:text-teal-700'
//               >
//                 <ArrowLeft className='mr-2 h-6 w-6' />
//                 <span className='text-2xl font-semibold'>
//                   Personal Information Edit
//                 </span>
//               </Link>
//             </div>

//             <form onSubmit={handleSubmit} className='space-y-6'>
//               <div className='flex flex-col md:flex-row gap-8'>
//                 {/* Profile Image Section */}
//                 <div className='w-full md:w-64 flex flex-col items-center border border-gray-600 rounded-md p-6'>
//                   <div
//                     className='relative mb-4 cursor-pointer'
//                     onClick={handleImageClick}
//                   >
//                     <div className='w-32 h-32 rounded-full overflow-hidden relative'>
//                       <Image
//                         src={displayImage}
//                         alt='Profile'
//                         fill
//                         className='object-cover'
//                       />
//                     </div>
//                     <div className='absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200'>
//                       <Camera className='h-5 w-5 text-gray-600' />
//                     </div>
//                     <input
//                       type='file'
//                       ref={fileInputRef}
//                       className='hidden'
//                       accept='image/*'
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                   <span className='text-sm text-gray-600'>Profile</span>
//                   <span className='font-medium text-gray-800'>
//                     {formData?.name || "Admin"}
//                   </span>
//                 </div>

//                 {/* Form Fields Section */}
//                 <div className='flex-1 space-y-4'>
//                   <div className='space-y-2'>
//                     <Label
//                       htmlFor='name'
//                       className='text-lg font-medium text-primary'
//                     >
//                       Name
//                     </Label>
//                     <Input
//                       id='name'
//                       name='name'
//                       value={formData?.name}
//                       onChange={handleChange}
//                       className='w-full text-lg text-primary'
//                     />
//                   </div>

//                   <div className='space-y-2'>
//                     <Label
//                       htmlFor='email'
//                       className='text-lg font-medium text-primary'
//                     >
//                       Email
//                     </Label>
//                     <Input
//                       id='email'
//                       name='email'
//                       type='email'
//                       value={formData?.email}
//                       onChange={handleChange}
//                       className='w-full text-lg text-primary'
//                     />
//                   </div>

//                   <div className='space-y-2'>
//                     <Label
//                       htmlFor='phone'
//                       className='text-lg font-medium text-primary'
//                     >
//                       Phone Number
//                     </Label>
//                     <PhoneInput
//                       country={"us"}
//                       value={formData?.phone}
//                       onChange={(phone) => setFormData({ ...formData, phone })}
//                       containerClass='w-full'
//                       inputClass='w-full h-[100px] p-2 border border-[#760C2A] rounded-md text-5xl font-semibold text-[#760C2A]'
//                       buttonClass='border-[#760C2A]'
//                       inputStyle={{
//                         width: "100%",
//                         height: "40px",
//                         border: "1px solid #760C2A",
//                       }}
//                       placeholder='Enter phone number'
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className='flex justify-end'>
//                 <Button type='submit' className='bg-primary hover:bg-teal-700'>
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
