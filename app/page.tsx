"use client";

import { Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { use, useRef, useState } from "react";
import UserDetailsModal from "@/components/user-details-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetHomeDataByIdQuery,
  useGetHomeDataQuery,
} from "@/redux/feature/homeAPI";
import Loading from "@/components/loading/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toPng } from "html-to-image";

interface IUser {
  id: string;
  full_name: string;
  email: string;
  profile_pic: string;
}

export default function DashboardContent() {
  const { data, isLoading } = useGetHomeDataQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className='w-full p-4 md:p-6'>
      <section className='mb-8'>
        <h2 className='mb-4 text-[32px] font-medium text-primary'>Overview</h2>
        <div className='md:container mx-auto'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <StatCard title='Total Earnings' value={data?.total_donations} />
            <StatCard title='Total User' value={data?.all_user_list} />
            <StatCard title='Total Stories' value={data?.total_stories} />
          </div>
        </div>
      </section>

      <section>
        <TransactionTable user_list={data?.user_list} />
      </section>
    </main>
  );
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className='overflow-hidden w-full md:max-w-[380px] h-[161px] flex items-center justify-center border border-gray-200'>
      <CardContent className='flex flex-col items-center justify-center p-6'>
        <h3 className='mb-2 text-[#6E7A8A]'>{title}</h3>
        <p className='text-[32px] font-semibold text-primary'>{value}</p>
      </CardContent>
    </Card>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className='flex justify-between border-b border-gray-100 py-2'>
      <span className='text-gray-600'>{label}</span>
      <span className='font-medium text-gray-800'>{value}</span>
    </div>
  );
}

function TransactionTable({ user_list }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [userId, setUserId] = useState<string | null>(null);

  const transactions = [
    {
      id: 447,
      name: "Marvin McKinney",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 426,
      name: "Jane Cooper",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 922,
      name: "Esther Howard",
      subscription: "Basic",
      date: "24 May, 2020",
      amount: "$45",
    },
    {
      id: 816,
      name: "Darlene Robertson",
      subscription: "Premium",
      date: "24 May, 2020",
      amount: "$75",
    },
    {
      id: 185,
      name: "Cameron Williamson",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 738,
      name: "Ronald Richards",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 600,
      name: "Jerome Bell",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 583,
      name: "Dianne Russell",
      subscription: "Basic",
      date: "8 Sep, 2020",
      amount: "$45",
    },
    {
      id: 177,
      name: "Bessie Cooper",
      subscription: "Basic",
      date: "21 Sep, 2020",
      amount: "$45",
    },
    {
      id: 826,
      name: "Robert Fox",
      subscription: "Premium",
      date: "22 Oct, 2020",
      amount: "$75",
    },
    {
      id: 540,
      name: "Kathryn Murphy",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 274,
      name: "Leslie Alexander",
      subscription: "Premium",
      date: "17 Oct, 2020",
      amount: "$75",
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cardRef = useRef(null);

  const { data: user_details, isLoading } = useGetHomeDataByIdQuery(userId, {
    skip: !userId,
  });

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);

    setUserId(user?.id);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const downloadAsImage = () => {
    if (!cardRef.current) return;

    toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "user-details.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to generate image", err);
      });
  };

  console.log(user_details);

  return (
    <>
      <div className='overflow-hidden rounded-md'>
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-[28px] font-medium text-primary'>Earnings</h2>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-[#760C2A] hover:!bg-[#760C2A] text-white'>
              <TableRow>
                <TableHead className='text-white'>#Tr.ID</TableHead>
                <TableHead className='text-white'>User Name</TableHead>
                <TableHead className='text-white'>Email</TableHead>
                <TableHead className='text-white'>Join Date</TableHead>
                <TableHead className='text-center text-white'>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {user_list?.map((user: IUser) => (
                <TableRow key={user?.id}>
                  <TableCell className='font-medium text-lg text-primary'>
                    {user?.id}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    {user?.full_name}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    {user?.email}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.profile_pic}`}
                      />
                      <AvatarFallback>{user?.full_name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className='text-center text-lg text-primary'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => openUserModal(user)}
                    >
                      <Info className='h-6 w-6' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Button>
            <span className='text-sm'>Previous</span>
          </div>

          <div className='flex items-center gap-1'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size='sm'
                  className={`h-8 w-8 p-0 ${
                    page === currentPage ? "bg-teal-800 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm'>Next</span>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className='sr-only'>Next</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div>
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div
              ref={cardRef}
              className='relative w-full max-w-md rounded-md bg-white p-6 shadow-lg'
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
              >
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </button>

              <h2 className='mb-6 text-center text-xl font-semibold text-gray-800'>
                User Details
              </h2>
              <div className='min-h-10'>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className='space-y-4'>
                    <DetailRow label='User ID:' value={user_details?.id} />
                    <DetailRow
                      label='Date'
                      value={user_details?.date_joined?.split("T")[0]}
                    />
                    <DetailRow
                      label='User Name'
                      value={user_details?.full_name}
                    />
                    <DetailRow
                      label='Occupation'
                      value={user_details?.occupation}
                    />

                    {user_details?.mobile_no && (
                      <DetailRow
                        label='Mobile'
                        value={user_details?.mobile_no}
                      />
                    )}

                    {user_details?.location && (
                      <DetailRow
                        label='Location'
                        value={user_details?.location}
                      />
                    )}
                    {user_details?.is_verified && (
                      <DetailRow
                        label='Varified'
                        value={user_details?.is_verified ? "Yes ✅" : "No ❌"}
                      />
                    )}
                  </div>
                )}
              </div>
              <Button
                onClick={downloadAsImage}
                className='mt-6 w-full bg-teal-800 hover:bg-teal-700'
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
