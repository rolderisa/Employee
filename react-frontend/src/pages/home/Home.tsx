import Sidebar from '@/components/Sidebar'
import { CommonContext } from '@/context'
import { getEmployees } from '@/services/employee'
import { format } from 'date-fns'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { BiPlus } from 'react-icons/bi'

const Home: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)

    const { user, setShowCreateEmployee, employees, setEmployees, setMeta, meta } = useContext(CommonContext)

    const columns: DataTableColumn[] = [
        {
            accessor: 'id',
            title: '#',
            render(_, index) {
                return (index + 1);
            },
        },
        {
            accessor: 'firstName',
            title: 'First Name',
            sortable: true
        },
        {
            accessor: 'lastName',
            title: 'Last Name',
            sortable: true
        },
        {
            accessor: 'nationalId',
            title: 'National Id'
        },
        {
            accessor: 'telephone',
            title: 'Phone Number'
        },
        {
            accessor: 'email',
            title: 'Email',
        },
        {
            accessor: 'department',
            title: 'Department',
        },
        {
            accessor: 'position',
            title: 'Position',
        },
        {
            accessor: 'laptopManufacturer',
            title: 'Laptop Manufacturer',
        },
        {
            accessor: 'model',
            title: 'Laptop Model',
        },
        {
            accessor: 'createdAt',
            title: 'Created At',
            sortable: true,
            render: ({ createdAt }) => (
                <span>
                    {format(new Date(createdAt as string), 'MMM dd, yyyy')}
                </span>
            )
        }
    ]

    useEffect(() => {
        getEmployees({ page, limit, setLoading, setMeta, setEmployees })
    }, [page, limit])

    return (
        <div className='w-full flex min-h-screen'>
            <Sidebar />
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='w-10/12 flex flex-col px-14 pt-8'>
                <span className='text-lg font-semibold'>Welcome {user.names}</span>
                <div className='my-14'>
                    <div className='w-full justify-between flex'>
                        <span className='my-8 text-xl'>Employees in RTB EMS</span>
                        <button onClick={() => setShowCreateEmployee(true)} className='bg-primary-blue flex items-center px-6 h-14 rounded-lg text-white'>
                            <BiPlus color='white' className='mr-3' size={25} />
                            <span>Add Employee</span>
                        </button>
                    </div>
                    <DataTable
                        records={employees as unknown as Record<string, unknown>[]}
                        columns={columns}
                        page={page}
                        recordsPerPage={limit}
                        loadingText={loading ? 'Loading...' : "Rendering..."}
                        onPageChange={(page) => setPage(page)}
                        onRecordsPerPageChange={(limit: number) => setLimit(limit)}
                        recordsPerPageOptions={limit === 10 ? [5, 10, 20, 50] : [limit]}
                        withTableBorder
                        borderRadius="sm"
                        withColumnBorders
                        striped
                        totalRecords={meta?.total}
                        highlightOnHover
                        onRowClick={({ record: { title } }) =>
                            toast.success(`${title} clicked!`)
                        }
                        noRecordsText="No records found"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home