import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  RefreshCw,
  Briefcase,
  Clock,
  SortAsc,
} from 'lucide-react';
import { useDashboardContext } from '../pages/DashboardLayout';

const formSchema = z.object({
  search: z.string(),
  jobStatus: z.enum(["all", "pending", "interview", "declined"], {
    errorMap: () => ({ message: "Invalid job status" })
  }),
  jobType: z.enum(["all", "full-time", "part-time", "internship"], {
    errorMap: () => ({ message: "Invalid job type" })
  }),
  sortBy: z.enum(["newest", "oldest", "a-z", "z-a", "salary-high", "salary-low"], {
    errorMap: () => ({ message: "Invalid sort option" })
  }),
  datePosted: z.enum(["all", "24h", "week", "month"], {
    errorMap: () => ({ message: "Invalid date range" })
  })
});

const SearchContainer = ({ onSubmit}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      jobType: "all",
      jobStatus: "all",
      sortBy: "newest",
      datePosted: "all"
    }
  });

  

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onSubmit(form.getValues());
  };

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const { isDarkTheme } = useDashboardContext();

  return (
    <div className='p-10 rounded-lg' style={{ backgroundColor: isDarkTheme ? "#4D4D4D" : "white" }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Search Input */}
          <div className>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <div className>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Search by title, company, or keywords..."
                        className="pl-10"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Job Type Filter */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#4b95bc]" />
                    Job Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Date Posted Filter */}
            <FormField
              control={form.control}
              name="datePosted"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#4b95bc]" />
                    Date Posted
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="week">Past Week</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Sort By Filter */}
            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4 text-[#4b95bc]" />
                    Sort By
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="a-z">A to Z</SelectItem>
                      <SelectItem value="z-a">Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-6" />

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={handleReset} className="w-32 gap-2 text-black" disabled={!isFormDirty}>
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" className="w-32 bg-[#4b95bc] hover:bg-[#3a7494]">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchContainer;