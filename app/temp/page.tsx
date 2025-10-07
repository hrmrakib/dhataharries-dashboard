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
import {
  useGetDonationDataByIdQuery,
  useGetDonationDataQuery,
} from "@/redux/feature/donationAPI";
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
  const { data: donation_list } = useGetDonationDataQuery({});

  console.log(donation_list?.data);

  if (!donation_list?.data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <main className='w-full p-4 md:p-6'>
      <section>
        <TransactionTable donation_list={donation_list?.data} />
      </section>
    </main>
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

function TransactionTable({ donation_list }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // show 10 items per page

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(donation_list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = donation_list.slice(startIndex, endIndex);
  // ------------------------

  const cardRef = useRef(null);
  const [id, setId] = useState(null);

  const { data: donation, isLoading } = useGetDonationDataByIdQuery(id);

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setId(user.donation_id);
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
              {currentDonations.map((user: IUser) => (
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

        {/* Pagination Controls */}
        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
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
            <span className='text-sm'>Prev</span>
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

      {/* Modal Section */}
      {isModalOpen && (
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
            </button>

            <h2 className='mb-6 text-center text-xl font-semibold text-gray-800'>
              Donation Details
            </h2>

            <div className='min-h-10'>
              {isLoading ? (
                <Loading />
              ) : (
                <div className='space-y-4'>
                  <DetailRow
                    label='Donation ID:'
                    value={selectedUser?.donation_id}
                  />
                  <DetailRow
                    label='Donator Name'
                    value={selectedUser?.full_name}
                  />
                  <DetailRow label='Email' value={selectedUser?.email} />
                  <DetailRow label='Location' value={selectedUser?.location} />
                  <DetailRow label='Amount' value={selectedUser?.amount} />
                  <DetailRow
                    label='Status'
                    value={selectedUser?.payment_status}
                  />
                  <DetailRow
                    label='Verified'
                    value={selectedUser?.is_verified ? "Yes ✅" : "No ❌"}
                  />
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
      )}
    </>
  );
}
