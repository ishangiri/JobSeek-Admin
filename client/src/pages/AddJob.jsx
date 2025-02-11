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
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'
import { useDashboardContext } from './DashboardLayout'
import { useLoaderData } from 'react-router-dom'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, BriefcaseIcon, DollarSign, FileText, Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const loadUser = async() => {
  try {
    const response = await fetchData.get("/users/getUser");
    
    
    const fetchedName = response.data.userWIthoutpass.company;
    const location = response.data.userWIthoutpass.location;
    return {company : fetchedName, location : location};
  } catch (error) {
    return error
  }  
}

const AddJob = () => {

  const { isDarkTheme} = useDashboardContext();
  const user = useLoaderData(); 



  
  
 
  const formSchema = z.object({
    // Basic string validation
    company: z.string().min(2, {
      message: "Company must be at least 2 characters."
    }),
    
    // Email validation
    position: z.string().min(2, { 
      message: "position must be atleast 2 characters" 
    }),

    salary: z.string().min(2, {
      message : "Salary must be atleast 2 characters"
    }),
    
    //JOb Location validation
    jobLocation: z.string().min(2,{
      message : "location must be atleast 2 characters"
    }),
    
    // Number field with min/max validation
    jobDescription: z.string().min(2, {
      message : "Description must be atleast 20 characters"
      
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
      company: user.company,
      position: "",
      salary : "",
      jobLocation: "",
      jobDescription: "",
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
    <Card style = {{backgroundColor : isDarkTheme? "#3F3F3F" : "white", color : isDarkTheme ? "white" : "black"}} className="  w-full max-w-4xl mx-auto">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center text-[#4b95bc]">
        Post a New Job
      </CardTitle>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Fill in the details below to create a new job posting
      </p>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#4b95bc]" />
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly
                      className=" dark:bg-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4 text-[#4b95bc]" />
                    Position
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Senior Developer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#4b95bc]" />
                    Salary Range
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. $80,000 - $100,000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#4b95bc]" />
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. New York, NY" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-6" />

          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#4b95bc]" />
                  Job Type
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="internship">Contract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#4b95bc]" />
                  Job Description
                </FormLabel>
                <FormDescription>
                  Provide a detailed description of the role, responsibilities, and requirements.
                </FormDescription>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full h-64 p-3 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-[#4b95bc] focus:border-transparent"
                    placeholder="Describe the job role, responsibilities, requirements..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#4b95bc] hover:bg-[#3a7494] text-white"
          >
            Post Job
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
  </div>
  );
  
}

export default AddJob