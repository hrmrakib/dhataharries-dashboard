"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef, useState } from "react";
import UserDetailsModal from "@/components/user-details-modal";
import Loading from "@/components/loading/Loading";
import { useGetDonationDataQuery } from "@/redux/feature/donationAPI";
import { Info, X } from "lucide-react";
import { toPng } from "html-to-image";

interface IUser {
  full_name: string;
  email: string;
  amount: string;
  location: string;
  payment_status: string;
  created_at: string;
}

export default function DashboardContent() {
  const { data } = useGetDonationDataQuery({});

  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <main className='w-full p-4 md:p-6'>
      <section>
        <TransactionTable donation_list={data} />
      </section>
    </main>
  );
}

function TransactionTable({ donation_list }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Configurable items per page

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
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const cardRef = useRef(null);
  const [id, setId] = useState(null);

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log(user);
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

  console.log("donation_list", donation_list);
  return (
    <>
      <div className='overflow-hidden rounded-md'>
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-[28px] font-medium text-primary underline'>
              All Donation List
            </h2>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-[#760C2A] hover:!bg-[#760C2A] text-white'>
              <TableRow>
                <TableHead className='text-white'>Username</TableHead>
                <TableHead className='text-white'>Email</TableHead>
                <TableHead className='text-white'>Amount</TableHead>
                <TableHead className='text-white'>Location</TableHead>
                <TableHead className='text-center text-white'>Detail</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {donation_list?.map((user: IUser) => (
                <TableRow key={user?.created_at} className='hover:bg-gray-100'>
                  <TableCell className='font-medium text-lg text-primary'>
                    {user?.full_name}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    {user?.email}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    {user?.amount}
                  </TableCell>
                  <TableCell className='text-lg text-primary'>
                    {user?.location}
                  </TableCell>
                  {/* <TableCell className='text-lg text-primary text-center'>
                    {user?.payment_status}
                  </TableCell> */}
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

              {/* <div className='min-h-10'>
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
              </div> */}
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
