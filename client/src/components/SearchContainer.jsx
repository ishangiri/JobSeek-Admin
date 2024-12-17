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
import { useDashboardContext } from '../pages/DashboardLayout'
import React from 'react'

const SearchContainer = () => {



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
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          search: "",
          jobType: "full-time",
          jobStatus: "",
          sortBY: "oldest"
        }
      })
    
      const {isDarkTheme} = useDashboardContext();
    
    
    
      return ( 
      <div style={{backgroundColor :  isDarkTheme? "#4D4D4D" : "white"}} className='border-none  p-10 rounded-lg'>
      <Form {...form}>
    
        <form>
        <div className='flex items-start justify-evenly space-x-8 mb-8'>
          {/* Username Field */}
          <div className='w-96'>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel className = "font-extrabold text-[#4b95bc]" >Search</FormLabel>
                <FormControl>
                  
                  <Input placeholder="Search..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
    </div>
    <div>
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
    </div>
    
          {/* Job Type Field */}
          <div className='flex items-start justify-evenly space-x-8 mb-8'>
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
           <div className='w-96'>  
          <FormField
            control={form.control}
            name="sortBY"
            render={({ field }) => (
              <FormItem>
                <FormLabel  className = "font-extrabold text-[#4b95bc]" >Sort By</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded bg-transparent">
                    <option value="full-time">Oldest</option>
                    <option value="part-time">Latest</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           </div> 
           </div>
    
           <div className='flex justify-center items-center'>
          <Button variant="outline" type="submit" className = "bg-transparent text-[#4b95bc] w-96">Search</Button>
          </div>
          
           
        </form>
      
      </Form>
      </div>
      )
}


export default SearchContainer