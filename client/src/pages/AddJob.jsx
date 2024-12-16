import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'
import { useDashboardContext } from './DashboardLayout'

const AddJob = () => {

  const { isDarkTheme } = useDashboardContext();
 
  const formSchema = z.object({
    // Basic string validation
    company: z.string().min(2, {
      message: "Company must be at least 2 characters."
    }),
    
    // Email validation
    position: z.string().min(2, { 
      message: "position must be atleast 2 characters" 
    }),
    
    //JOb Location validation
    jobLocation: z.string().min(2,{
      message : "location must be atleast 2 characters"
    }),
    
    // Number field with min/max validation
    jobStatus: z.enum(["pending", "interview", "declined"], {
      errorMap : () => ({message : "Invalid Job status"})
    }),
    
    // Enum or specific string values
    jobType: z.enum(["full-time", "part-time", "internship"], {
      errorMap: () => ({ message: "Invalid job type" })
    })
  })

  // Create form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      jobLocation: "",
      jobStatus: "pending",
      jobType: "full-time"
    }
  })

  // Submit handler
  const onSubmit =  async(data) => {
    try {
      await fetchData.post("/jobs", data);
      toast.success("Job Posted Successfully");
      
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
     console.log(data);
     form.reset();
  }

  return (
   <div style={{backgroundColor : isDarkTheme? "#4D4D4D" : "white"}} className='border-none p-16 rounded-lg'>
    <div className='flex justify-center items-center'>
    <p className='mb-6 text-2xl'>ADD JOB</p>
    </div>
    <Form {...form}>
    <div className='flex-row items-start justify-start'>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className='flex justify-evenly items-start'>
        {/* Username Field */}
        <div className='w-96'>
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-[#4b95bc]" >Company</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Email Field */}
        <div className='w-96'>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className = "font-extrabold text-[#4b95bc]" >Position</FormLabel>
              <FormControl>
                <Input  
                  placeholder="Enter Position" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </div>

        {/* Description Field */}
        <div className='flex justify-evenly items-start'>
          <div className='w-96'> 
        <FormField
          control={form.control}
          name="jobLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-[#4b95bc]" >Job Location</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Location" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Experience Field */}
        <div className='w-96'>
        <FormField
          control={form.control}
          name="jobStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-[#4b95bc]" >Job Status</FormLabel>
              <FormControl>
              <select {...field} className="w-full p-2 border rounded bg-transparent">
                  <option value="interview">Interview</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </div>

        {/* Job Type Field */}
        <div className='flex justify-evenly items-start'>
        <div className='w-96'>
         
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className = "font-extrabold text-[#4b95bc]" >Job Type</FormLabel>
              <FormControl>
                <select {...field} className="w-full p-2 border rounded bg-transparent">
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="internship">Contract</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <div className='flex justify-center items-center mt-6'>
          <div>
        <Button variant = "outline" type="submit" className = "bg-transparent text-[#4b95bc] w-96">Submit</Button>
        </div>
        </div>
         </div>
      </form>
      </div>
    </Form>
    </div>
  )
}

export default AddJob