import api from "@/api"
import { IEmployee, IMeta } from "@/types"
import React from "react"
import toast from "react-hot-toast"

export const createEmployee = async ({
    employeeData,
    setLoading,
    setShowCreateEmployee

}: {
    employeeData: IEmployee,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setShowCreateEmployee: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    try {
        const url = "/employee/create"
        await api.post(url, { ...employeeData })
        toast.success("Employee created successfully")
        setShowCreateEmployee(false)
    }
    catch (error: any) {
        error?.response?.data?.message ? toast.error(error.response.data.message) : toast.error("Error loggin you in")
    } finally {
        setLoading(false)
    }
}
export const getEmployees = async (
    {
        page,
        limit,
        setLoading,
        setMeta,
        setEmployees
    }: {
        page: number,
        limit: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setMeta: React.Dispatch<React.SetStateAction<IMeta>>,
        setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>
    }
) => {
    try {
        const url = `/employee/all?page=${page}&limit=${limit}`
        const response = await api.get(url)
        setEmployees(response.data.data.employees)
        setMeta(response.data.data.meta)
        console.log(response.data.data)
    }
    catch (error: any) {
        if (error.response.data.status === 401) return window.location.replace("/auth/login")
        error?.response?.data?.message ? toast.error(error.response.data.message) : toast.error("Error getting employees")
    } finally {
        setLoading(false)
    }
}