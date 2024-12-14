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

const AddJob = () => {
  // Expanded form schema with multiple fields
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
   <div>
    <Form {...form}>
    <div className='flex-row items-start justify-start'>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-blue-600" >Company</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className = "font-extrabold text-blue-600" >Position</FormLabel>
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

        {/* Description Field */}
        <FormField
          control={form.control}
          name="jobLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-blue-600" >Job Location</FormLabel>
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

        {/* Experience Field */}
        <FormField
          control={form.control}
          name="jobStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "font-extrabold text-blue-600" >Job Status</FormLabel>
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

        {/* Job Type Field */}
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className = "font-extrabold text-blue-600" >Job Type</FormLabel>
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
        <div className='flex justify-center items-center'>
        <Button type="submit" className = "bg-transparent text-blue-600">Submit</Button>
        </div>
        
      </form>
      </div>
    </Form>
    </div>
  )
}

export default AddJob