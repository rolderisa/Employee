import { CommonContext } from '@/context'
import { createEmployee, getEmployees } from '@/services/employee'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiLoaderAlt } from 'react-icons/bi'
import * as yup from "yup"

const CreateEmployee = () => {

    const { setShowCreateEmployee, setEmployees, setMeta } = useContext(CommonContext)
    const [loading, setLoading] = useState<boolean>(false)
    type EmployeeData = {
        firstName: string,
        lastName: string,
        email: string,
        nationalId: string,
        telephone: string,
        department: string,
        position: string,
        laptopManufacturer: string,
        model: string,
        serialNumber: string
    }
    const EmployeeSchema = yup.object({
        firstName: yup.string().required().label("First name"),
        lastName: yup.string().required().label("Last name"),
        email: yup.string().email("This email is not valid").required("Email is required").label("Email"),
        nationalId: yup.string().required().length(16).label("National Id"),
        telephone: yup.string().required().label("Telephone"),
        department: yup.string().required().label("Department"),
        position: yup.string().required().label("Position"),
        laptopManufacturer: yup.string().required().label("Laptop Manufacturer"),
        model: yup.string().required().label("Model"),
        serialNumber: yup.string().required().label("Serial Number"),

    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmployeeData>({
        resolver: yupResolver(EmployeeSchema),
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<EmployeeData> = async (data) => {
        // return console.log(data)
        await createEmployee({ setShowCreateEmployee, setLoading, employeeData: data })
        await getEmployees({ page: 1, limit: 10, setLoading, setMeta, setEmployees })
    }

    return (
        <div className='fixed w-screen h-screen bg-black/60 backdrop-blur-md flex justify-center z-30'>
            <div className='z-30 w-full h-full absolute' onClick={() => setShowCreateEmployee(false)}></div>
            <div className='bg-white w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 flex flex-col p-6 rounded-lg z-50 h-2.5/3 mt-14 mb-14 items-center'>
                <span className='font-semibold text-xl text-primary-blue'>Create New Employee</span>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8 w-9/12 flex flex-col items-center'>
                    <div className='w-full flex sm:flex-row flex-col items-center my-2 gap-x-6'>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>First Name</span>
                            <input
                                placeholder='John'
                                type='text'
                                {...register("firstName", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.firstName && <span className='text-red-400 text-[16px]'>{errors?.firstName?.message}</span>}
                        </div>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Last Name</span>
                            <input
                                placeholder='Doe'
                                type='text'
                                {...register("lastName", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.lastName && <span className='text-red-400 text-[16px]'>{errors?.lastName?.message}</span>}
                        </div>
                    </div>
                    <div className='w-full flex sm:flex-row flex-col items-center my-2 gap-x-6'>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>National Id</span>
                            <input
                                placeholder='1200680101573107'
                                type='text'
                                {...register("nationalId", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.nationalId && <span className='text-red-400 text-[16px]'>{errors?.nationalId?.message}</span>}
                        </div>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Phone Number</span>
                            <input
                                placeholder='0782307144'
                                type='text'
                                {...register("telephone", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.telephone && <span className='text-red-400 text-[16px]'>{errors?.telephone?.message}</span>}
                        </div>
                    </div>
                    <div className='w-full flex sm:flex-row flex-col items-center my-2 gap-x-6'>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Email</span>
                            <input
                                placeholder='precieuxmugisha@gmail.com'
                                type='text'
                                {...register("email", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.email && <span className='text-red-400 text-[16px]'>{errors?.email?.message}</span>}
                        </div>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Department</span>
                            <input
                                placeholder='Human Resources'
                                type='text'
                                {...register("department", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.department && <span className='text-red-400 text-[16px]'>{errors?.department?.message}</span>}
                        </div>
                    </div>
                    <div className='w-full flex sm:flex-row flex-col items-center my-2 gap-x-6'>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Position</span>
                            <input
                                placeholder='HR Manager'
                                type='text'
                                {...register("position", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.position && <span className='text-red-400 text-[16px]'>{errors?.position?.message}</span>}
                        </div>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Laptop Manufacturer</span>
                            <input
                                placeholder='Google'
                                type='text'
                                {...register("laptopManufacturer", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.laptopManufacturer && <span className='text-red-400 text-[16px]'>{errors?.laptopManufacturer?.message}</span>}
                        </div>
                    </div>
                    <div className='w-full flex sm:flex-row flex-col items-center my-2 gap-x-6'>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Laptop Model</span>
                            <input
                                placeholder='Macbook'
                                type='text'
                                {...register("model", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.model && <span className='text-red-400 text-[16px]'>{errors?.model?.message}</span>}
                        </div>
                        <div className='w-full sm:w-1/2 mx-2 plg:mx-0 plg:w-full plg:my-4'>
                            <span className='font-semibold text-lg'>Serial Number</span>
                            <input
                                placeholder='12345'
                                type='text'
                                {...register("serialNumber", { required: true })}
                                className="bg-transparent border border-gray-200 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 placeholder:font-normal w-full pl-3"
                            />
                            {errors.serialNumber && <span className='text-red-400 text-[16px]'>{errors?.serialNumber?.message}</span>}
                        </div>
                    </div>
                    <button disabled={loading} type="submit" className={`${loading ? "bg-primary-blue/70" : "bg-primary-blue"} my-4 text-white w-44 flex justify-center px-6 py-3 rounded-lg`}>
                        {loading ? <BiLoaderAlt className='animate-spin ' size={25} /> : "Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateEmployee